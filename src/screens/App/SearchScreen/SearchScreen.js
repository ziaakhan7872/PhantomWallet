import { Image, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { MainContainerApp } from '../../../components/MainContainer'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { appStyles } from '../../../utilities/appStyles'
import { Images } from '../../../Images'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import { SearchList, TrendingTokens } from './Components'
import PoppinsText from '../../../components/PoppinsText'
import { routes } from '../../../constants/routes'

const SearchScreen = (props) => {
    return (
        <MainContainerApp style={{}}>
            <Spacer customHeight={hp(7)} />
            <View style={styles.mainView}>
                <View style={appStyles.row}>
                    <Image source={Images.accountWithRoundLogo} resizeMode='contain' style={styles.accountWithRoundLogo} />
                    <CustomTextInput5 leftImage={Images.searchWhite} placeholder={'Sites, tokens, URL'} inputStyle={styles.inputStyle} containerStyle={styles.containerInputStyle} />
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                        <Image source={Images.plusWithSquareBox} resizeMode='contain' style={styles.plusWithSquareBox} />
                    </TouchableOpacity>
                </View>
                <Spacer customHeight={hp(1)} />
                <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    <Spacer />
                    <SearchList />
                    <Spacer />
                    <View style={appStyles.row}>
                        <PoppinsText style={styles.trendingTokensText}>Trending Tokens</PoppinsText>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.navigate(routes.allSearchTokenList)}>
                            <PoppinsText style={styles.seeMoreText}>See More</PoppinsText>
                        </TouchableOpacity>
                    </View>
                    <Spacer />
                    <View style={styles.trendingTokensView}>
                        <TrendingTokens />
                    </View>
                    <Spacer />
                    <View style={appStyles.row}>
                        <PoppinsText style={styles.trendingTokensText}>Perps</PoppinsText>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.navigate(routes.allSearchTokenList)}>
                            <PoppinsText style={styles.seeMoreText}>See More</PoppinsText>
                        </TouchableOpacity>
                    </View>
                    <Spacer />
                    <View style={styles.trendingTokensView}>
                        <TrendingTokens />
                    </View>
                    <Spacer />
                    <View style={appStyles.row}>
                        <PoppinsText style={styles.trendingTokensText}>Top Lists</PoppinsText>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.navigate(routes.allSearchTokenList)}>
                            <PoppinsText style={styles.seeMoreText}>See More</PoppinsText>
                        </TouchableOpacity>
                    </View>
                    <Spacer />
                    <View style={styles.trendingTokensView}>
                        <TrendingTokens />
                    </View>
                    <Spacer customHeight={hp(15)} />
                </ScrollView>
            </View>
        </MainContainerApp>
    )
}

export default SearchScreen
