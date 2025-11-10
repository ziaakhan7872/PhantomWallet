import { useState } from "react";
import { InsertAllChains, insertWallet } from "../../../../services/database";
import { EvmChainsArray, MultiChainChainsArray } from "../../../../components/dummyData";
import { routes } from "../../../../constants/routes";


const useImportAccounts = (props) => {
    const isSeedPhrase = props?.route?.params?.isSeedPhrase
    const cleanedSeed = props?.route?.params?.cleanedSeed
    const allwallets = props?.route?.params?.allwallets

    const [accountSelection, setAccountSelection] = useState(true);
    const [loading, setLoading] = useState(false);

    const onPressContinue = async () => {
        if (isSeedPhrase) {
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
                    props.navigation.replace(routes.pinScreen)
                }
            }
        }
    }

    return {
        isSeedPhrase, cleanedSeed, allwallets,
        loading,
        accountSelection, setAccountSelection,
        onPressContinue
    }
}

export default useImportAccounts
