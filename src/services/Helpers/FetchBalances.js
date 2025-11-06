import { UpdateTokenAndCoinBalance } from "../database";
import { GetcurentPrices } from "./Apis";
import { GetbtcBalnceofAddress } from "./BitcoinHelper";
import { coinGekoTokenID } from "./CommonHelper";
import { evmCoinBalances, evmTokenBalce } from "./EVMHelper";
import { getSolanaBalance, getSolanaTokenBalance } from "./SolanaHelper";


export const UpdateActiveWalletBalance = async data => {
    return new Promise((resolve, reject) => {
        try {
            let waletAndtoken = data;
            // console.log('waletAndtokenwaletAndtoken', waletAndtoken);

            waletAndtoken?.tokens?.map(async res => {
                if (res?.isEvm == 1) {
                    if (res?.type == 'token') {
                        let coinbalance = await evmTokenBalce(
                            res,
                            waletAndtoken?.walletAddress,
                        );
                        const update = await UpdateTokenAndCoinBalance(
                            coinbalance?.balance,
                            res?.id,
                        );

                        resolve(update);
                    } else {
                        let coinbalance = await evmCoinBalances(
                            res,
                            waletAndtoken?.walletAddress,
                        );

                        const update = await UpdateTokenAndCoinBalance(
                            coinbalance?.balance,
                            res?.id,
                        );

                        resolve(update);
                    }
                } else if (res?.chainName == 'Solana') {
                    if (res?.type == 'token') {
                        let soltokenBalnce = await getSolanaTokenBalance(
                            res,
                            waletAndtoken?.solanaWalletAddress,
                            waletAndtoken?.solanaPrivateKey,
                        );
                        const update = await UpdateTokenAndCoinBalance(
                            soltokenBalnce?.balance,
                            res?.id,
                        );

                        resolve(update);
                    } else {
                        let solcoinbalance = await getSolanaBalance(
                            waletAndtoken?.solanaWalletAddress,
                        );
                        const update = await UpdateTokenAndCoinBalance(
                            solcoinbalance?.balance,
                            res?.id,
                        );

                        resolve(update);
                    }
                } else if (res?.chainName == 'bitcoin') {
                    let bitcoinBalcne = await GetbtcBalnceofAddress(
                        waletAndtoken?.btcWalletAddress,
                    );

                    const update = await UpdateTokenAndCoinBalance(
                        bitcoinBalcne?.balance,
                        res?.id,
                    );

                    resolve(update);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};


export const UpdateCoinAndTokenPrices = async (tokendata) => {
    try {
        const idofcoingeko = coinGekoTokenID(tokendata?.chainId, tokendata)

        const response = await GetcurentPrices(idofcoingeko ?? null)

        const change24hr = response?.change24hr ?? 0
        const curentprice = response?.curentprice ?? 0
        const tokenLogo = response?.tokenLogo ?? ''

        // const update = await UpdateCoinCurrentPrices(change24hr, curentprice, tokenLogo)


    } catch (error) {
        console.error('Error in UpdateCoinAndTokenPrices:', error);
        throw error;
    }
};