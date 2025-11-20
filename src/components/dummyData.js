import { Images } from "../Images";


export const mainnetRpcBNB = 'https://bsc-mainnet.gateway.tatum.io/'
export const mainnetRpcETH = 'https://ethereum-hoodi.gateway.tatum.io/'
export const mainnetRpcPolygon = 'https://polygon-mainnet.gateway.tatum.io'
export const mainnetRpcBase = 'https://base-mainnet.gateway.tatum.io'
export const mainnetRpcArbitrum = 'https://arb-one-mainnet.gateway.tatum.io/'
export const mainnetRpcAvalanche = 'https://avax-mainnet.gateway.tatum.io'


export const MultiChainChainsArray = [
    {
        tokenName: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        isActive: 1,
        chainName: 'Ethereum',
        rpcUrl: mainnetRpcETH,
        rpcUrlname: 'ethereum',
        isEvm: 1,
        type: 'chain',
        tokenAddress: 0,
        tokenImage: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
        chainId: 1,
    },
    {
        tokenName: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
        chainName: 'Ethereum',
        rpcUrl: mainnetRpcETH,
        rpcUrlname: 'tether',
        isEvm: 1,
        isActive: 1,
        type: 'token',
        tokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        tokenImage: 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663',
        chainId: 1,
    },
    {
        tokenName: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isActive: 1,
        chainName: 'Ethereum',
        rpcUrl: mainnetRpcETH,
        rpcUrlname: 'usd-coin',
        isEvm: 1,
        type: 'token',
        tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        tokenImage: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
        chainId: 1,
    },
    {
        tokenName: 'Binance Smart Chain',
        symbol: 'BNB',
        decimals: 18,
        isActive: 1,
        chainName: 'Binance Smart Chain',
        rpcUrl: mainnetRpcBNB,
        rpcUrlname: 'binancecoin',
        isEvm: 1,
        type: 'chain',
        tokenAddress: 0,
        tokenImage: 'https://w7.pngwing.com/pngs/997/942/png-transparent-bnb-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment-icon-thumbnail.png',
        chainId: 56,
    },
    {
        tokenName: 'Polygon',
        symbol: 'POL',
        decimals: 18,
        chainName: 'Polygon',
        rpcUrl: mainnetRpcPolygon,
        rpcUrlname: 'matic-network',
        isEvm: 1,
        isActive: 1,
        type: 'chain',
        tokenAddress: 0,
        tokenImage: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
        chainId: 137,
    },
    {
        tokenName: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
        chainName: 'Avalanche',
        rpcUrl: mainnetRpcAvalanche,
        rpcUrlname: 'avalanche-2',
        isEvm: 1,
        isActive: 1,
        type: 'chain',
        tokenAddress: 0,
        tokenImage: 'https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png?1604021818',
        chainId: 43114,
    },
    {
        tokenName: "Arbitrum",
        symbol: "ARB",
        decimals: 18,
        chainName: "Arbitrum",
        rpcUrl: mainnetRpcArbitrum,
        rpcUrlname: "arbitrum",
        isEvm: 1,
        chainId: 42161,
        isActive: 1,
        type: "chain",
        tokenAddress: '',
        tokenImage: "https://assets.coingecko.com/coins/images/16547/standard/arb.jpg?1721358242",
    },
    {
        tokenName: "BASE",
        symbol: "BASE",
        decimals: 18,
        chainName: "Base",
        rpcUrl: mainnetRpcBase,
        rpcUrlname: "based-eth",
        isEvm: 1,
        chainId: 8453,
        isActive: 1,
        type: "chain",
        tokenAddress: '',
        tokenImage: "https://assets.coingecko.com/nft_contracts/images/2989/small_2x/base-introduced.png?1707289780",
    },
    {
        tokenName: 'Bitcoin',
        symbol: 'BTC',
        decimals: 18,
        chainName: 'bitcoin',
        rpcUrl: '1111111',
        rpcUrlname: 'bitcoin',
        isEvm: 0,
        type: 'chain',
        tokenAddress: 0,
        isActive: 1,
        tokenImage: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        chainId: "bitcoin",
    },
    {
        tokenName: 'Solana',
        symbol: 'SOL',
        decimals: 18,
        chainName: 'Solana',
        rpcUrl: '0000000',
        rpcUrlname: 'solana',
        isEvm: 0,
        isActive: 1,
        type: 'chain',
        tokenAddress: 0,
        tokenImage: 'https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756',
        chainId: 'solana',
    },
];


export const EvmChainsArray = [
    {
        tokenName: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        isActive: 1,
        chainName: 'Ethereum',
        rpcUrl: mainnetRpcETH,
        rpcUrlname: 'ethereum',
        isEvm: 1,
        type: 'chain',
        tokenAddress: 0,
        tokenImage: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
        chainId: 1,
    },
    {
        tokenName: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
        chainName: 'Ethereum',
        rpcUrl: mainnetRpcETH,
        rpcUrlname: 'tether',
        isEvm: 1,
        isActive: 1,
        type: 'token',
        tokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        tokenImage: 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663',
        chainId: 1,
    },
    {
        tokenName: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isActive: 1,
        chainName: 'Ethereum',
        rpcUrl: mainnetRpcETH,
        rpcUrlname: 'usd-coin',
        isEvm: 1,
        type: 'token',
        tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        tokenImage: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
        chainId: 1,
    },
    {
        tokenName: 'Binance Smart Chain',
        symbol: 'BNB',
        decimals: 18,
        isActive: 1,
        chainName: 'Binance Smart Chain',
        rpcUrl: mainnetRpcBNB,
        rpcUrlname: 'binancecoin',
        isEvm: 1,
        type: 'chain',
        tokenAddress: 0,
        tokenImage: 'https://w7.pngwing.com/pngs/997/942/png-transparent-bnb-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment-icon-thumbnail.png',
        chainId: 56,
    },
    {
        tokenName: 'Polygon',
        symbol: 'POL',
        decimals: 18,
        chainName: 'Polygon',
        rpcUrl: mainnetRpcPolygon,
        rpcUrlname: 'matic-network',
        isEvm: 1,
        isActive: 1,
        type: 'chain',
        tokenAddress: 0,
        tokenImage: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
        chainId: 137,
    },
    {
        tokenName: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
        chainName: 'Avalanche',
        rpcUrl: mainnetRpcAvalanche,
        rpcUrlname: 'avalanche-2',
        isEvm: 1,
        isActive: 1,
        type: 'chain',
        tokenAddress: 0,
        tokenImage: 'https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png?1604021818',
        chainId: 43114,
    },
    {
        tokenName: "Arbitrum",
        symbol: "ARB",
        decimals: 18,
        chainName: "Arbitrum",
        rpcUrl: mainnetRpcArbitrum,
        rpcUrlname: "arbitrum",
        isEvm: 1,
        chainId: 42161,
        isActive: 1,
        type: "chain",
        tokenAddress: '',
        tokenImage: "https://assets.coingecko.com/coins/images/16547/standard/arb.jpg?1721358242",
    },
    {
        tokenName: "BASE",
        symbol: "BASE",
        decimals: 18,
        chainName: "Base",
        rpcUrl: mainnetRpcBase,
        rpcUrlname: "based-eth",
        isEvm: 1,
        chainId: 8453,
        isActive: 1,
        type: "chain",
        tokenAddress: '',
        tokenImage: "https://assets.coingecko.com/nft_contracts/images/2989/small_2x/base-introduced.png?1707289780",
    },
];

export const HomeTabs = [
    {
        id: 1,
        tabLogo: Images.receiveTab,
    },
    {
        id: 2,
        tabLogo: Images.sendTab,
    },
    {
        id: 3,
        tabLogo: Images.swapTab,
    },
    {
        id: 4,
        tabLogo: Images.buyTab,
    },

]

export const tokensData = [
    {
        id: 1,
        tokenLogo: Images.solanaLogo,
        tokenName: 'Solana',
        tokenAddress: 'EXrs...P4ok',
    },
    {
        id: 2,
        tokenLogo: Images.polygonLogo,
        tokenName: 'Polygon',
        tokenAddress: 'EXrs...P4ok',
    },
    {
        id: 3,
        tokenLogo: Images.bitcoinLogo,
        tokenName: 'Bitcoin',
        tokenAddress: 'EXrs...P4ok',
    },
    {
        id: 4,
        tokenLogo: Images.ethereumLogo,
        tokenName: 'Ethereum',
        tokenAddress: 'EXrs...P4ok',
    },
    {
        id: 5,
        tokenLogo: Images.suiLogo,
        tokenName: 'Sui',
        tokenAddress: 'EXrs...P4ok',
    },
    {
        id: 6,
        tokenLogo: Images.baseLogo,
        tokenName: 'Base',
        tokenAddress: 'EXrs...P4ok',
    },
    {
        id: 7,
        tokenLogo: Images.polygonLogo,
        tokenName: 'Polygon',
        tokenAddress: 'EXrs...P4ok',
    },
    {
        id: 8,
        tokenLogo: Images.bitcoinLogo,
        tokenName: 'Bitcoin',
        tokenAddress: 'EXrs...P4ok',
    },
]

export const historyData = [
    {
        date: "October 10, 2025",
        transactions: [
            {
                id: 1,
                statusLogo: Images.receiveGreenArrow,
                status: "Token Received",
                amount: "+0.045873 SOL",
                usdValue: "+$4,687.20",
                address: "TTB..aLp7p",
                time: "21:45"
            },
            {
                id: 2,
                statusLogo: Images.sentRedArrow,
                status: "Token Sent",
                amount: "-0.032410 SOL",
                usdValue: "-$3,210.50",
                address: "TTB..aLp7p",
                time: "21:45"
            }
        ]
    },
    {
        date: "October 8, 2025",
        transactions: [
            {
                id: 3,
                statusLogo: Images.receiveGreenArrow,
                status: "Token Received",
                amount: "+0.058573 SOL",
                usdValue: "+$5,987.50",
                address: "TTB..kGlp5",
                time: "19:12"
            },
            {
                id: 4,
                statusLogo: Images.sentRedArrow,
                status: "Token Sent",
                amount: "-0.058573 SOL",
                usdValue: "-$5,987.50",
                address: "TTB..kGlp5",
                time: "19:12"
            }
        ]
    },
    {
        date: "October 3, 2025",
        transactions: [
            {
                id: 5,
                statusLogo: Images.sentRedArrow,
                status: "Token Sent",
                amount: "-0.025000 SOL",
                usdValue: "-$2,548.00",
                address: "TTB..vCj45",
                time: "14:02"
            },
            {
                id: 6,
                statusLogo: Images.receiveGreenArrow,
                status: "Token Received",
                amount: "+0.025000 SOL",
                usdValue: "+$2,548.00",
                address: "TTB..vCj45",
                time: "14:02"
            }
        ]
    },

]

export const tokenDetailsData = [
    {
        id: 1,
        title: "Date",
        desc: "October 10, 2025"
    },
    {
        id: 2,
        title: "Amount",
        desc: "+0.045873 SOL"
    },
    {
        id: 3,
        title: "Network",
        desc: "Solana"
    },
    {
        id: 4,
        title: "Status",
        desc: "Token Received"
    },
    {
        id: 5,
        title: "Cashback",
        desc: "+$4,687.20"
    },
    {
        id: 6,
        title: "Receiver",
        desc: "TTB..aLp7p"
    },
    {
        id: 7,
        title: "Time",
        desc: "21:45"
    }
]

export const rewardsData = [
    {
        id: 1,
        statusLogo: Images.receiveGreenArrow,
        cryptoAmount: "+0.058573 SOL",
        title: "Token Received",
        dollarAmont: "+$10",
        desc: "Cashback",
    },
    {
        id: 2,
        statusLogo: Images.sentRedArrow,
        title: "Token Sent",
        cryptoAmount: "+0.058573 SOL",
        dollarAmont: "+$10",
        desc: "Cashback",
    },
    {
        id: 3,
        statusLogo: Images.receiveGreenArrow,
        title: "Token Received",
        cryptoAmount: "+0.058573 SOL",
        dollarAmont: "+$10",
        desc: "Cashback",
    },
    {
        id: 4,
        statusLogo: Images.sentRedArrow,
        title: "Token Sent",
        cryptoAmount: "+0.058573 SOL",
        dollarAmont: "+$10",
        desc: "Cashback",
    },
]

export const rewardsDetailsData = [
    {
        id: 1,
        title: "Date",
        desc: "October 10, 2025"
    },
    {
        id: 2,
        title: "Received Amount",
        desc: "10,000 SOL"
    },
    {
        id: 3,
        title: "Network",
        desc: "Solana"
    },
    {
        id: 4,
        title: "Status",
        desc: "Received"
    },

]

export const settingListData = [
    {
        id: 1,
        logo: Images.security,
        title: "Security",
    },

    {
        id: 2,
        logo: Images.walletConnect,
        title: "Wallet Connect",
    },
    {
        id: 3,
        logo: Images.terms,
        title: "Terms of Service",
    },
    {
        id: 4,
        logo: Images.headPhones,
        title: "Help & Support",
    },
    {
        id: 5,
        logo: Images.delete,
        title: "Delete Account",
    },
]

export const customTokenList = [
    {
        id: 1,
        title: 'Name',
        desc: 'TRUMP'
    },
    {
        id: 2,
        title: 'Symbol',
        desc: 'TRUMP'
    },
    {
        id: 3,
        title: 'Balance',
        desc: '0 TRUMP'
    },
]

export const sendConfirmDetailsData = [
    {
        id: 1,
        title: "From",
        desc: "1FfmbHfn...sN455paPH"
    },
    {
        id: 2,
        title: "To",
        desc: "1Ay8vMC7R...iQHSAbg"
    },
    {
        id: 3,
        title: "Network",
        desc: "Solana"
    },
]

export const tokenDetailsInfoData = [
    {
        id: 1,
        title: "Contract Address",
        desc: "1FfmbHfn...sN455paPH"
    },
    {
        id: 2,
        title: "Market Cap",
        desc: "$2.31T"
    },
    {
        id: 3,
        title: "Total Supply",
        desc: "19.92M"
    },
    {
        id: 4,
        title: "Circulating Supply",
        desc: "19.92M"
    }
]

// New Dummy Data       
export const createWalletDataList = [
    {
        id: 1,
        logo: Images.seamLessSetup,
        title: "Seamless setup",
        desc: "Create a wallet using a Google or Apple account and start exploring web3 with ease"
    },
    {
        id: 2,
        logo: Images.greenLock,
        title: "Enhanced security",
        desc: "Your wallet is stored securely and decentralized across multiple factors"
    },
    {
        id: 3,
        logo: Images.heart,
        title: "Easy recovery",
        desc: "Recover access to your wallet with your Google or Apple account and a 4-digit PIN"
    }
]

export const networkListData = [
    {
        id: 1,
        logo: Images.tokenLogo,
        title: "Solana",
    },
    {
        id: 2,
        logo: Images.ethereum,
        title: "Ethereum",
    },
    {
        id: 3,
        logo: Images.base,
        title: "Base",
    },
    {
        id: 4,
        logo: Images.sui,
        title: "Sui",
    },
    {
        id: 5,
        logo: Images.polygon,
        title: "Polygon",
    },
    {
        id: 6,
        logo: Images.bitcoin,
        title: "Bitcoin",
    },
]

export const HorizontalSrcollList = [
    {
        id: 1,
        tokenLogo: Images.tokenLogo,
        title: 'Earn up to 8% APY by staking your SOL',
    },
    {
        id: 2,
        tokenLogo: Images.tokenLogo,
        title: 'Earn up to 8% APY by staking your SOL',
    },
    {
        id: 3,
        tokenLogo: Images.tokenLogo,
        title: 'Earn up to 8% APY by staking your SOL',
    },
]

export const transactionData = [
    {
        date: 'Today',
        data: [
            {
                id: 1,
                type: 'received',
                title: 'Received',
                subtitle: 'From CtcB...A8r2',
                amount: '+0.01103 SOL',
                amountColor: '#4CAF50', // green
                icon: Images.solanaLogo,
                status: 'success',
            },
            {
                id: 2,
                type: 'sent',
                title: 'Sent',
                subtitle: 'To CtcB...A8r2',
                amount: '-2.41 SOL',
                amountColor: '#FFFFFF', // white or gray
                icon: Images.solanaLogo,
                status: 'success',
            },
            {
                id: 3,
                type: 'failed',
                title: 'Failed app interaction',
                subtitle: 'Unknown',
                amount: null,
                amountColor: '#FFFFFF',
                icon: Images.solanaLogo,
                status: 'failed',
            },
        ],
    },
    {
        date: 'Jan 17, 2025',
        data: [
            {
                id: 4,
                type: 'received',
                title: 'Received',
                subtitle: 'From CtcB...A8r2',
                amount: '+0.01103 SOL',
                amountColor: '#4CAF50',
                icon: ' Images.solanaLogo',
                status: 'success',
            },
            {
                id: 5,
                type: 'sent',
                title: 'Sent',
                subtitle: 'To CtcB...A8r2',
                amount: '-2.41 SOL',
                amountColor: '#FFFFFF',
                icon: Images.solanaLogo,
                status: 'success',
            },
            {
                id: 6,
                type: 'interaction',
                title: 'App interaction',
                subtitle: 'Unknown',
                amount: null,
                amountColor: '#FFFFFF',
                icon: Images.tickGreenCircle,
                status: 'success',
            },
        ],
    },
];


export const cryptoPairs = [
    {
        id: 1,
        icon: Images.solanaLogo,
        tokenName: 'BTC-USD',
        leverage: '40x',
        dollarPrice: '$123,363.00',
        change: '+0.52%',
        changeColor: '#4CAF50', // green
    },
    {
        id: 2,
        icon: Images.solanaLogo,
        tokenName: 'ETH-USD',
        leverage: '25x',
        dollarPrice: '$4,391.00',
        change: '-2.11%',
        changeColor: '#E53935', // red
    },
    {
        id: 3,
        icon: Images.solanaLogo,
        tokenName: 'SOL-USD',
        leverage: '20x',
        dollarPrice: '$225.14',
        change: '+1.20%',
        changeColor: '#4CAF50', // green
    },
];

export const riskToleranceOptions = [
    {
        id: 1,
        logo: Images.highRisk,
        title: "High risk tolerance",
        description:
            "I can handle high volatility and I am prepared for large fluctuations in my investment value.",
        value: "high",
    },
    {
        id: 2,
        logo: Images.mediumRisk,
        title: "Medium risk tolerance",
        description:
            "I can handle moderate volatility and I am prepared for some ups and downs in my investment value.",
        value: "medium",
    },
    {
        id: 3,
        logo: Images.lowRisk,
        title: "Low risk tolerance",
        description:
            "I can handle only a small amount of volatility and prefer stable investments with lower returns.",
        value: "low",
    },
];

export const searchListData = [
    {
        id: 1,
        tokenLogo: Images.tokens,
        tokenName: 'Tokens',
    },
    {
        id: 2,
        tokenLogo: Images.perps,
        tokenName: 'Perps',
    },
    {
        id: 1,
        tokenLogo: Images.lists,
        tokenName: 'Lists',
    },
    {
        id: 1,
        tokenLogo: Images.people,
        tokenName: 'People',
    },
]

export const allSearchListData = [
    {
        id: 1,
        tokenLogo: Images.topGainers,
        tokenName: 'Top Gainers',
    },
    {
        id: 2,
        tokenLogo: Images.meme,
        tokenName: 'Meme',
    },
    {
        id: 1,
        tokenLogo: Images.tokenized,
        tokenName: 'Tokenized Stoc',
    },
    {
        id: 1,
        tokenLogo: Images.people,
        tokenName: 'People',
    },
]

export const trendingTokensData = [
    {
        id: 1,
        name: "PESHI",
        symbol: "PESHI",
        price: "$0.00000173",
        change: "+378.17%",
        tokenLogo: Images.solanaLogo,
        chainLogo: Images.solanaRound,
    },
    {
        id: 2,
        name: "SPECTRA",
        symbol: "SPECTRA",
        price: "$0.00009764",
        change: "-45.42%",
        tokenLogo: Images.solanaLogo,
        chainLogo: Images.suiRound,
    },
    {
        id: 3,
        name: "SnakeOfSolana",
        symbol: "HISS",
        price: "$0.0000019",
        change: "+57.08%",
        tokenLogo: Images.solanaLogo,
        chainLogo: Images.solanaRound,
    },
    {
        id: 4,
        name: "solle",
        symbol: "SOLLE",
        price: "$0.0006007",
        change: "+324.58%",
        tokenLogo: Images.solanaLogo,
        chainLogo: Images.suiRound,
    },
    {
        id: 5,
        name: "Gremly",
        symbol: "GREMly",
        price: "$0.00000001",
        change: "-31.24%",
        tokenLogo: Images.solanaLogo,
        chainLogo: Images.bitcoinLogo,
    },
    {
        id: 6,
        name: "Volt",
        symbol: "XVM",
        price: "$0.00225729",
        change: "+8.04%",
        tokenLogo: Images.solanaLogo,
        chainLogo: Images.suiRound,
    },
    {
        id: 7,
        name: "Pudgy Penguins",
        symbol: "PENGU",
        price: "$0.0306",
        change: "-1.40%",
        tokenLogo: Images.solanaLogo,
        chainLogo: Images.suiLogo,
    },
    {
        id: 8,
        name: "Babel",
        symbol: "BABEL",
        price: "$0.00029631",
        change: "+7.41%",
        tokenLogo: Images.solanaLogo,
        chainLogo: Images.suiRound,
    },
    {
        id: 9,
        name: "Pandu Pandas",
        symbol: "PANDU",
        price: "$0.00015391",
        change: "-3.74%",
        tokenLogo: Images.solanaLogo,
        chainLogo: Images.suiRound,
    },
];


export const walletConnectOptions = [
    {
        id: 1,
        logo: Images.oneWithCircle,
        title: "Enable Bluetooth",
        description: "Allow permission to use Bluetooth to connect",
    },
    {
        id: 2,
        logo: Images.twoWithCircle,
        title: "Pair with your Ledger device",
        description: "Keep your device nearby to get the best signal",
    },
    {
        id: 3,
        logo: Images.threeWithCircle,
        title: "Connect accounts",
        description: "We'll look for activity in any accounts you might have used",
    }

]


export const emojis = [
    { emoji: "😀", name: "Grinning Face" },
    { emoji: "😁", name: "Beaming Face with Smiling Eyes" },
    { emoji: "😂", name: "Face with Tears of Joy" },
    { emoji: "🤣", name: "Rolling on the Floor Laughing" },
    { emoji: "😃", name: "Grinning Face with Big Eyes" },
    { emoji: "😄", name: "Grinning Face with Smiling Eyes" },
    { emoji: "😅", name: "Grinning Face with Sweat" },
    { emoji: "😆", name: "Grinning Squinting Face" },
    { emoji: "😉", name: "Winking Face" },
    { emoji: "😊", name: "Smiling Face with Smiling Eyes" },
    { emoji: "😋", name: "Face Savoring Food" },
    { emoji: "😎", name: "Smiling Face with Sunglasses" },
    { emoji: "😍", name: "Smiling Face with Heart-Eyes" },
    { emoji: "😘", name: "Face Blowing a Kiss" },
    { emoji: "😗", name: "Kissing Face" },
    { emoji: "😙", name: "Kissing Face with Smiling Eyes" },
    { emoji: "😚", name: "Kissing Face with Closed Eyes" },
    { emoji: "🙂", name: "Slightly Smiling Face" },
    { emoji: "🤗", name: "Hugging Face" },
    { emoji: "🤔", name: "Thinking Face" },
    { emoji: "😐", name: "Neutral Face" },
    { emoji: "😑", name: "Expressionless Face" },
    { emoji: "😶", name: "Face Without Mouth" },
    { emoji: "🙄", name: "Face with Rolling Eyes" },
    { emoji: "😏", name: "Smirking Face" },
    { emoji: "😣", name: "Persevering Face" },
    { emoji: "😥", name: "Sad but Relieved Face" },
    { emoji: "😮", name: "Face with Open Mouth" },
    { emoji: "🤐", name: "Zipper-Mouth Face" },
    { emoji: "😯", name: "Hushed Face" },
    { emoji: "😪", name: "Sleepy Face" },
    { emoji: "😫", name: "Tired Face" },
    { emoji: "😴", name: "Sleeping Face" },
    { emoji: "😌", name: "Relieved Face" },
    { emoji: "🤤", name: "Drooling Face" },
    { emoji: "😛", name: "Face with Tongue" },
    { emoji: "😜", name: "Winking Face with Tongue" },
    { emoji: "😝", name: "Squinting Face with Tongue" },
    { emoji: "🤪", name: "Zany Face" },
    { emoji: "🤨", name: "Face with Raised Eyebrow" },
    { emoji: "🧐", name: "Face with Monocle" },
    { emoji: "🤓", name: "Nerd Face" },
    { emoji: "😕", name: "Confused Face" },
    { emoji: "😟", name: "Worried Face" },
    { emoji: "🙁", name: "Slightly Frowning Face" },
    { emoji: "☹️", name: "Frowning Face" },
    { emoji: "😮‍💨", name: "Face Exhaling" },
    { emoji: "😯", name: "Hushed Face" },
    { emoji: "😲", name: "Astonished Face" },
    { emoji: "😳", name: "Flushed Face" },
    { emoji: "🥺", name: "Pleading Face" },
    { emoji: "😦", name: "Frowning Face with Open Mouth" },
    { emoji: "😧", name: "Anguished Face" },
    { emoji: "😨", name: "Fearful Face" },
    { emoji: "😰", name: "Anxious Face with Sweat" },
    { emoji: "😢", name: "Crying Face" },
    { emoji: "😭", name: "Loudly Crying Face" },
    { emoji: "😤", name: "Face with Steam from Nose" },
    { emoji: "😠", name: "Angry Face" },
    { emoji: "😡", name: "Pouting Face" },
    { emoji: "🤬", name: "Face with Symbols on Mouth" },
    { emoji: "😈", name: "Smiling Face with Horns" },
    { emoji: "👿", name: "Angry Face with Horns" },
    { emoji: "💀", name: "Skull" },
    { emoji: "☠️", name: "Skull and Crossbones" },
    { emoji: "💩", name: "Pile of Poo" },
    { emoji: "🤡", name: "Clown Face" },
    { emoji: "👹", name: "Ogre" },
    { emoji: "👺", name: "Goblin" },
    { emoji: "👻", name: "Ghost" },
    { emoji: "👽", name: "Alien" },
    { emoji: "👾", name: "Alien Monster" },
    { emoji: "🤖", name: "Robot Face" },
    { emoji: "😺", name: "Grinning Cat" },
    { emoji: "😸", name: "Grinning Cat with Smiling Eyes" },
    { emoji: "😹", name: "Cat with Tears of Joy" },
    { emoji: "😻", name: "Smiling Cat with Heart-Eyes" },
    { emoji: "😼", name: "Cat with Wry Smile" },
    { emoji: "😽", name: "Kissing Cat" },
    { emoji: "🙀", name: "Weary Cat" },
    { emoji: "😿", name: "Crying Cat" },
    { emoji: "😾", name: "Pouting Cat" },
    { emoji: "🙈", name: "See-No-Evil Monkey" },
    { emoji: "🙉", name: "Hear-No-Evil Monkey" },
    { emoji: "🙊", name: "Speak-No-Evil Monkey" },
    { emoji: "💋", name: "Kiss Mark" },
    { emoji: "💌", name: "Love Letter" },
    { emoji: "💘", name: "Heart with Arrow" },
    { emoji: "💝", name: "Heart with Ribbon" },
    { emoji: "💖", name: "Sparkling Heart" },
    { emoji: "💗", name: "Growing Heart" },
    { emoji: "💓", name: "Beating Heart" },
    { emoji: "💞", name: "Revolving Hearts" },
    { emoji: "💕", name: "Two Hearts" },
    { emoji: "💟", name: "Heart Decoration" },
    { emoji: "❣️", name: "Heart Exclamation" },
    { emoji: "💔", name: "Broken Heart" },
    { emoji: "❤️", name: "Red Heart" },
    { emoji: "🧡", name: "Orange Heart" },
    { emoji: "💛", name: "Yellow Heart" },
    { emoji: "💚", name: "Green Heart" },
    { emoji: "💙", name: "Blue Heart" },
    { emoji: "💜", name: "Purple Heart" },
    { emoji: "🤎", name: "Brown Heart" },
    { emoji: "🖤", name: "Black Heart" },
    { emoji: "🤍", name: "White Heart" }
];

export const TokenDetailsRowTabs = [
    {
        id: 1,
        tabLogo: Images.receive1,
    },
    {
        id: 2,
        tabLogo: Images.send1,
    },
    {
        id: 3,
        tabLogo: Images.cashByTab,
    },
    {
        id: 4,
        tabLogo: Images.moreTab,
    },

]

export const buyTokenDetailsOptions = [
    {
        id: 1,
        title: "Pricing",
        infoLogo: Images.infoLogo,
        rightText: "1SOL219.49 USDC",
        rightArrow: Images.arrowRight
    },
    {
        id: 2,
        title: "Slippage",
        infoLogo: Images.infoLogo,
        rightText: "Auto-1.1%",
        rightArrow: Images.arrowRight
    },
]

export const tokenTabsSelectionData = [
    {
        id: 1,
        title: "All",
    },
    {
        id: 2,
        title: "Solana",
    },
    {
        id: 3,
        title: "Ethereum",
    },
    {
        id: 4,
        title: "Base",
    },
    {
        id: 5,
        title: "Sui",
    },
    {
        id: 6,
        title: "Polygon",
    },
]

export const youPayTokensData = [
    {
        id: 1,
        tokenLogo: Images.solanaLogo,
        tokenName: 'Solana',
        cryptoAmount: '0.01103 SOL',
        dollarAmont: '$10',
        change24Value: "+2.20%",
    },

    {
        id: 2,
        tokenLogo: Images.solanaLogo,
        tokenName: 'Solana',
        cryptoAmount: '0.01103 SOL',
        dollarAmont: '$10',
        change24Value: "+2.20%",
    },
]

export const stakeOptionData = [
    {
        id: 1,
        logo: Images.stakeSol,
        title: "Stake SOL",
    },
    {
        id: 2,
        logo: Images.mintPsol,
        title: "Mint PSOL",
    },
    {
        id: 3,
        logo: Images.viewSolscan,
        title: "View on Solscan",
    },
    {
        id: 4,
        logo: Images.share,
        title: "Share",
    },
]


export const trendingTokensTabsOptions = [
    {
        id: 1,
        title: 'Rank',
        dropDown: Images.arrowDown,
    },
    {
        id: 2,
        title: 'Solana',
        dropDown: Images.arrowDown,
    },
    {
        id: 3,
        title: '24h',
        dropDown: Images.arrowDown,
    },
]

export const trendingTokenHoldersData = [
    { id: 1, name: 'SOLHolder', mc: '$412K MC', price: '$0.00041166', change: '+5,826.10%', logo: Images.solHolder },
    { id: 2, name: 'HISS', mc: '$552K MC', price: '$0.00000147', change: '+11.71%', logo: Images.hiss },
    { id: 3, name: 'PANDU', mc: '$15M MC', price: '$0.00015074', change: '-8.96%', logo: Images.pandu },
    { id: 4, name: 'VWA', mc: '$7.5M MC', price: '$0.00751935', change: '+2.22%', logo: Images.vwa },
    { id: 5, name: 'Anon', mc: '$1.2M MC', price: '$0.00027636', change: '+0.00%', logo: Images.pandu },
]

export const languages = [
    { id: 1, name: 'English', code: 'en' },
    { id: 2, name: 'Español', code: 'es' },
    { id: 3, name: 'Deutsch', code: 'de' },
    { id: 4, name: 'Français', code: 'fr' },
    { id: 5, name: 'Italiano', code: 'it' },
    { id: 6, name: '中文(简体)', code: 'zh-Hans' },
    { id: 7, name: '中文(繁體)', code: 'zh-Hant' },
    { id: 8, name: 'गाएला', code: 'ne' },
    { id: 9, name: '日本語', code: 'ja' },
    { id: 10, name: '한국어', code: 'ko' },
    { id: 11, name: 'Русский', code: 'ru' },
    { id: 12, name: 'हिंदी', code: 'hi' },
    { id: 13, name: 'Indonesia', code: 'id' },
    { id: 14, name: 'Melayu', code: 'ms' },
    { id: 15, name: 'ไทย', code: 'th' },
];

export const currencies = [
    { id: 1, name: 'USD - United States Dollar ($)', code: 'USD', symbol: '$' },
    { id: 2, name: 'EUR - Euro (€)', code: 'EUR', symbol: '€' },
    { id: 3, name: 'DZD - Algerian Dinar (دج)', code: 'DZD', symbol: 'دج' },
    { id: 4, name: 'ARS - Argentine Peso (AR$)', code: 'ARS', symbol: 'AR$' },
    { id: 5, name: 'AUD - Australian Dollar (A$)', code: 'AUD', symbol: 'A$' },
    { id: 6, name: 'BRL - Brazilian Real (R$)', code: 'BRL', symbol: 'R$' },
    { id: 7, name: 'GBP - British Pound (£)', code: 'GBP', symbol: '£' },
    { id: 8, name: 'BGN - Bulgarian Lev (лв)', code: 'BGN', symbol: 'лв' },
    { id: 9, name: 'CAD - Canadian Dollar (CA$)', code: 'CAD', symbol: 'CA$' },
    { id: 10, name: 'CNY - Chinese Renminbi Yuan (¥)', code: 'CNY', symbol: '¥' },
    { id: 11, name: 'COP - Colombian Peso ($)', code: 'COP', symbol: '$' },
    { id: 12, name: 'CZK - Czech Koruna (Kč)', code: 'CZK', symbol: 'Kč' },
    { id: 13, name: 'DKK - Danish Krone (kr)', code: 'DKK', symbol: 'kr' },
    { id: 14, name: 'EGP - Egyptian Pound (E£)', code: 'EGP', symbol: 'E£' },
    { id: 15, name: 'HKD - Hong Kong Dollar (HK$)', code: 'HKD', symbol: 'HK$' },
];

export const notificationTimes = [
    { id: 1, label: 'Immediately', value: 0 },
    { id: 2, label: '1 minute', value: 1 },
    { id: 3, label: '5 minutes', value: 5 },
    { id: 4, label: '10 minutes', value: 10 },
    { id: 5, label: '15 minutes', value: 15 },
    { id: 6, label: '30 minutes', value: 30 },
    { id: 7, label: '1 hour', value: 60 },
    { id: 8, label: '4 hours', value: 240 },
    { id: 9, label: '8 hours', value: 480 },
    { id: 10, label: '1 day', value: 1440 },
];

export const networks = [
    {
        id: 1,
        name: 'Solana',
        symbol: 'SOL',
        logo: Images.solanaLogo,
        isSelected: true,
    },
    {
        id: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        logo: Images.ethereumLogo,
        isSelected: true,
    },
    {
        id: 3,
        name: 'Monad',
        symbol: 'MON',
        logo: Images.monadLogo,
        isSelected: false,
        testnet: true,
    },
    {
        id: 4,
        name: 'Base',
        symbol: 'BASE',
        logo: Images.baseLogo,
        isSelected: false,
    },
    {
        id: 5,
        name: 'Sui',
        symbol: 'SUI',
        logo: Images.suiLogo,
        isSelected: true,
    },
    {
        id: 6,
        name: 'Polygon',
        symbol: 'MATIC',
        logo: Images.polygonLogo,
        isSelected: true,
    },
    {
        id: 7,
        name: 'Bitcoin',
        symbol: 'BTC',
        logo: Images.bitcoinLogo,
        isSelected: false,
    },
];

export const onBoardingData = [
    {
        id: 1,
        logo: Images.onBoarding1Logo,
        title: 'Welcome to Phantom',
        description: 'To get started, create a new wallet or import an existing one.',
        sliderLogo: Images.slider1,
    },
    {
        id: 2,
        logo: Images.onBoarding2,
        title: 'Controlled by you',
        description: 'Your wallet is secured with biometrics access, scam detection and 24/7 support.',
        sliderLogo: Images.onBoardingSlider2,

    },
    {
        id: 3,
        logo: Images.onBoarding3,
        title: 'The best home for your NFTs',
        description: 'Manage listings, burn spam, and stay updated with helpful push notifications.',
        sliderLogo: Images.onBoardingSlider3,
    },
    {
        id: 4,
        logo: Images.onBoarding4,
        title: 'One wallet for everything',
        description: 'Experience all of Solana, Ethereum, Polygon and Bitcoin in a single user-friendly interface.',
        sliderLogo: Images.onBoardingSlider4,
    },
    {
        id: 5,
        logo: Images.onBoarding5,
        title: 'Do more with your tokens',
        description: 'Store, swap, stake, send, and receive - without ever leaving your wallet.',
        sliderLogo: Images.onBoardingSlider4,
    },
    {
        id: 6,
        logo: Images.onBoarding6,
        title: '',
        description: '',
        sliderLogo: '',
    },
]
