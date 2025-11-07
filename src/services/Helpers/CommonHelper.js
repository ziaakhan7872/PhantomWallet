

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

    else if (chainid == 'solana') {
        id = "solana"
    }

    else if (chainid == 137) {
        id = "polygon-ecosystem-token"
    }

    else if (chainid == 43114) {
        id = "avalanche-2"
    }
    else if (chainid == 146) {
        id = "sonic-2"
    }

    return id
}

export const getChainIdByChainName = (chainName) => {

    let id = ''

    if (chainName == "bitcoin") {
        id = "bitcoin"
    }
    else if (chainName == 'Solana') {
        id = "solana"
    }
    else if (chainName == 'Ethereum') {
        id = 1
    }
    else if (chainName == 'Binance Smart Chain') {
        id = 56
    }
    else if (chainName == 'Polygon') {
        id = 137
    }
    else if (chainName == 'Avalanche') {
        id = 43114
    }
    else if (chainName == 'Arbitrum') {
        id = 42161
    }
    else if (chainName == 'Base') {
        id = 8453
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

export const calculateTotalBalance = arrayOfObjects => {
    // Ensure the input is an array
    if (!Array.isArray(arrayOfObjects)) {
        throw new Error('Input must be an array of objects');
    }

    // Initialize total balance
    let totalBalance = 0;

    // Loop through each object in the array
    arrayOfObjects.forEach(obj => {
        // Ensure the object has the required properties
        if (obj.currentPriceUsd !== undefined && obj.balance !== undefined) {
            // Multiply currentPrice with balance and add to total balance
            totalBalance += Number(obj.currentPriceUsd) * Number(obj.balance);
        } else {
        }
    });
    return totalBalance;
};
