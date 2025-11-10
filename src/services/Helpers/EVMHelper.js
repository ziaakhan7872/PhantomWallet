import '../../../shim'
import '../../../globals'
import 'react-native-get-random-values';
import Web3 from 'web3';
import BN from 'bn.js'; // Import BN directly from bn.js
import '@ethersproject/shims';
import { ethers } from 'ethers';
import * as Bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import BigNumber from 'bignumber.js';
import axios from 'axios';
import { GetbtcBalnceofAddress } from './BitcoinHelper';
import { getSolanaBalance, getSolanaTokenBalance } from './SolanaHelper';
import { abis } from '../../utilities/Abis';
import { GetcurentPrices, gettokenPricesDexscaner } from './Apis';
import { coinGekoTokenID, transformArray } from './CommonHelper';

const RPCURL = 'https://cold-responsive-friday.quiknode.pro/15bbbcf85ec27b075486f39524c5741f49222932/';

const isMnemonicHasDuplicates = mnemonic => {
    const words = mnemonic.trim().split(' ');
    const uniqueWords = new Set(words);
    return words.length !== uniqueWords.size;
};

export const generateUniqueMnemonic = () => {
    let mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(20));

    while (isMnemonicHasDuplicates(mnemonic)) {
        mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(20));
    }

    return mnemonic;
};


// Evm wallet Creation


export const generateEvmWallet = async phrase => {
    const newWallet = await ethers.Wallet.fromMnemonic(phrase.trim());
    return {
        address: newWallet.address,
        privateKey: newWallet.privateKey
    }
};

export const seedValidation = (uniqueMnemonic) => {
    const validMnemonic =
        Bip39.validateMnemonic(uniqueMnemonic);
    return validMnemonic
}


export const EvmAddressValidation = (address) => {
    const web3 = new Web3();
    let result = web3.utils.isAddress(address);
    return result
}


export const web3Instence = rpcUrl => {
    return new Web3(rpcUrl);
};

export const CreatePrivateKeyToWallet = (phrase) => {
    try {



        let web3 = web3Instence('https://white-small-owl.bsc.quiknode.pro/9360ded420c4dac9e642ea073c6c5b0ea1040291/');


        const newwallet = web3.eth.accounts.privateKeyToAccount(phrase.trim());

        return {
            address: newwallet.address,
            privateKey: newwallet.privateKey
        }
    } catch (error) {
        throw error
    }
}

export const evmCoinBalances = (tokendata, publicAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            let web3 = web3Instence(tokendata?.rpcUrl);

            let getbalance = await web3.eth.getBalance(
                publicAddress
            );

            let balance = web3.utils.fromWei(getbalance, 'ether');

            resolve({ balance })
        } catch (error) {

            console.log('error coin balance', error, 'tokendata==', tokendata);
            resolve({ balance: 0 })
        }
    })
}


export const evmTokenBalce = (tokendata, publicAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            let web3 = web3Instence(tokendata?.rpcUrl);
            const contract = new web3.eth.Contract(abis.ERC20, tokendata.tokenAddress);
            let balanceOf = await contract.methods
                .balanceOf(publicAddress)
                .call();
            let balance = Number(balanceOf) / Number(Math.pow(10, tokendata?.decimals));
            resolve({ balance })


        } catch (error) {

            console.log('error token balance', error, 'tokendata==', tokendata);
            resolve({ balance: 0 })
        }
    })
}







const createWalletFromNode = (baseNode, index) => {
    const childNode = baseNode.deriveChild(index);
    const childWallet = childNode.getWallet();

    return {
        privateKey: `0x${childWallet.getPrivateKey().toString('hex')}`,
        address: `0x${childWallet.getAddress().toString('hex')}`
    };
};



const initializeHdWallet = async (mnemonic) => {
    const seed = await Bip39.mnemonicToSeed(mnemonic);
    const hdNode = hdkey.fromMasterSeed(seed);
    return hdNode.derivePath(`m/44'/60'/0'`).deriveChild(0); // m/44'/60'/0'/0
};


export const createEvmaddresses = async (mnemonic, numberOfWallets = 20) => {
    try {
        const baseNode = await initializeHdWallet(mnemonic);
        const wallets = [];
        for (let i = 0; i < numberOfWallets; i++) {
            wallets.push(createWalletFromNode(baseNode, i));
        }


        return wallets;
    } catch (error) {
        console.error('Error creating wallets:', error);
        throw error;
    }
};



export const EvmCoinFeeCalculation = async (coin, toAddress, fromAddress, ammount, isDolorValue) => {

    return new Promise(async (resolve, reject) => {
        try {
            let amountInEther = isDolorValue ? ammount / coin?.current_price : ammount

            const web3 = new Web3(new Web3.providers.HttpProvider(coin?.rpcUrl));
            const gasPrice = await web3.eth.getGasPrice();

            const reducedAmountInEther = parseFloat(amountInEther).toFixed(17)



            // Estimate gas limit
            const gasLimit = await web3.eth.estimateGas({
                from: fromAddress,
                to: toAddress,
                value: web3.utils.toWei(reducedAmountInEther.toString(), 'ether')
            });
            console.log('gasLimit:::::gasLimit', gasLimit);

            const transactionFee = gasPrice * gasLimit;
            console.log('transactionFee:::::', transactionFee);


            // Convert transaction fee to Ether
            const transactionFeeInEth = web3.utils.fromWei(transactionFee.toString(), 'ether');

            console.log(`Estimated Transaction Fee: ${transactionFeeInEth} ETH`);

            resolve({
                Fee: transactionFeeInEth
            });
        } catch (error) {
            console.log('errorerrorerror', error);
            reject(error)
        }




    })
}
export const getEVMNetworkFeeForSwap = async (rpcUrl, amountInEther) => {
    try {
        // Initialize web3 with the provided RPC URL
        const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        // Fetch the current gas price
        const gasPrice = await web3.eth.getGasPrice();

        // Convert the amount to Wei and prepare the transaction object
        const amountInWei = web3.utils.toWei(amountInEther, 'ether');

        // Estimate the gas limit for a simple transfer (sending Ether)
        const gasLimit = await web3.eth.estimateGas({
            from: '0x0000000000000000000000000000000000000000',
            to: '0x0000000000000000000000000000000000000000',
            value: amountInWei
        });

        // Calculate the transaction fee: fee = gasPrice * gasLimit
        const transactionFeeInWei = gasPrice * gasLimit;
        const extraFee = Number(transactionFeeInWei) * 0.2

        const totalFeeWithExtra = Number(transactionFeeInWei) + extraFee;

        // Convert the fee from Wei to Ether
        const transactionFeeInEth = web3.utils.fromWei(totalFeeWithExtra.toString(), 'ether');

        // Return the calculated fee in Ether
        return transactionFeeInEth;
    } catch (error) {
        console.error('Error estimating network fee:', error);
        throw error;
    }
};

export const EvmTokenFeeCalculation = async (coin, toAddress, fromAddress, ammount, isDolorValue) => {

    return new Promise(async (resolve, reject) => {


        try {

            console.log('coin, toAddress, fromAddress, ammount, isDolorValuecoin, toAddress, fromAddress, ammount, isDolorValue', coin, toAddress, fromAddress, ammount, isDolorValue);


            let amountInEther = isDolorValue ? ammount / coin?.current_price : ammount

            const changeWeai = new BigNumber(amountInEther).multipliedBy(
                new BigNumber(10).pow(coin?.decimals),
            );

            let fixedAmount = changeWeai.toFixed(0);

            const changeBigValue = fixedAmount.toString();
            console.log('changeBigValuechangeBigValue', changeBigValue);

            console.log('coin?.rpcUrl', coin?.rpcUrl);
            console.log('coin?.rpcUrl....', coin);

            const web3 = new Web3(new Web3.providers.HttpProvider(coin?.rpcUrl));

            console.log('coin?.tokenAddress', coin?.tokenAddress);

            const contract = new web3.eth.Contract(abis.ERC20, coin?.tokenAddress);

            // Get gas price
            const gasPrice = await web3.eth.getGasPrice();
            console.log('gasPrice', gasPrice);


            // Estimate gas limit
            const gasLimit = await contract.methods.transfer(toAddress, changeBigValue).estimateGas({ from: fromAddress });
            console.log('gasLimit', gasLimit);


            // Calculate transaction fee (in wei)
            const transactionFee = Number(gasPrice) * Number(gasLimit);
            console.log('transactionFee', transactionFee);

            // Convert transaction fee to Ether
            const transactionFeeInEth = web3.utils.fromWei(transactionFee.toString(), 'ether');
            console.log('transactionFeeInEth', transactionFeeInEth);



            resolve({
                Fee: transactionFeeInEth
            });
        } catch (error) {
            console.log('errorerrorerror', error);
            reject(error)
        }




    })
}





export const sendEvmToken = async (fromAddress, privateKey, amount, toAddress, tokenData) => {

    return new Promise(async (resolve, reject) => {

        try {
            const changeWeai = new BigNumber(amount).multipliedBy(
                new BigNumber(10).pow(tokenData?.decimals),
            );

            let fixedAmount = changeWeai.toFixed(0);
            const amounttosend = fixedAmount.toString();
            const web3 = web3Instence(tokenData?.rpcUrl)
            const account = web3.eth.accounts.privateKeyToAccount(privateKey);
            web3.eth.accounts.wallet.add(account);

            // // Initialize the token contract
            const tokenContract = new web3.eth.Contract(abis.ERC20, tokenData?.tokenAddress);

            // // Estimate gas
            const gas = await tokenContract.methods.transfer(toAddress, amounttosend).estimateGas({ from: fromAddress });

            // // Get the current gas price and adjust it
            let gasPrice = await web3.eth.getGasPrice();
            // gasPrice = parseInt(gasPrice) + 14000000000;
            // gasPrice = parseInt(gasPrice) + handleExtraFee(networkFeeTypeAdvance ? networkFeeTypeAdvance : networkFeeTypeConfirmed, tokenData?.chainName)

            // // Get the current nonce for the fromAddress
            const nonce = await web3.eth.getTransactionCount(fromAddress, 'pending');
            // Send the transaction
            const receipt = await tokenContract.methods.transfer(toAddress, amounttosend).send({
                from: fromAddress,
                gasPrice: gasPrice,
                gas: gas,
                nonce: nonce
            });

            resolve(receipt)
        } catch (error) {
            console.error('Error sending token:', error);
            reject(error)
            throw error;
        }
    })
};




export const sendEvmCoin = async (fromAddress, privateKey, amount, toAddress, tokenData) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Initialize Web3 instance
            const web3 = web3Instence(tokenData?.rpcUrl);

            // Add the sender's private key to the wallet
            const account = web3.eth.accounts.privateKeyToAccount(privateKey);
            web3.eth.accounts.wallet.add(account);

            // Get the current nonce for the fromAddress
            const nonce = await web3.eth.getTransactionCount(fromAddress, 'pending');

            // Get the current gas price
            let gasPrice = await web3.eth.getGasPrice();
            // gasPrice = parseInt(gasPrice) + handleExtraFee(networkFeeTypeAdvance || networkFeeTypeConfirmed, tokenData?.chainName);

            // Set the default gas limit for an Ether transfer
            let estimatedGas = 21000;

            const reducedAmountInEther = parseFloat(amount).toFixed(18);

            // Estimate the gas required for the transaction
            estimatedGas = await web3.eth.estimateGas({
                from: fromAddress,
                to: toAddress,
                value: web3.utils.toWei(
                    tokenData?.chainName === 'Avalanche'
                        ? reducedAmountInEther.toString()
                        : Number(amount).toFixed(18).toString(),
                    'ether'
                ),
            });

            // Convert gasPrice and estimatedGas to BN instances
            const gasPriceBN = new BN(gasPrice);
            const estimatedGasBN = new BN(estimatedGas);

            // Calculate the transaction fee using BN
            const transactionFee = gasPriceBN.mul(estimatedGasBN);

            // Get the balance of the sender
            const balanceWei = await web3.eth.getBalance(fromAddress);
            const balance = new BN(balanceWei.toString()); // Convert balance to BN


            console.log('balancebalancebalance', tokenData, balance);

            // Convert the amount to Wei and make sure it's a BN instance
            let amountToSend = new BN(web3.utils.toWei(
                tokenData?.chainName === 'Avalanche'
                    ? reducedAmountInEther.toString()
                    : Number(amount).toFixed(18).toString(),
                'ether'
            ));

            // If the user is trying to send the maximum amount, deduct the transaction fee
            if (amountToSend.add(transactionFee).gt(balance)) {
                amountToSend = balance.sub(transactionFee);
            } else if (amountToSend.add(transactionFee).eq(balance)) {
                amountToSend = balance.sub(transactionFee);
            }

            if (amountToSend.isNeg() || amountToSend.isZero()) {
                return reject(new Error('Insufficient balance to cover gas fees.'));
            }


            // Define the transaction object
            const txObject = {
                from: fromAddress,
                to: toAddress,
                value: amountToSend.toString(),
                gas: web3.utils.toHex(estimatedGas),
                gasPrice: web3.utils.toHex(gasPrice),
                nonce: web3.utils.toHex(nonce),
            };

            console.log('receiptreceiptreceiptreceipt', txObject);

            // Send the transaction
            const receipt = await web3.eth.sendTransaction(txObject);

            console.log('receiptreceiptreceiptreceipt', receipt);

            resolve(receipt);
        } catch (error) {
            console.error('Error sending EVM coin:', error);
            reject(error);
        }
    });
};


export const balanceOfforTokenandCoin = async (tokendata, activewallet, CoingekoList) => {


    let balance = 0
    let symbol = ''
    let curentprice = 0
    let change24hr = 0


    try {

        if (tokendata?.tags == "Native") {



            const idofcoingeko = coinGekoTokenID(tokendata?.chainId, tokendata)


            console.log('idofcoingekoidofcoingekoidofcoingeko', idofcoingeko);

            const response = await GetcurentPrices(idofcoingeko ?? null)



            change24hr = response?.change24hr ?? 0
            curentprice = tokendata?.current_price ? tokendata?.current_price : response?.curentprice ?? 0
        }

        else {
            let ListofArray = transformArray(CoingekoList)
            let result = ListofArray.find(
                crypto => crypto.platformsaddress.toLowerCase() == tokendata.address.toLowerCase(),
            );

            if (result?.id) {
                const response = await GetcurentPrices(result?.id ?? null)



                change24hr = response?.change24hr
                curentprice = tokendata?.current_price ? tokendata?.current_price : response?.curentprice
            }
            else {

                const responsedexccaner = await gettokenPricesDexscaner(tokendata?.address)

                change24hr = responsedexccaner?.change24hr
                curentprice = tokendata?.current_price ? tokendata?.current_price : responsedexccaner?.curentprice

            }
        }






    } catch (error) {
        change24hr = 0
        curentprice = 0
    }
    try {


        if (tokendata?.isEvm == true) {


            if (tokendata?.tags == "Native") {
                let obj = {
                    decimals: tokendata?.decimals,
                    tokenAddress: tokendata?.address,
                    rpcUrl: tokendata?.rpcurl,
                }
                const balancecoin = await evmCoinBalances(obj, activewallet?.publicAddress)


                balance = balancecoin?.balance


            }
            else {

                let obj = {
                    decimals: tokendata?.decimals,
                    tokenAddress: tokendata?.address,
                    rpcUrl: tokendata?.rpcurl,
                }

                const balancetoken = await evmTokenBalce(obj, activewallet?.publicAddress)


                balance = balancetoken?.balance


            }

        }
        else if (tokendata?.chainName == "bitcoin") {



            const btcbalance = await GetbtcBalnceofAddress(activewallet?.btcWalletAddress)


            balance = btcbalance?.balance
        }

        else if (tokendata?.chainId == 'solana' || tokendata?.chainId == 'sol') {

            if (tokendata?.tags == "Native") {

                const solbalance = await getSolanaBalance(activewallet?.solanaAddress)


                balance = solbalance?.balance
            }
            else {



                let obj = {
                    decimals: tokendata?.decimals,
                    tokenAddress: tokendata?.address,
                    rpcUrl: tokendata?.rpcurl,
                }
                const soltokenbalance = await getSolanaTokenBalance(obj, activewallet?.solanaAddress, activewallet?.solanaPrivateKey)


                balance = soltokenbalance?.balance
            }





        }


    } catch (error) {
        console.log('errorerrorerrorerror', error);

    }


    return { balance, symbol, UsdBalance: Number(curentprice ?? 0) * Number(balance ?? 0), curentprice, change24hr }


};





export const GetTokenDetailMEtaData = async (tokenAddress, selectedChain) => {

    return new Promise(async (resolve, reject) => {


        try {


            const web3 = new Web3(selectedChain?.rpcUrl);

            const contract = new web3.eth.Contract(abis.ERC20, tokenAddress);

            const symbol = await contract.methods.symbol().call();
            const decimals = await contract.methods.decimals().call();
            const name = await contract.methods.name().call();
            resolve({
                symbol: symbol,
                decimals: decimals,
                name: name
            });
        } catch (error) {
            console.log('errorerrorerror isssss', error);
            reject(error)
        }




    })
}


export const getExchangeRate = async (symbol) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`);
        return response?.data[symbol.toLowerCase()]?.usd || 0;
    } catch (e) {
        // console.log('Error fetching exchange rate:', e);
        return 0;
    }
};


export const checkSumadress = async (RPCURL, address) => {
    try {
        const web3 = new Web3(RPCURL);
        return web3.utils.toChecksumAddress(address);

    } catch (error) {
        // console.log('errorerror on sign message', error);

    }
}


export const getEvmTOkenDecimal = async (rpc, address) => {
    try {
        const web3 = new Web3(rpc);

        const contract = new web3.eth.Contract(
            abis.ERC20,
            address
        );


        const decimal = await contract.methods.decimals().call();

        return Number(decimal)
    } catch (error) {
        return null
    }
}

export const handleExtraFee = (type, chainName) => {
    let defaultFee = 0;
    if (type == "Low") {
        defaultFee = (chainName == 'Base' || chainName == 'Arbitrum') ? 100000000 : 5000000000;
    } else if (type == "Market") {
        defaultFee = (chainName == 'Base' || chainName == 'Arbitrum') ? 500000000 : 10000000000;
    } else {
        defaultFee = (chainName == 'Base' || chainName == 'Arbitrum') ? 1000000000 : 20000000000;
    }
    return defaultFee;
};





export const RpcUrls = {
    EthereumMainnet:
        "https://cold-responsive-friday.quiknode.pro/15bbbcf85ec27b075486f39524c5741f49222932/",
    PolygonMainet:
        "https://radial-fragrant-glitter.matic.quiknode.pro/71657fa30ed09243fa133d109f4fc77ef38951d7/",
    FantomMainet: "https://rpc.ftm.tools/",
    AvalancheMainet:
        "https://special-long-lake.avalanche-mainnet.quiknode.pro/8ad44f568579c226d2084558a93f1540b3f32df1/ext/bc/C/rpc/",
    BinanceMainet:
        "https://white-small-owl.bsc.quiknode.pro/9360ded420c4dac9e642ea073c6c5b0ea1040291/",
    BaseMainet:
        "https://orbital-warmhearted-sponge.base-mainnet.quiknode.pro/d39cf0ac7f112ff94576f75cb20b3bf94920ad15/",
    ArbitrumMainet:
        "https://thrumming-cosmological-silence.arbitrum-mainnet.quiknode.pro/cc9ba52fdd9f3c469c7743dfc2642f89af41bba0/",

    Ethereumtestnet: "https://eth-sepolia.api.onfinality.io/public",
    Polygontestnet: "https://polygon-mumbai.drpc.org",
    Fantomtestnet: "https://fantom-testnet.drpc.org/",
    Avalanchetestnet: "https://avalanche-fuji.drpc.org/",
    Binancetestnet: "https://bsc-testnet.drpc.org/",
    SonicMainnet: "https://sonic.drpc.org",
    BeraMainnet: "https://orbital-cosmopolitan-lambo.bera-mainnet.quiknode.pro/1b66e794067dd1d45c5b9629be0eb661263a11e2/",
};

// Injected case handle here

export const RPC_PROVIDERS = {
    "0x1": RpcUrls?.EthereumMainnet,
    "0x38": RpcUrls?.BinanceMainet,
    "0x89": RpcUrls?.PolygonMainet,
    "0xa4b1": RpcUrls?.ArbitrumMainet,
    "0xa86a": RpcUrls?.AvalancheMainet,
    "0x2105": RpcUrls?.BaseMainet,
    "0x138de": RpcUrls?.BeraMainnet,
    "0x92": RpcUrls?.SonicMainnet,
};


const supportedChains = {
    "0x1": { name: "Ethereum", symbol: "ETH" },
    "0x38": { name: "Binance Smart Chain", symbol: "BNB" },
    "0x89": { name: "Polygon", symbol: "POL" },
    "0xa4b1": { name: "Arbitrum", symbol: "ARBETH" },
    "0xa86a": { name: "Avalanche", symbol: "AVAX" },
    "0x2105": { name: "Base", symbol: "BASEETH" },
    "0x138de": { name: "Berachain", symbol: "BERA" },
    "0x92": { name: "Sonic", symbol: "S" },
};

export const GetchainDataByCHainID = async (currentChainId) => {

    if (!supportedChains[currentChainId]) {
        console.warn(`Chain ID ${currentChainId} is not supported.`);
        return null;
    }

    const chainName = supportedChains[currentChainId].name;
    const symbol = supportedChains[currentChainId].symbol;
    const rpcurl = RPC_PROVIDERS[currentChainId];

    let chianname = await getChainByrpcurlName(chainName); // Replace with your DB function

    let curuntPrice = chianname?.find(item => item?.type == "chain")

    console.log("✅ Chain Data:", { chainName, symbol, rpcurl, curuntPrice: curuntPrice?.current_price });
    return { chainName, symbol, rpcurl, curuntPrice: curuntPrice?.current_price };



}

export const signAndExecuteEthCall = async (chainId, privateKey, txData) => {
    try {

        // Get RPC URL
        const rpcUrl = RPC_PROVIDERS[chainId] || RPC_PROVIDERS["0x1"]; // Default to Ethereum Mainnet



        // Create a provider and wallet
        const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        // Create transaction request
        const tx = {
            to: txData.to,
            data: txData.data
        };



        // Execute eth_call
        const result = await web3.eth.call(tx);



        return result;
    } catch (error) {
        console.error("❌ eth_call error:", error);
        throw new Error(`eth_call failed: ${error.message}`);
    }
};



export const getLatestBlockNumber = async (chainId) => {
    try {
        console.log("🔍 Fetching latest block number for chain:", chainId);

        // Get RPC URL
        const rpcUrl = RPC_PROVIDERS[chainId] || RPC_PROVIDERS["0x1"]; // Default to Ethereum Mainnet
        console.log("RPC URL:", rpcUrl);

        // Create a Web3 provider
        const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        // Fetch latest block number
        const latestBlock = await web3.eth.getBlockNumber();

        // Convert to hex (DApps expect hex format)
        const blockHex = web3.utils.toHex(latestBlock);

        console.log("✅ Latest Block Number (Hex):", blockHex);
        return blockHex;
    } catch (error) {
        console.error("❌ eth_blockNumber error:", error);
        throw new Error(`eth_blockNumber failed: ${error.message}`);
    }
};


export const getBlockByNumber = async (chainId, blockNumber) => {
    try {
        console.log("🔍 Fetching block details for chain:", chainId, "Block Number:", blockNumber);

        // Get RPC URL
        const rpcUrl = RPC_PROVIDERS[chainId] || RPC_PROVIDERS["0x1"]; // Default to Ethereum Mainnet
        console.log("RPC URL:", rpcUrl);

        // Create a Web3 provider
        const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        // Fetch block details
        const block = await web3.eth.getBlock(blockNumber);

        if (!block) {
            throw new Error(`Block not found: ${blockNumber}`);
        }

        console.log("✅ Block Data:", block);
        const blockresponse = JSON.stringify(block, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, 2);

        console.log("✅ Block Data:", blockresponse);
        return blockresponse;
    } catch (error) {
        console.error("❌ eth_getBlockByNumber error:", error);
        throw new Error(`eth_getBlockByNumber failed: ${error.message}`);
    }
};

export const signTypedDataV4 = async (privateKey, typedData) => {
    try {
        console.log("🔍 Signing Typed Data V4...", { privateKey, typedData });


        // Create an account instance from the private key
        const wallet = new ethers.Wallet(privateKey);


        // Remove `EIP712Domain` from `types` (ethers.js automatically handles it)
        const { domain, types, message } = typedData;
        delete types.EIP712Domain; // Remove it before signing

        console.log("domain", domain);
        console.log("types", types);
        console.log("message", message);

        // Sign the typed data
        const signature = await wallet._signTypedData(domain, types, message);



        console.log("✅ Signed Typed Data:", signature);

        return signature;
    } catch (error) {
        console.error("❌ eth_signTypedData_v4 error:", error);
        throw new Error(`eth_signTypedData_v4 failed: ${error.message}`);
    }
};





export const estimateGasInEth = async (transactionData, chainId) => {
    try {


        const txchainid = transactionData?.chainId ? transactionData?.chainId : chainId



        const rpcUrl = RPC_PROVIDERS[txchainid] || RPC_PROVIDERS["0x1"]; // Default to Ethereum Mainnet

        // Connect to provider
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);



        // Format transaction data for gas estimation
        const tx = {
            from: transactionData.from,
            to: transactionData.to,
            data: transactionData.data,
            value: transactionData.value,
        };




        // Estimate gas usage
        const estimatedGas = await provider.estimateGas(tx);

        // Get current gas price
        const gasPrice = await provider.getGasPrice();

        // Convert gas fee to ETH (corrected for ethers v5)
        const gasFeeInEth = ethers.utils.formatEther(estimatedGas.mul(gasPrice));


        return gasFeeInEth;
    } catch (error) {
        throw new Error(`Gas estimation failed: ${error.message}`);
    }
};





export const signAndSendTransaction = async (privateKey, transactionData, ChainID) => {
    try {
        console.log("🔍 Signing & Sending Transaction...", { privateKey, transactionData, ChainID });

        // Get the correct chain RPC URL
        const txChainId = transactionData?.chainId ? transactionData?.chainId : ChainID
        const rpcUrl = RPC_PROVIDERS[txChainId] || RPC_PROVIDERS["0x1"];
        console.log("🔗 Using RPC URL:", rpcUrl);

        // Create provider and wallet
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);

        // Build transaction object
        const tx = {
            to: transactionData.to,
            value: transactionData.value ? ethers.BigNumber.from(transactionData.value) : ethers.constants.Zero,
            gasLimit: transactionData.gas ? ethers.BigNumber.from(transactionData.gas) : undefined,
            gasPrice: transactionData.gasPrice ? ethers.BigNumber.from(transactionData.gasPrice) : undefined,
            data: transactionData.data || "0x",
            nonce: transactionData.nonce ? await provider.getTransactionCount(wallet.address, "latest") : undefined,
            chainId: parseInt(txChainId, 16) || 1, // Default to Ethereum Mainnet
        };

        console.log("📜 Transaction Object:", tx);

        // Send transaction
        const txResponse = await wallet.sendTransaction(tx);
        console.log("⏳ Transaction Sent! Waiting for confirmation...", txResponse.hash);

        // Wait for confirmation
        const receipt = await txResponse.wait();
        console.log("✅ Transaction Confirmed:", receipt);

        return { success: true, txHash: receipt };
    } catch (error) {
        console.error("❌ Transaction Execution Error:", error);
        throw error
    }
};




export const handleGetTransactionByHash = async (txHash, chainId) => {
    try {
        console.log("🔍 Fetching Transaction...", { txHash, chainId });

        // Get the correct RPC URL for the chain
        const rpcUrl = RPC_PROVIDERS[chainId] || RPC_PROVIDERS["0x1"];
        console.log("🔗 Using RPC URL:", rpcUrl);

        // Create provider
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

        // Fetch transaction
        const tx = await provider.getTransaction(txHash);
        if (!tx) {
            throw new Error("Transaction not found");
        }

        console.log("📜 Transaction Details:", tx);

        return { success: true, transaction: tx };
    } catch (error) {
        console.error("❌ Transaction Fetch Error:", error);
        throw error.message
    }
};



export const handleGetTransactionReceipt = async (txHash, chainId) => {
    try {
        console.log("🔍 Fetching Transaction Receipt...", { txHash, chainId });

        // Get the correct RPC URL for the chain
        const rpcUrl = RPC_PROVIDERS[chainId] || RPC_PROVIDERS["0x1"];
        console.log("🔗 Using RPC URL:", rpcUrl);

        // Create provider
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

        // Fetch transaction receipt
        const receipt = await provider.getTransactionReceipt(txHash);
        if (!receipt) {
            throw new Error("Transaction receipt not found");
        }

        console.log("📜 Transaction Receipt:", receipt);

        return { success: true, receipt };
    } catch (error) {
        console.error("❌ Transaction Receipt Fetch Error:", error);
        return { success: false, error: `Transaction receipt fetch failed: ${error.message}` };
    }
};




export const personalSign = async (privateKey, message) => {
    try {
        console.log("🔍 Signing Personal Message...", { privateKey, message });

        // Create a wallet instance from the private key
        const wallet = new ethers.Wallet(privateKey);

        // Convert message to a Buffer if it's in hex format
        let messageToSign = message;
        if (ethers.utils.isHexString(message)) {
            messageToSign = ethers.utils.toUtf8String(message);
        }

        // Sign the message
        const signature = await wallet.signMessage(messageToSign);

        console.log("✅ Signed Personal Message:", signature);

        return signature;
    } catch (error) {
        console.error("❌ personal_sign error:", error);
        throw new Error(`personal_sign failed: ${error.message}`);
    }
};



export const getGasPrice = async (chainId) => {
    try {
        console.log("⛽ Fetching gas price for chain:", chainId);

        // Get RPC URL
        const rpcUrl = RPC_PROVIDERS[chainId] || RPC_PROVIDERS["0x1"]; // Default to Ethereum Mainnet
        console.log("RPC URL:", rpcUrl);

        // Create a Web3 provider
        const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        // Fetch gas price
        const gasPrice = await web3.eth.getGasPrice();

        // Convert to hex (DApps expect hex format)
        const gasPriceHex = web3.utils.toHex(gasPrice);

        console.log("✅ Gas Price (Hex):", gasPriceHex);
        return gasPriceHex;
    } catch (error) {
        console.error("❌ eth_gasPrice error:", error);
        throw new Error(`eth_gasPrice failed: ${error.message}`);
    }
};





export const getMaxPriorityFeePerGas = async (chainId) => {
    try {
        console.log("⚡ Fetching max priority fee per gas for chain:", chainId);

        // Get RPC URL
        const rpcUrl = RPC_PROVIDERS[chainId] || RPC_PROVIDERS["0x1"]; // Default to Ethereum Mainnet

        // Create a Web3 provider
        const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        // Fetch max priority fee per gas
        let maxPriorityFee = await web3.eth.getMaxPriorityFeePerGas();

        console.log("🔹 Raw maxPriorityFee:", maxPriorityFee);

        // Convert BigInt to string first, then to hex
        const hexValue = web3.utils.toHex(maxPriorityFee.toString());

        console.log("✅ Max Priority Fee Per Gas (Hex):", hexValue);
        return hexValue;
    } catch (error) {
        console.error("❌ eth_maxPriorityFeePerGas error:", error);
        throw new Error(`eth_maxPriorityFeePerGas failed: ${error.message}`);
    }
};
