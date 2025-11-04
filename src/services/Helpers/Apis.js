import axios from 'axios';

const CoingekoBaseURL = 'https://pro-api.coingecko.com/api/v3';

export const GetcurentPrices = async id => {
    try {
        let change24hr = 0;
        let curentprice = 0;
        let tokenLogo = '';
        if (id) {
            let tokenapikey = await get_ApiKeys();

            const apikey = tokenapikey?.data?.keys?.ApiKeysforTokens;
            let res = await axios.get(
                `${CoingekoBaseURL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false&x_cg_pro_api_key=${apikey}`,
            );
            change24hr = res?.data.market_data?.price_change_percentage_24h;
            curentprice = res.data?.market_data?.current_price?.usd;
            tokenLogo = res.data?.image.small;
        } else {
            change24hr = 0;
            curentprice = 0;
            tokenLogo = '';
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