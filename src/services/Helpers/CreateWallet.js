import Web3 from "web3";
import { generateBitcoinWallet } from "./BitcoinHelper";
import { generateEvmWallet } from "./EVMHelper";
import { generateSolanaWallet } from "./SolanaHelper";


export const generateAllWallets = async (seed) => {
    try {
        const [evmWallet, bitcoin, solana, tron] = await Promise.all([
            generateEvmWallet(seed),
            generateBitcoinWallet(seed),
            generateSolanaWallet(seed),
        ]);



        return {
            evmWallet, bitcoin, solana
        }
    } catch (error) {
        console.log('catch error in generateAllWallets', error);
        throw error
    }
}

export const generaEvmWalletUsingSeedphrase = async (seed) => {
    try {
        const [evmWallet] = await Promise.all([
            generateEvmWallet(seed),
        ]);

        return {
            evmWallet
        }
    } catch (error) {
        throw error
    }
}

export const generaEvmWalletUsingPrivatekey = async (seed) => {
    try {
        const [evmWallet] = await Promise.all([
            CreatePrivateKeyToWallet(seed),
        ]);

        return {
            evmWallet
        }
    } catch (error) {
        throw error
    }
}


const web3Instence = rpcUrl => {
    return new Web3(rpcUrl);
};

export const CreateEvmWalletUsingPrivateKey = (phrase) => {
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