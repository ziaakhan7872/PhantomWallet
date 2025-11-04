import '../../../shim';
import '../../../globals';
import axios from 'axios';
import { validate } from 'bitcoin-address-validation';
const SochainApiKey = 'dW5eBvmExx11mqMJbe4eO7_-MaAk9bB9';
const bitcore = require('bitcore-lib');
import Mnemonic from 'bitcore-mnemonic';
import { bech32 } from 'bech32';


export const generateBitcoinWallet = phrase => {
    try {
        const mnemonic = new Mnemonic(phrase);

        const seed = mnemonic.toSeed();

        const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seed);

        const path = "m/84'/0'/0'/0/0";
        const derivedKey = hdPrivateKey.deriveChild(path);

        const publicKey = derivedKey.publicKey;

        const pubKeyHash = bitcore.crypto.Hash.sha256ripemd160(
            publicKey.toBuffer(),
        );

        const words = bech32.toWords(Buffer.from(pubKeyHash));
        const address = bech32.encode('bc', [0].concat(words)); // '0' is the witness version for P2WPKH

        const privateKey = derivedKey.privateKey.toWIF();
        console.log('Private Key:', privateKey, 'Address:', address);

        return {
            privateKey,
            address,
        };
    } catch (error) {
        console.error('Error generating Bitcoin wallet:', error);
        throw error;
    }
};

export const GetbtcBalnceofAddress = async btcWalletAddress => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: `https://blockchain.info/address/${btcWalletAddress}?format=json`,
                method: 'GET',
            });



            let balance1 = response.data.final_balance / 100000000;


            resolve({ balance: balance1 });
        } catch (error) {
            resolve({ balance: 0 });
        }
    });
};

export const BitcoinAddressValidation = address => {
    console.log('wallet isvalid', address);
    let result = validate(address);
    return result;
};

export const estimateBtcTransactionFee = (
    coin,
    sourceAddress,
    amount,
    isDolorValue,
) => {
    return new Promise(async (resolve, reject) => {
        try {
            const feeData = await axios.get(
                'https://mempool.space/api/v1/fees/recommended',
            );

            // Extracting the fastestFee, halfHourFee, and hourFee from the response
            const { fastestFee, halfHourFee, hourFee } = feeData.data;

            console.log('fastestFeefastestFeefastestFee', fastestFee);

            let amountToSend = isDolorValue ? amount / coin?.current_price : amount;

            console.log('amountToSend', sourceAddress, amountToSend);
            const satPerByte = fastestFee;

            let fee = 0;
            let inputCount = 1; // Start with 1 because we need at least one input
            let outputCount = 1; // Start with 1 because we need at least one output

            // Fetch unspent transaction outputs (UTXOs)

            const utxosResponse = await axios.get(
                `https://chain.so/api/v3/unspent_outputs/BTC/${sourceAddress}`,
                {
                    headers: {
                        'API-KEY': SochainApiKey,
                    },
                },
            );

            console.log('UTXOs:', utxosResponse.data);
            let totalAmountAvailable = 0;
            let inputs = [];

            utxosResponse.data.data.outputs.forEach(element => {
                let utxo = {};
                utxo.satoshis = new bitcore.Unit(element.value, 'BTC').toSatoshis();
                utxo.script = element.script_hex;
                utxo.address = utxosResponse.data.data.address;
                utxo.txId = element.txid;
                utxo.outputIndex = element.output_no;
                totalAmountAvailable += utxo.satoshis;
                inputCount += 1;
                inputs.push(utxo);
            });

            // Calculate transaction size: 148 bytes per input, 34 bytes per output, 10 bytes overhead, subtracting 1 byte per input
            let transactionSize =
                inputCount * 148 + outputCount * 34 + 10 - inputCount;

            // Calculate fee in satoshis
            fee = transactionSize * satPerByte;

            // Convert fee to BTC
            let feeInBtc = bitcore.Unit.fromSatoshis(fee).toBTC();
            console.log(`Estimated BTC Transfer Fee: ${feeInBtc} BTC`);

            resolve({
                Fee: feeInBtc,
            });
        } catch (error) {
            console.error('Error estimating BTC transfer fee:', error);
            reject(error);
        }
    });
};

export const sendBitcoin = (
    fromprivateKey,
    fromadress,
    recieveraddress,
    amount,
) => {
    return new Promise(async (resolve, reject) => {
        try {
            const feeData = await axios.get(
                'https://mempool.space/api/v1/fees/recommended',
            );

            // Extracting the fastestFee, halfHourFee, and hourFee from the response
            const { fastestFee, halfHourFee, hourFee } = feeData.data;
            const perbyte = fastestFee;
            const privateKey = new bitcore.PrivateKey(fromprivateKey);
            const sourceAddress = fromadress;
            const recieverAddress = recieveraddress;
            let amountToSend = amount;
            let satoshiToSend = new bitcore.Unit(amountToSend, 'BTC');


            satoshiToSend = satoshiToSend.toSatoshis();

            let satPerByte = perbyte;
            let fee = 0;
            let inputCount = 1;
            let outputCount = 1;
            const utxos = await axios.get(
                `https://chain.so/api/v3/unspent_outputs/BTC/${sourceAddress}`,
                {
                    headers: {
                        'API-KEY': SochainApiKey,
                    },
                },
            );
            console.log('utxosutxosutxosutxosutxos====>>>>>>', utxos);

            const transaction = new bitcore.Transaction();

            let totalAmountAvailable = 0;

            let inputs = [];
            utxos.data.data.outputs.forEach(async element => {
                console.log('element::::', element);
                let utxo = {};
                utxo.satoshis = new bitcore.Unit(element.value, 'BTC').toSatoshis();
                utxo.script = element.script;
                utxo.address = element.address;
                utxo.txId = element.hash;
                utxo.outputIndex = element.index;
                totalAmountAvailable += utxo.satoshis;
                inputCount += 1;
                inputs.push(utxo);
            });

            let transactionSize =
                inputCount * 148 + outputCount * 34 + 10 - inputCount;
            // Check if we have enough funds to cover the transaction and the fees assuming we want to pay 20 satoshis per byte

            fee = transactionSize * satPerByte;
            //Set transaction input
            console.log('transaction', transaction);
            transaction.from(inputs);
            console.log('transaction22', transaction);

            // set the recieving address and the amount to send

            if (totalAmountAvailable == satoshiToSend) {
                let deductFee = satoshiToSend - fee;
                transaction.to(recieverAddress, deductFee);
            } else if (totalAmountAvailable - satoshiToSend - fee > 0) {
                transaction.to(recieverAddress, satoshiToSend);
            } else {
                throw new Error('Insufficient BTC funds for gas fee');
            }
            console.log('transaction33', transaction);

            // Set change address - Address to receive the left over funds after transfer
            transaction.change(sourceAddress);
            console.log('transactionsource', transaction);

            //manually set transaction fees: 20 satoshis per byte
            transaction.fee(fee);
            console.log('transactionfeee', transaction);

            transaction.sign(privateKey);

            // serialize Transactions
            const serializedTransaction = transaction.serialize(); // This is the raw transaction hex

            console.log(
                'Serialized Transaction:',
                serializedTransaction,
                'Fee:',
                fee,
            );

            const apiEndpoint = 'https://blockstream.info/api/tx'; // Correct API endpoint for broadcasting

            const headers = {
                'Content-Type': 'text/plain', // Blockstream expects raw text, not JSON
            };

            const data = serializedTransaction; // The raw transaction hex itself

            const response = await axios.post(apiEndpoint, data, { headers });

            resolve(response.data);
        } catch (error) {
            console.error('Error estimating BTC transfer fee:', error);
            reject(error);
        }
    });
};
