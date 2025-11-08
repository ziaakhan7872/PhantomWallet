import { Image, Platform, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import PoppinsText from '../../../components/PoppinsText'
import { ActivityDetailsCard } from './Components'
import { copyPaste } from '../../../utilities/helperFunction'
import { CustomButton } from '../../../components/CustomButton'
import { NewCustomHeader } from '../../../components/MainHeader'

const ActivitiesDetails = (props) => {
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(6)} />
                <NewCustomHeader title={'Received'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer customHeight={hp(3)} />
                <Image source={Images.solanaLogo} resizeMode='contain' style={styles.tokenLogo} />
                <Spacer />
                <PoppinsText style={styles.amount}>{'+0.01103SOL'}</PoppinsText>
                <Spacer />
                <ActivityDetailsCard
                    dateText={'Date'} Date={'Oct 9,2025 at 11:52 am'}
                    statusText={'Status'} Status={'Succeeded'}
                    netwrokText={'Network'} Network={'Solana'}
                    fromText={'From'} From={'CtcB...A8r2'} copyLogo={Images.copy} onPressCopy={() => copyPaste.copy('CtcB...A8r2')}
                />
            </View>
            <View style={{ paddingBottom: Platform.OS === 'ios' ? hp(4) : hp(3) }}>
                <CustomButton title={'View on Solscan'} onPressBtn={() => { }} />
            </View>
        </MainContainerApp>
    )
}

export default ActivitiesDetails
