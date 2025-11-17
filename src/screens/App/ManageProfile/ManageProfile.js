import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import { AppHeader } from '../../../components/AppHeader'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { ManageProfileCard, ManageProfileCard1 } from './Components'
import { routes } from '../../../constants/routes'
import PoppinsText from '../../../components/PoppinsText'

const ManageProfile = (props) => {
    const item = props?.route?.params?.item
    return (
        <AppContainer>
            <View style={styles.mainView}>
                <AppHeader leftImage={Images.backArrow} title={'Manage Profile'} onPressBack={() => props?.navigation.goBack()} />
                <Spacer customHeight={hp(4)} />
                <View style={{ width: wp(26), alignSelf: 'center' }}>
                    {/* <Image source={Images.profile1} resizeMode='contain' style={styles.profile1} /> */}
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.navigate(routes.selectAvatar, { item })}>
                        <PoppinsText style={{ fontSize: 72, textAlign: 'center' }}>{item?.logo ?? '😍'}</PoppinsText>
                        <Image source={Images.pencilWithBlackRound} resizeMode='contain' style={styles.pencilWithBlackRound} />
                    </TouchableOpacity>
                </View>
                <Spacer />
                <ManageProfileCard
                    title={'About'} leftText={'Username'}
                    rightText={`@${item?.username ?? ''}`} leftText1={'Bio'}
                    onPressUserName={() => props?.navigation.navigate(routes.editUserName, { item })}
                    onPressBio={() => props?.navigation.navigate(routes.editUserName, { isBio: true })}
                />
                <Spacer />
                <ManageProfileCard1
                    title={'Manage'} username={'Followers'} userNumber={'0'} authFactor={'Auth Factors'}
                    authNumber={'0'} Privacy={'Privacy'} status={'Public'} worldLogo={Images.world}
                    onPressFollowers={() => props?.navigation.navigate(routes.followersScreen)}
                    onPressPrivacy={() => props?.navigation.navigate(routes.privacyScreen)}
                />
            </View>
        </AppContainer>
    )
}

export default ManageProfile
