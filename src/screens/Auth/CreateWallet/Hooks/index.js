import { useRef, useState } from "react";
import { routes } from "../../../../constants/routes";
import { generateUniqueMnemonic } from "../../../../services/Helpers/EVMHelper";
import { generateAllWallets } from "../../../../services/Helpers/CreateWalletHelper";
import { InsertAllChains, insertWallet } from "../../../../services/database";
import { MultiChainChainsArray } from "../../../../components/dummyData";


const useCreateWallet = (props) => {

    const isImportFlow = props?.route?.params?.isImportFlow
    const isSettingFlow = props?.route?.params?.isSettingFlow

    const emailBottomSheet = useRef(null);
    const importOptionsBottomSheet = useRef(null);

    const [loading, setLoading] = useState(false);


    const onPressCreate = async () => {
        setLoading(true)
        try {

            const seed = await generateUniqueMnemonic()
            console.log('generated seedphrase::', seed.trim())

            const allwallets = await generateAllWallets(seed.trim())
            console.log('allwalletsallwalletsallwallets', allwallets);

            const waletresponse = await insertWallet(
                'Multi-Chain-Wallet',
                seed.trim(),
                allwallets?.evmWallet?.address,
                allwallets?.evmWallet?.privateKey,
                allwallets?.bitcoin?.address,
                allwallets?.bitcoin?.privateKey,
                allwallets?.solana?.address,
                allwallets?.solana?.privateKey,
            )
            console.log('waletresponse:::', waletresponse);

            if (waletresponse) {

                let responsechains = await InsertAllChains(waletresponse, MultiChainChainsArray)

                console.log('responsechains:::', responsechains);
                if (responsechains) {
                    setLoading(false)
                    props?.navigation.replace(routes.pinScreen, { isSettingFlow: isSettingFlow ? true : false })
                }
            }



        } catch (error) {
            console.log("catch error in onPressCreate:", error)
            setLoading(false)
        }
    }

    return {
        isImportFlow,
        emailBottomSheet,
        importOptionsBottomSheet,
        onPressCreate,
        loading,
    }
}

export default useCreateWallet
