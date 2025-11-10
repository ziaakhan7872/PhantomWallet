import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { appStyles } from '../../../utilities/appStyles'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import { ExplorePerps, TradePerpCard } from './Components'
import { routes } from '../../../constants/routes'

const PrepMain = (props) => {
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(7)} />
            <View style={styles.mainView}>
                <View style={appStyles.row}>
                    <View style={appStyles.rowBasic}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                            <Image source={Images.backArrow} resizeMode='contain' style={styles.backArrow} />
                        </TouchableOpacity>
                        <PoppinsText style={styles.text}>Perps</PoppinsText>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                        <Image source={Images.searchWhite} resizeMode='contain' style={styles.searchWhite} />
                    </TouchableOpacity>
                </View>
                <Spacer />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TradePerpCard onPressBtn1={() => props?.navigation?.navigate(routes.addFunds)} onPressBtn2={() => { }} />
                    <Spacer />
                    <View style={appStyles.row}>
                        <PoppinsText style={styles.exploreText}>Explore Perps</PoppinsText>
                        <TouchableOpacity activeOpacity={0.8}>
                            <PoppinsText style={styles.seerMore}>See More</PoppinsText>
                        </TouchableOpacity>
                    </View>
                    <Spacer />
                    <View style={styles.tokenCardView}>
                        <ExplorePerps />
                    </View>
                    <Spacer />
                    <View style={[styles.bgView, appStyles.rowBasic]}>
                        <Image source={Images.perpImage1} resizeMode='contain' style={styles.perpImage1} />
                        <PoppinsText style={styles.learnText}>Learn the basics of trading perpetual futures</PoppinsText>
                    </View>
                    <Spacer />
                    <View style={[styles.bgView, appStyles.rowBasic]}>
                        <Image source={Images.shareFeedBack} resizeMode='contain' style={styles.feedBackImage} />
                        <PoppinsText style={styles.feedBackText}>Share feedback</PoppinsText>
                    </View>
                    <Spacer />
                    <View style={{ ...appStyles.rowBasic, paddingHorizontal: wp(2) }}>
                        <Image source={Images.questionMark} resizeMode='contain' style={styles.questionMark} />
                        <PoppinsText style={styles.issueText}>Having issues with a deposit or withdrawal?</PoppinsText>
                    </View>
                    <Spacer />
                    <PoppinsText style={styles.resText}>Trading perpetual contracts involves significant risk, including the
                        potential for sudden and total loss of your investment and collateral
                        due to high leverage and market volatlity, and may not be suitable for
                        all users. Prices may be influenced by funding rates and liquidity and
                        you may be subject to automatic liquidations without notice. Market
                        data provided by Hyperliquid.</PoppinsText>
                    <Spacer />
                    <PoppinsText style={styles.resText1}>Tokenized Stocks are blockchain-based instruments issued by third
                        parties that are designed to follow underlying equity performance.
                        While they track price movements and mechanics of actual securities,
                        they do not confer ownership rights or shareholder benefits. They are
                        available in select jurisdictions only, Token lists are generated using
                        market data provided by various third party providers including
                        CoinGecko, Birdeye, Jupiter and Hyperliquid, Performance shown is
                        based on the selected period. Past performance is not indicative of
                        future performance.</PoppinsText>
                    <Spacer customHeight={hp(5)} />

                </ScrollView>
            </View>
        </MainContainerApp>
    )
}

export default PrepMain
