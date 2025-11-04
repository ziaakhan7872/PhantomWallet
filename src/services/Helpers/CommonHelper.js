

export const coinGekoTokenID = (chainid, tokendata) => {

    console.log('tokendatatokendatatokendatatokendata', tokendata);

    let id = ''

    if (tokendata?.chainName == "bitcoin") {
        id = "bitcoin"
    }
    else if (chainid == 1 || chainid == 42161 || chainid == 8453) {
        id = "ethereum"
    }

    else if (chainid == 56) {
        id = "binancecoin"
    }

    else if (chainid == 'sol') {
        id = "solana"
    }

    else if (chainid == 137) {
        id = "matic-network"
    }

    else if (chainid == 43114) {
        id = "avalanche-2"
    }
    else if (chainid == 146) {
        id = "sonic-2"
    }

    return id
}

export function transformArray(array) {
    let result = [];

    array.forEach(item => {
        Object.keys(item.platforms).forEach(platform => {
            result.push({
                id: item.id,
                name: item.name,
                platformsaddress: item.platforms[platform],
                Platfromname: platform,
                symbol: item.symbol
            });
        });
    });

    return result;
}
