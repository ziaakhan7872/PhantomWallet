import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { appStyles } from '../../../utilities/appStyles'
import PoppinsText from '../../../components/PoppinsText'
import { SummaryCard } from './Components'
import { CustomButton } from '../../../components/CustomButton'
import { routes } from '../../../constants/routes'
import useSendSummaryScreen from './Hook'
import LoaderModal from '../../../components/LoaderModal'
import { NumberRoundFunction } from '../../../constants/commonHelperFunctions/commonHelperFunction'

const SendSummaryScreen = (props) => {
    const { isDolorValue, enteredAmount, receiverAddress, item, fee, errorMessage, loading, btnLoading, onPressSend } = useSendSummaryScreen(props)

    return (
        <MainContainerApp>
            <Spacer customHeight={hp(7)} />
            <View style={styles.mainView}>
                <View style={appStyles.rowBasic}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                        <Image source={Images.backArrow} resizeMode='contain' style={styles.backArrow} />
                    </TouchableOpacity>
                    <PoppinsText style={styles.title}>{'Send Summary'}</PoppinsText>
                </View>
                <Spacer customHeight={hp(4)} />
                <Image source={Images.rightPurpleArrow} resizeMode='contain' style={styles.rightPurpleArrow} />
                <Spacer />
                {isDolorValue ?
                    <PoppinsText style={styles.amount}>{`${NumberRoundFunction(parseFloat(enteredAmount || 0) / parseFloat(item?.currentPriceUsd || 0))}`} {item?.symbol?.toUpperCase()}</PoppinsText>
                    :
                    <PoppinsText style={styles.amount}>{enteredAmount ?? 0} {item?.symbol?.toUpperCase()}</PoppinsText>
                }

                <PoppinsText style={styles.dollarAmount}>{`~$${isDolorValue ? enteredAmount : NumberRoundFunction(parseFloat(enteredAmount || 0) * parseFloat(item?.currentPriceUsd || 0))}`}</PoppinsText>
                <Spacer />
                {/* <View style={[styles.alertViewBgView, appStyles.rowBasic]}>
                    <Image source={Images.alertInfoTriangle} resizeMode='contain' style={styles.alertInfoTriangle} />
                    <PoppinsText style={styles.alertText}>{'This wallet address has no balance and doesnt appear in your recent transaction history. Please ensure the address is correct.'}</PoppinsText>
                </View> */}
                <Spacer />
                <SummaryCard receiverAddress={receiverAddress} item={item} fee={fee} />
                {errorMessage ? <PoppinsText style={styles.errorMessage}>{errorMessage}</PoppinsText> : null}
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Send'} loading={btnLoading} onPressBtn={() => onPressSend()} />
            </View>

            <LoaderModal visible={loading} />
        </MainContainerApp>
    )
}

export default SendSummaryScreen
