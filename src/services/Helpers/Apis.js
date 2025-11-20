import axios from 'axios';

const CoingekoBaseURL = 'https://pro-api.coingecko.com/api/v3';

export const GetcurentPrices = async (item, id) => {
    try {
        let change24hr = 0;
        let curentprice = 0;
        let tokenLogo = '';
        if (id) {

            let res = await axios.get(
                `${CoingekoBaseURL}/coins/${id == 'matic-network' ? 'polygon-ecosystem-token' : id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false&x_cg_pro_api_key=CG-oGhRPdwsHvTLFmMJ6kW7mea9`,
            );
            // `${CoingekoBaseURL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false&x_cg_pro_api_key=CG-oGhRPdwsHvTLFmMJ6kW7mea9`,

            console.log('res:::res:::res:::res', res);

            change24hr = res?.data.market_data?.price_change_percentage_24h;
            curentprice = res.data?.market_data?.current_price?.usd;
            tokenLogo = res.data?.image.small;
        } else {
            change24hr = item?.change24h ?? 0;
            curentprice = item?.currentPriceUsd ?? 0;
            tokenLogo = item?.logoURI ?? '';
        }
        return {
            change24hr,
            curentprice,
            tokenLogo,
        };
    } catch (error) {
        console.log('Error in getFiatcurency:', error);
        throw error;
    }
};

export const gettokenPricesDexscaner = async adress => {
    try {
        const url = `https://api.dexscreener.com/latest/dex/tokens/${adress}`;

        const response = await axios({
            method: 'get',
            url: url,
            headers: {
                'content-Type': 'application/json',
            },
        });

        if (response?.data?.pairs && response.data.pairs.length > 0) {
            const price = response.data.pairs[0].priceUsd; // The price in USD (if available)
            console.log(`Price of the token: $${price}`);

            let object = {
                change24hr: response.data.pairs[0].priceChange?.h24 ?? 0,
                curentprice: response.data.pairs[0].priceUsd ?? 0,
            };

            return object;
        } else {
            console.log('Token price not found');
            let object = {
                change24hr: 0,
                curentprice: 0,
            };
            return object;
        }
    } catch (error) {
        console.log('errorerror solll', error);
        let object = {
            change24hr: 0,
            curentprice: 0,
        };
        return object;
    }
};

export const GetSolTOkenBySerch = async address => {
    try {
        const response = await axios({
            method: 'get',
            url: JUP_SOL_BASE + `?query=${address}`,
            headers: {
                'content-Type': 'application/json',
            },
        });


        console.log('responseresponseresponseresponseresponse', response);

        // const connection = new Connection('https://smart-bold-spree.solana-mainnet.quiknode.pro/f54380e3bfb075754d1d7bfdfe8507cc8fed378a/', 'confirmed');

        // const mintPublicKey = new PublicKey(address);
        // const mintInfo = await getMint(connection, mintPublicKey);

        // console.log('Token Decimals:', mintInfo.decimals);
        // console.log('Token Symbol:', mintInfo.symbol); // Note: Symbol isn't directly available, you'll need to fetch it through a custom metadata provider or use specific metadata contracts.
        // console.log('Token Supply:', mintInfo.supply.toString());


        let data = {
            data: response?.data[0]
        }
        return data;
    } catch (error) {
        console.log('errorerrorerror', error.response);

        return error;
    }
};

export const getGraphDataById = async (id, days = 2) => {
    try {
        if (!id) return null;

        const tokenId = id === 'matic-network' ? 'polygon-ecosystem-token' : id;

        // Build URL dynamically
        // let url = `${CoingekoBaseURL}/coins/${tokenId}/market_chart?vs_currency=usd`;

        // if (interval) {
        //     // interval found → use days=1 and include interval
        //     url += `&days=${days}&interval=${interval}`;
        // } else {
        //     // interval missing → use dynamic days and remove interval parameter
        //     url += `&days=${days}`;
        // }

        // url += `&x_cg_pro_api_key=CG-oGhRPdwsHvTLFmMJ6kW7mea9`;
        let url = `${CoingekoBaseURL}/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}&x_cg_pro_api_key=CG-oGhRPdwsHvTLFmMJ6kW7mea9`;

        console.log('urlurlurlurlurlurl', url);


        const res = await axios.get(url);

        console.log("Graph Data Res:", res?.data);

        return res?.data;

    } catch (error) {
        console.log("Error in getGraphDataByIdw:", error);
        throw error;
    }
};
