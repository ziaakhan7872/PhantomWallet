import { View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import useNotifications from './Hooks'
import { BalanceAndTradingCard, NotificationPreferencesCard } from './Components'
import { NewCustomHeader } from '../../../components/MainHeader'

const Notifications = (props) => {
    const { allowNotificationToggle, setAllowNotificationToggle, socialTradesToggle, setSocialTradesToggle, sentTokensToggle, setSentTokensToggle, receivedTokensToggle, setReceivedTokensToggle, swapToggle, setSwapToggle, balanceChangesToggle, setBalanceChangesToggle, generalUpdateToggle, setGeneralUpdateToggle } = useNotifications()
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <View style={styles.mainView}>
                <NewCustomHeader title={'Notification Preferences'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer />
                <View style={{ paddingHorizontal: wp(4) }}>
                    <NotificationPreferencesCard
                        title={'Allow Notifications'}
                        onPressToggle={() => setAllowNotificationToggle(!allowNotificationToggle)}
                        toggleLOgo={allowNotificationToggle ? Images.toggleOn : Images.toggleOff}
                    />

                    <Spacer />
                    <PoppinsText style={styles.title}>Social</PoppinsText>
                    <Spacer customHeight={hp(1)} />
                    <NotificationPreferencesCard
                        title={'Social Trades'}
                        subTitle={'Trading activity from people you follow.'}
                        onPressToggle={() => setSocialTradesToggle(!socialTradesToggle)}
                        toggleLOgo={socialTradesToggle ? Images.toggleOn : Images.toggleOff}
                    />

                    <Spacer />
                    <PoppinsText style={styles.title}>Balances and Trading</PoppinsText>
                    <Spacer customHeight={hp(1)} />
                    <BalanceAndTradingCard
                        title1={'Sent Tokens'}
                        description1={'Outbound transfers of tokens and NFTs.'}
                        onPressSentTokenToggle={() => setSentTokensToggle(!sentTokensToggle)}
                        sentTokenLogo={sentTokensToggle ? Images.toggleOn : Images.toggleOff}
                        title2={'Received Tokens'}
                        description2={'Inbound transfers of tokens and NFTs.'}
                        onPressReceivedTokenToggle={() => setReceivedTokensToggle(!receivedTokensToggle)}
                        receivedTokenLogo={receivedTokensToggle ? Images.toggleOn : Images.toggleOff}
                        title3={'Swaps'}
                        description3={'Swap activity from people you follow.'}
                        onPressSwapToggle={() => setSwapToggle(!swapToggle)}
                        swapToggleLogo={swapToggle ? Images.toggleOn : Images.toggleOff}
                        title4={'Balance Changes'}
                        description4={'Balance changes from people you follow.'}
                        onPressBalanceChangesToggle={() => setBalanceChangesToggle(!balanceChangesToggle)}
                        balanceChangesToggleLogo={balanceChangesToggle ? Images.toggleOn : Images.toggleOff}
                    />

                    <Spacer />
                    <PoppinsText style={styles.title}>General</PoppinsText>
                    <Spacer customHeight={hp(1)} />
                    <NotificationPreferencesCard
                        title={'Updates From Phantom'}
                        subTitle={'Feature announcements and general updates.'}
                        onPressToggle={() => setGeneralUpdateToggle(!generalUpdateToggle)}
                        toggleLOgo={generalUpdateToggle ? Images.toggleOn : Images.toggleOff}
                    />
                </View>


            </View>
        </MainContainerApp>
    )
}

export default Notifications
