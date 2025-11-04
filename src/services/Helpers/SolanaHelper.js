import '../../../shim'
import '../../../globals'
const bip39 = require('bip39');
const bs58 = require('bs58');
import { derivePath } from 'ed25519-hd-key';
import * as SolanaWeb3 from '@solana/web3.js';
import { getAccount, getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import { PublicKey, Connection, VersionedTransaction, clusterApiUrl, LAMPORTS_PER_SOL, Transaction, SystemProgram, Keypair } from '@solana/web3.js';
import axios from 'axios';
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';
import { GetSolTOkenBySerch } from './Apis';

const connection = new SolanaWeb3.Connection(
    "https://intensive-convincing-sailboat.solana-mainnet.quiknode.pro/09795bb112c645d542f9d3d2e841badb39521a5e/"
);


export async function sendSwapTransaction(swapResponseData, userPrivateKeyBase58) {


    try {


        const decodedPrivateKey = bs58.decode(userPrivateKeyBase58);
        const SIGNER_WALLET = Keypair.fromSecretKey(new Uint8Array(decodedPrivateKey));
        console.log('SIGNER_WALLETSIGNER_WALLETSIGNER_WALLET', SIGNER_WALLET);
        const connection = new Connection(clusterApiUrl("mainnet-beta")); // your actual connection here
        const messageData = Buffer.from(swapResponseData, 'base64');

        console.log('messageDatamessageData', messageData);
        const tx = VersionedTransaction.deserialize(messageData);
        console.log('txtxtxtx', tx);
        const { blockhash } = await connection.getLatestBlockhash();
        tx.message.recentBlockhash = blockhash; // Update blockhash!
        tx.sign([SIGNER_WALLET]); // Sign the tx with wallet
        console.log('blockhash', blockhash);
        const txid = await connection.sendTransaction(tx, { maxRetries: 5 });
        console.log("   ✅ - Transaction sent to network", txid);
        console.log('transactiontransaction', tx);
        return {
            signature: txid,
            status: 'pending'
        };
    } catch (error) {
        console.error("Error during transaction submission:", error);
        throw error;
    }
}

export const generateSolanaWallet = async phrase => {
    const seed = bip39.mnemonicToSeedSync(phrase.trim(), '');
    const path = `m/44'/501'/0'`;
    const keypair = Keypair.fromSeed(derivePath(path, seed.toString('hex')).key);
    const newArrray = keypair._keypair.secretKey;
    const bytes = Uint8Array.from(newArrray);
    return {
        address: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(bytes),
    };
};


export const solanaAddresValidation = (addres) => {
    return new Promise(async (resolve, reject) => {
        try {
            const address = new SolanaWeb3.PublicKey(addres).toBase58();
            console.log('isValidAddress', address);
            let isValidAddress = SolanaWeb3.PublicKey.isOnCurve(address);
            resolve(isValidAddress)
        } catch (error) {
            resolve(false)
        }
    })

}

const url = clusterApiUrl("mainnet-beta")

export const getSolanaBalance = async (solanaAddress) => {
    return new Promise(async (resolve, reject) => {

        try {

            const data = {
                jsonrpc: "2.0",
                id: 1,
                method: 'getBalance',
                params: [solanaAddress, { "encoding": "base58" }]
            }
            axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((rsp) => {
                // console.log(rsp.data.result.value / LAMPORTS_PER_SOL, 'solanaAddresssolanaAddress')

                resolve({ balance: rsp.data.result.value / LAMPORTS_PER_SOL });
            }).catch((e) => {
                console.error(e.message)
                console.log(e.code, e.response.status)
                console.log(e.response.data)
                resolve({ balance: 0 })
            })


        } catch (error) {
            console.log('error get solana balance', error);
            resolve({ balance: 0 })

        }
    })
}

export const getSolanaTokenBalance = async (tokendata, solanaAddress, solanaPrivateKey) => {
    return new Promise(async (resolve, reject) => {


        try {


            const mintPubkey = new SolanaWeb3.PublicKey(
                tokendata.tokenAddress,
            );

            const payer = SolanaWeb3.Keypair.fromSecretKey(
                bs58.decode(solanaPrivateKey),
            );

            const tokenAccount =
                await getOrCreateAssociatedTokenAccount(
                    connection,
                    payer,
                    mintPubkey,
                    payer.publicKey,
                );
            // console.log(
            //     'tokenAccount',
            //     tokenAccount.address.toString(),
            // );
            const tokenAccountInfo = await getAccount(
                connection,
                tokenAccount.address,
            );
            // console.log(
            //     'tokenAccountInfotokenAccountInfo',
            //     tokenAccountInfo,
            // );
            let ammount = tokenAccountInfo.amount;
            const balance = Number(ammount) / Math.pow(10, tokendata?.decimals);


            resolve({ balance: balance })
        } catch (error) {
            console.log('error get solana balance', error);
            resolve({ balance: 0 })
        }

    })
}

export const getFeesolana = async () => {
    try {
        // Connect to the Solana cluster
        const connection = new Connection(
            "https://intensive-convincing-sailboat.solana-mainnet.quiknode.pro/09795bb112c645d542f9d3d2e841badb39521a5e/"
        );

        // Fetch the latest blockhash
        const { blockhash } = await connection.getLatestBlockhash();

        // Fetch the fee calculator for the blockhash
        const feeCalculatorResponse = await connection.getFeeCalculatorForBlockhash(blockhash);

        if (!feeCalculatorResponse || !feeCalculatorResponse.value) {
            throw new Error("Unable to fetch fee calculator");
        }

        // Extract lamports per signature
        const lamportsPerSignature = feeCalculatorResponse.value.lamportsPerSignature;

        // Specify the number of signatures (transactions)
        const numberOfSignatures = 1; // Adjust this based on your use case

        // Calculate the total fee in lamports
        const totalFee = lamportsPerSignature * numberOfSignatures;

        // Convert the total fee to SOL
        const feeInSol = totalFee / 1e9;

        return {
            feeinCurrency: Number(feeInSol).toFixed(9), // Return as a string for precision
        };
    } catch (error) {
        console.error("Error calculating Solana fee:", error);
        return 0.0004; // Return a fallback fee if an error occurs
    }
};

// Function to calculate transaction fee for SOL transfer

export const estimateSolTransferFee = async (coin, fromPublicKey, toPublicKey, amountInEther, isDolorValue) => {
    return new Promise(async (resolve, reject) => {
        try {
            let amount = isDolorValue ? amountInEther / coin?.current_price : amountInEther
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: new PublicKey(fromPublicKey),
                    toPubkey: new PublicKey(toPublicKey),
                    lamports: Math.floor(amount * LAMPORTS_PER_SOL), // Use Math.floor to convert amount to lamports
                })
            );

            // Replace the fetch call with axios
            const response = await axios.post('https://api.mainnet-beta.solana.com', {
                jsonrpc: '2.0',
                id: 1,
                method: 'getLatestBlockhash'
            });
            // console.log('responseresponse', response);
            const { blockhash, feeCalculator } = response.data.result.value;

            transaction.recentBlockhash = blockhash;

            const feeInSol = feeCalculator.lamportsPerSignature / LAMPORTS_PER_SOL;

            console.log(`Estimated SOL Transfer Fee: ${feeInSol} SOL`);
            resolve({
                Fee: feeInSol
            });

        } catch (error) {
            resolve({
                Fee: 0.0004
            });
            // reject(error);
        }
    });
};

export const SolanaCoinSend = async (amountToSend, fromAddress, privateKey, toAddress) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log('sssssollllsemddd', { amountToSend, fromAddress, privateKey, toAddress });


            const connection = new Connection(
                "https://intensive-convincing-sailboat.solana-mainnet.quiknode.pro/09795bb112c645d542f9d3d2e841badb39521a5e/", "confirmed"
            );

            const fromPubKey = new SolanaWeb3.PublicKey(fromAddress);
            const fromAccount = SolanaWeb3.Keypair.fromSecretKey(bs58.decode(privateKey));
            const toPubKey = new SolanaWeb3.PublicKey(toAddress);

            // Convert amount to lamports
            let lamportsToSend = Math.floor(SolanaWeb3.LAMPORTS_PER_SOL * parseFloat(amountToSend));

            // Get current balance
            const balance = await connection.getBalance(fromPubKey);
            console.log('Current balance (lamports):', balance);

            // ✅ Fetch a fresh blockhash right before signing
            let { blockhash } = await connection.getLatestBlockhash();
            console.log("Latest Blockhash:", blockhash);

            // Create transaction
            let transaction = new SolanaWeb3.Transaction().add(
                SolanaWeb3.SystemProgram.transfer({
                    fromPubkey: fromPubKey,
                    toPubkey: toPubKey,
                    lamports: lamportsToSend,
                })
            );

            // ✅ Set the blockhash right before signing
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = fromPubKey;

            // Get estimated transaction fee
            const fee = await connection.getFeeForMessage(transaction.compileMessage());
            console.log('Estimated transaction fee (lamports):', fee.value);

            // ✅ Adjust for max amount case
            if (lamportsToSend + fee.value > balance) {
                lamportsToSend = balance - fee.value;
                if (lamportsToSend <= 0) {
                    return reject(new Error('Insufficient balance to cover transaction fee.'));
                }
                console.log('Adjusted lamports to send:', lamportsToSend);

                // Update transaction with adjusted amount
                transaction.instructions[0] = SolanaWeb3.SystemProgram.transfer({
                    fromPubkey: fromPubKey,
                    toPubkey: toPubKey,
                    lamports: lamportsToSend,
                });
            }

            // ✅ Fetch a **newest** blockhash before finalizing
            let { blockhash: freshBlockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = freshBlockhash;

            // Sign the transaction
            transaction.sign(fromAccount);

            // ✅ Send and confirm transaction
            const signature = await SolanaWeb3.sendAndConfirmTransaction(connection, transaction, [fromAccount]);

            console.log('Transaction signature:', signature);
            resolve(signature);

        } catch (error) {
            console.log('Error sending SOL:', error);
            if (error instanceof SolanaWeb3.SendTransactionError) {
                console.log('Transaction Logs:', error.logs);
            }
            reject(error);
        }
    });
};

// export const SolanaCoinSend = async (amountToSend, fromAddress, privateKey, toAddress) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const connection = new SolanaWeb3.Connection(SolanaWeb3.clusterApiUrl('mainnet-beta'));
//             const fromPubKey = new SolanaWeb3.PublicKey(fromAddress);
//             const fromAccount = SolanaWeb3.Keypair.fromSecretKey(bs58.decode(privateKey));
//             const toPubKey = new SolanaWeb3.PublicKey(toAddress);

//             // Calculate the amount to send in lamports (1 SOL = 1e9 lamports)
//             let lamportsToSend = SolanaWeb3.LAMPORTS_PER_SOL * parseFloat(amountToSend);

//             // Get the current balance of the sender
//             const balance = await connection.getBalance(fromPubKey);
//             console.log('Current balance (lamports):', balance);

//             // Estimate the transaction fee
//             const { blockhash } = await connection.getLatestBlockhash();

//             const transaction = new SolanaWeb3.Transaction().add(
//                 SolanaWeb3.SystemProgram.transfer({
//                     fromPubkey: fromPubKey,
//                     toPubkey: toPubKey,
//                     lamports: lamportsToSend,
//                 })
//             );

//             // Sign the transaction to estimate the fee
//             transaction.recentBlockhash = blockhash;
//             transaction.feePayer = fromPubKey;
//             transaction.sign(fromAccount);

//             const fee = await connection.getFeeForMessage(transaction.compileMessage());
//             console.log('Estimated transaction fee (lamports):', fee.value);

//             // Check if balance is enough to cover both amountToSend and fee
//             if (lamportsToSend + fee.value > balance) {
//                 lamportsToSend = balance - fee.value;
//                 if (lamportsToSend <= 0) {
//                     return reject(new Error('Insufficient balance to cover transaction fee.'));
//                 }
//                 console.log('Adjusted lamports to send:', lamportsToSend);

//                 // Update the transaction with the adjusted lamports amount
//                 transaction.instructions[0] = SolanaWeb3.SystemProgram.transfer({
//                     fromPubkey: fromPubKey,
//                     toPubkey: toPubKey,
//                     lamports: lamportsToSend,
//                 });
//             }

//             // Send and confirm the transaction
//             const signature = await SolanaWeb3.sendAndConfirmTransaction(connection, transaction, [fromAccount]);

//             console.log('Transaction signature:', signature);
//             resolve(signature);

//         } catch (error) {
//             console.log('Error sending SOL:', error);
//             if (error instanceof SolanaWeb3.SendTransactionError) {
//                 console.log('Transaction Logs:', error.logs);
//             }
//             reject(error);
//         }
//     });
// };


export const sendSolanaToken = async (amountToSend, fromAddress, privateKey, toAddress, tokenAddress, decimals) => {
    return new Promise(async (resolve, reject) => {
        try {


            console.log('Sending Solana token:', amountToSend);

            const connection = new Connection('https://api.mainnet-beta.solana.com');

            const fromPubKey = new PublicKey(fromAddress);
            const toPubKey = new PublicKey(toAddress);
            const tokenPubKey = new PublicKey(tokenAddress);

            const fromAccount = Keypair.fromSecretKey(bs58.decode(privateKey));

            const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                fromAccount,
                tokenPubKey,
                fromAccount.publicKey
            );

            const toTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                fromAccount,
                tokenPubKey,
                toPubKey
            );

            const amountInTokens = amountToSend * Math.pow(10, decimals);

            const signature = await transfer(
                connection,
                fromAccount,
                fromTokenAccount.address,
                toTokenAccount.address,
                fromAccount.publicKey,
                amountInTokens
            );

            console.log('Transaction Signature:', signature);
            resolve(signature);

        } catch (error) {
            console.error('Error sending Solana token:', error);
            reject(error);
        }
    });
};


export const SolanaMetadata = async (toknAddress) => {

    return new Promise(async (resolve, reject) => {

        try {

            const tokenList = await new TokenListProvider().resolve();
            const tokens = tokenList.filterByClusterSlug('mainnet-beta').getList();
            const tokenInfo = tokens.find(
                (x) => x.address.toLowerCase() === toknAddress.toLowerCase()
            );

            if (tokenInfo) {
                resolve({
                    symbol: tokenInfo.symbol,
                    decimals: tokenInfo.decimals.toString(),
                    name: tokenInfo.name
                });
            }
            else {


                const response = await GetSolTOkenBySerch(toknAddress.trim())
                console.log('sol token searchhh adress hereeeeee', response)
                let object = response?.data

                if (object) {
                    resolve({
                        symbol: object?.symbol,
                        decimals: object?.decimals.toString(),
                        name: object?.name
                    });
                }


            }



        } catch (error) {
            console.log('sol token searchhh adress hereeeeee errororororoorororor', error);

        }
    })

}
