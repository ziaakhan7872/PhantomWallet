import { useEffect, useState } from "react";
import { createMnemonic } from "../../../../utils/mnemonic"
import { seedValidation } from "../../../../services/Helpers/EVMHelper";
import { generaEvmWalletUsingPrivatekey, generateAllWallets } from "../../../../services/Helpers/CreateWallet";
import { getWalletByAddress, InsertAllChains, insertWallet } from "../../../../services/database";
import { EvmChainsArray, MultiChainChainsArray } from "../../../../components/dummyData";
import { routes } from "../../../../constants/routes";

const useSeedPhrase = (props) => {

    const isSeedPhrase = props?.route?.params?.isSeedPhrase;
    const isAddAccountFlow = props?.route?.params?.isAddAccountFlow;

    console.log(isAddAccountFlow, 'isAddAccountFlowisAddAccountFlow');

    const [showSeed, setShowSeed] = useState(false);
    const [mnemonic, setMnemonic] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    function cleanSeedPhrase(seed) {
        return seed.trim().replace(/\s+/g, ' ');
    }

    const handleContinuePress = async () => {
        try {
            if (!mnemonic) {
                setErrorMessage(isSeedPhrase ? 'Please enter your seed phrase' : 'Please enter your private key')
            }
            else {
                const cleanedSeed = cleanSeedPhrase(mnemonic);
                console.log(cleanedSeed);

                setLoading(true)
                if (isSeedPhrase) {
                    console.log('createe alll walletssss')

                    if (!seedValidation(cleanedSeed)) {
                        setErrorMessage('Invalid seed phrase')
                        setLoading(false)
                    }
                    else {
                        setTimeout(async () => {

                            const allwallets = await generateAllWallets(cleanedSeed.trim())

                            const checkIsexist = await getWalletByAddress(allwallets?.evmWallet?.address)

                            console.log('checkIsexistcheckIsexist', checkIsexist);
                            if (checkIsexist?.length > 0) {
                                setErrorMessage('Wallet already exists!')
                                setLoading(false)
                            } else {

                                const waletresponse = await insertWallet(
                                    'Multi-Chain-Wallet',
                                    cleanedSeed,
                                    allwallets?.evmWallet?.address,
                                    allwallets?.evmWallet?.privateKey,
                                    allwallets?.bitcoin?.address,
                                    allwallets?.bitcoin?.privateKey,
                                    allwallets?.solana?.address,
                                    allwallets?.solana?.privateKey,
                                )
                                console.log('waletresponsewaletresponse', waletresponse);

                                if (waletresponse) {

                                    let responsechains = await InsertAllChains(waletresponse, MultiChainChainsArray)
                                    console.log('responsechainsresponsechainsresponsechains', responsechains);
                                    if (responsechains) {
                                        setLoading(false)
                                        props.navigation.replace(routes.pinScreen)
                                    }
                                }
                            }
                        }, 2)
                    }
                }
                else {
                    console.log('create evm wallet using private key');

                    function formatPrivateKey(privateKey) {
                        if (privateKey.startsWith('0x')) {
                            return privateKey; // Already formatted correctly
                        } else {
                            return '0x' + privateKey; // Add '0x' if missing
                        }
                    }

                    setTimeout(async () => {
                        try {

                            let privateKey = formatPrivateKey(mnemonic.trim())
                            const allwallets = await generaEvmWalletUsingPrivatekey(privateKey.trim())
                            console.log('allwalletsallwallets private key', allwallets);
                            const checkIsexist = await getWalletByAddress(allwallets?.evmWallet?.address)

                            console.log('checkIsexistcheckIsexist', checkIsexist);
                            if (checkIsexist?.length > 0) {
                                setErrorMessage('Wallet already exists!')
                                setLoading(false)
                            } else {

                                const waletresponse = await insertWallet(
                                    'EVM-Wallet',
                                    '',
                                    allwallets?.evmWallet?.address,
                                    allwallets?.evmWallet?.privateKey,
                                    '',
                                    '',
                                    '',
                                    '',
                                )
                                console.log('waletresponsewaletresponse', waletresponse);

                                if (waletresponse) {

                                    let responsechains = await InsertAllChains(waletresponse, EvmChainsArray)

                                    console.log('responsechainsresponsechainsresponsechains', responsechains);
                                    if (responsechains) {
                                        setLoading(false)
                                        props.navigation.replace(routes.pin)
                                    }
                                }
                            }
                        } catch (error) {
                            console.log('errorerrorerror', error);
                            setErrorMessage('Invalid Private key')
                            setLoading(false)
                        }
                    }, 2)

                }
            }

        } catch (error) {
            setLoading(false)
            console.log('errorerrorerror', error);
        }
    }



    return {
        showSeed, setShowSeed,
        mnemonic, setMnemonic,
        loading, errorMessage,
        isSeedPhrase, isAddAccountFlow,
        handleContinuePress
    }
}

export default useSeedPhrase

