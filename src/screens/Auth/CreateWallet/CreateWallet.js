import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { CustomHeader } from '../../../components/MainHeader'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import { CreateWalletEmailBottomSheet, CreateWalletSetupList, ImportOptionsBottomSheet } from './Components'
import { CustomButton } from '../../../components/CustomButton'
import useCreateWallet from './Hooks'
import { routes } from '../../../constants/routes'
import { colors } from '../../../constants/colors'

const CreateWallet = (props) => {

    const { emailBottomSheet, isImportFlow, importOptionsBottomSheet, onPressCreate, loading } = useCreateWallet(props);

    return (
        <MainContainer>
            <Spacer customHeight={hp(6)} />
            <View style={styles.mainView}>
                <CustomHeader leftImage={Images.goBackArrow} rightImage={Images.questionMark} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer customHeight={hp(6)} />

                <Image source={Images.walletLogo} resizeMode='contain' style={styles.walletLogo} />
                <Spacer />
                <PoppinsText style={styles.walletTitle}>Add a Wallet</PoppinsText>
                <Spacer customHeight={hp(1)} />
                <PoppinsText style={styles.walletDesc}>Login or import an existing wallet</PoppinsText>
                <Spacer customHeight={hp(4)} />
                <CreateWalletSetupList />
            </View>
            <View style={styles.btnView}>
                {/* <CustomButton title={'Continue with Email'} onPressBtn={() => emailBottomSheet.current?.open()} />
                <Spacer customHeight={hp(1)} /> */}
                {/* <TouchableOpacity activeOpacity={0.8} style={{ alignSelf: 'center' }} onPress={() => importOptionsBottomSheet.current?.open()}>
                    <PoppinsText style={styles.bottomText}>{isImportFlow ? 'Other Import Options' : "Create a seed phrase wallet"}</PoppinsText>
                </TouchableOpacity> */}
                <CustomButton title={isImportFlow ? 'Other Import Options' : 'Create a seed phrase wallet'}
                    onPressBtn={() => isImportFlow ? importOptionsBottomSheet.current?.open() : onPressCreate()}
                    btnSyles={{ ...styles.btnSyles, backgroundColor: colors.btnDisableColor }}
                    titleStyles={{ ...styles.btnTitleStyles, color: colors.white }}
                    loading={loading}
                    disabled={loading}
                />

            </View>
            <CreateWalletEmailBottomSheet
                emailBottomSheet={emailBottomSheet}
                onPressBtn1={() => {
                    emailBottomSheet?.current?.close()
                    setTimeout(() => {
                        props?.navigation.navigate(routes.pinScreen)
                    }, 500);
                }}
                onPressBtn2={() => {
                    emailBottomSheet?.current?.close()
                    setTimeout(() => {
                        props?.navigation.navigate(routes.pinScreen)
                    }, 500);
                }}
            />
            <ImportOptionsBottomSheet
                importOptionsBottomSheet={importOptionsBottomSheet}
                onPressBtn1={() => {
                    importOptionsBottomSheet?.current?.close()
                    setTimeout(() => {
                        props?.navigation.navigate(routes.seedPhrase, { isSeedPhrase: true })
                    }, 500);
                }}
                onPressBtn2={() => {
                    importOptionsBottomSheet?.current?.close()
                    setTimeout(() => {
                        props?.navigation.navigate(routes.seedPhrase, { isSeedPhrase: false })
                    }, 500);
                }}
                onPressBtn3={() => {
                    importOptionsBottomSheet?.current?.close()
                    setTimeout(() => {
                        props?.navigation.navigate(routes.connectHardware)
                    }, 500);
                }}
            />
        </MainContainer>
    )
}

export default CreateWallet
