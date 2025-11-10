import { Image, Linking, Platform, View } from 'react-native'
import React from 'react'
import { AppContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import { AppHeader } from '../../../components/AppHeader'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import PoppinsText from '../../../components/PoppinsText'
import { ActivityDetailsCard } from './Components'
import { copyPaste } from '../../../utilities/helperFunction'
import { CustomButton } from '../../../components/CustomButton'
import { NumberRoundFunction } from '../../../constants/commonHelperFunctions/commonHelperFunction'
import { formatAddress } from '../../../services/Helpers/CommonHelper'
import moment from 'moment'

const ActivitiesDetails = (props) => {
    const item = props?.route?.params?.item
    const activeWallet = props?.route?.params?.activeWallet
    const status = props?.route?.params?.status

    const buttonTitle = item?.chain == 'Solana' ? "Solscan" : item?.chain == 'bitcoin' ? 'Btcscan' : item?.chain == 'Ethereum' ? 'Etherscan' : item?.chain == 'Binance Smart Chain' ? 'BcsScan' : item?.chain == 'Polygon' ? 'Polygonscan' : item?.chain == 'Avalanche' ? 'Avalanche' : item?.chain == 'Base' ? 'BaseScan' : 'Etherscan'

    const onPressBtn = () => {
        let link = ''

        if (item?.chain == 'Ethereum') link = `https://etherscan.io/tx/${item?.hash}`
        else if (item?.chain == 'Binance Smart Chain') link = `https://bscscan.com/tx/${item?.hash}`
        else if (item?.chain == 'Polygon') link = `https://polygonscan.com/tx/${item?.hash}`
        else if (item?.chain == 'Avalanche') link = `https://avascan.info/blockchain/c/tx/${item?.hash}`
        else if (item?.chain == 'bitcoin') link = `https://www.blockchain.com/btc/tx/${item?.hash}`
        else if (item?.chain == 'Solana') link = `https://explorer.solana.com/tx/${item?.hash}`
        else if (item?.chain == 'Arbitrum') link = `https://arbiscan.io/tx/${item?.hash}`
        else if (item?.chain == 'Base') link = `https://basescan.org/tx/${item?.hash}`

        Linking.openURL(link)

    }

    return (
        <AppContainer>
            <View style={styles.mainView}>
                <AppHeader leftImage={Images.cross} title={'Activities Details'} onPressBack={() => props?.navigation.goBack()} />
                <Spacer customHeight={hp(3)} />
                <Image source={{ uri: item?.logo }} resizeMode='contain' style={styles.tokenLogo} />
                <Spacer />
                <PoppinsText style={styles.amount}>{`${status == 'Sent' ? '-' : '+'}${NumberRoundFunction(item?.value)} ${item?.symbol?.toUpperCase()}`}</PoppinsText>
                <Spacer />
                <ActivityDetailsCard
                    dateText={'Date'}
                    Date={moment(item?.timeStamp).format("MMM D, YYYY [at] h:mm a")}
                    statusText={'Status'} Status={'Succeeded'}
                    netwrokText={'Network'} Network={item?.chain?.charAt(0).toUpperCase() + item?.chain?.slice(1)}
                    fromText={status == 'Sent' ? 'To' : 'From'}
                    From={status == 'Sent' ? formatAddress(item?.to) : formatAddress(item?.from)}
                    copyLogo={Images.copy} onPressCopy={() => copyPaste.copy(status == 'Sent' ? item?.to : item?.from)}
                />
            </View>
            <View style={{ paddingBottom: Platform.OS === 'ios' ? hp(4) : hp(3) }}>
                <CustomButton title={`View on ${buttonTitle}`} onPressBtn={() => onPressBtn()} />
            </View>
        </AppContainer>
    )
}

export default ActivitiesDetails
