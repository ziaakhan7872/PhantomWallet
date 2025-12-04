import { UpdateCoinCurrentPrices, UpdateTokenAndCoinBalance, UpdateTokenCurrentPrices } from "../database";
import { GetcurentPrices, gettokenPricesDexscaner } from "./Apis";
import { GetbtcBalnceofAddress } from "./BitcoinHelper";
import { coinGekoTokenID, getChainIdByChainName } from "./CommonHelper";
import { evmCoinBalances, evmTokenBalce, GetchainDataByCHainID } from "./EVMHelper";
import { getSolanaBalance, getSolanaTokenBalance } from "./SolanaHelper";


export const UpdateActiveWalletBalance = async data => {
    return new Promise((resolve, reject) => {
        try {
            let waletAndtoken = data;
            // console.log('waletAndtokenwaletAndtoken', waletAndtoken);

            waletAndtoken?.tokens?.map(async res => {
                await UpdateCoinAndTokenPrices(res);
                // if (res?.isEvm == 1) {
                //     if (res?.type == 'token') {
                //         let coinbalance = await evmTokenBalce(
                //             res,
                //             waletAndtoken?.walletAddress,
                //         );
                //         const update = await UpdateTokenAndCoinBalance(
                //             coinbalance?.balance,
                //             res?.id,
                //         );

                //         resolve(update);
                //     } else {
                //         let coinbalance = await evmCoinBalances(
                //             res,
                //             waletAndtoken?.walletAddress,
                //         );

                //         const update = await UpdateTokenAndCoinBalance(
                //             coinbalance?.balance,
                //             res?.id,
                //         );

                //         resolve(update);
                //     }
                // } else if (res?.chainName == 'Solana') {
                //     if (res?.type == 'token') {
                //         let soltokenBalnce = await getSolanaTokenBalance(
                //             res,
                //             waletAndtoken?.solanaWalletAddress,
                //             waletAndtoken?.solanaPrivateKey,
                //         );
                //         const update = await UpdateTokenAndCoinBalance(
                //             soltokenBalnce?.balance,
                //             res?.id,
                //         );

                //         resolve(update);
                //     } else {
                //         let solcoinbalance = await getSolanaBalance(
                //             waletAndtoken?.solanaWalletAddress,
                //         );
                //         const update = await UpdateTokenAndCoinBalance(
                //             solcoinbalance?.balance,
                //             res?.id,
                //         );

                //         resolve(update);
                //     }
                // } else if (res?.chainName == 'bitcoin') {
                //     let bitcoinBalcne = await GetbtcBalnceofAddress(
                //         waletAndtoken?.btcWalletAddress,
                //     );

                //     const update = await UpdateTokenAndCoinBalance(
                //         bitcoinBalcne?.balance,
                //         res?.id,
                //     );

                //     resolve(update);
                // }
            });
        } catch (error) {
            reject(error);
        }
    });
};


export const UpdateCoinAndTokenPrices = async (tokendata) => {
    try {

        // if (tokendata?.type == 'token') {
        //     const response = await gettokenPricesDexscaner(tokendata?.tokenAddress)

        //     let data = {
        //         change24hr: response?.change24hr ?? 0,
        //         curentprice: response?.curentprice ?? 0,
        //         tokenLogo: response?.tokenLogo ?? '',
        //         tokenAddress: tokendata?.tokenAddress,
        //         cmcId: tokendata?.cmcId,
        //     }

        //     console.log('data::: data::: data', data);


        //     const update = await UpdateTokenCurrentPrices(data)
        // } else {

        // const getcoinid = await getChainIdByChainName(tokendata?.chainName)
        // console.log('tokendata?.chainId:::getcoinid:::', getcoinid, 'and', tokendata?.chainName);

        // const idofcoingeko = coinGekoTokenID(getcoinid, tokendata)

        // console.log('tokendata?.chainId:::idofcoingeko:::', idofcoingeko, 'and', tokendata?.chainName);

        // const response = await GetcurentPrices(idofcoingeko ?? null)

        console.log('tokendata:::tokendata', tokendata);


        const response = await GetcurentPrices(tokendata, tokendata?.cmcId)

        let data = {
            change24hr: response?.change24hr ?? 0,
            curentprice: response?.curentprice ?? 0,
            tokenLogo: response?.tokenLogo ?? '',
            tokenAddress: tokendata?.tokenAddress,
            cmcId: tokendata?.cmcId,
        }

        console.log('datadatadatadatadata', data);

        // const change24hr = response?.change24hr ?? 0
        // const curentprice = response?.curentprice ?? 0
        // const tokenLogo = response?.tokenLogo ?? ''

        if (tokendata?.type == 'token') {
            const update = await UpdateTokenCurrentPrices(data)
        } else {
            const update = await UpdateCoinCurrentPrices(data)
        }
        // }


    } catch (error) {
        console.error('Error in UpdateCoinAndTokenPrices:', error);
        throw error;
    }
};