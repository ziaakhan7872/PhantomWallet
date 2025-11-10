import { Image, Keyboard, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { AppContainer, MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { appStyles } from '../../../utilities/appStyles'
import PoppinsText from '../../../components/PoppinsText'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import { PopularTokensList, SendTokenCard } from './Components'
import { hp } from '../../../components/ResponsiveComponent'
import useBuyFromHome from './Hooks'
import { routes } from '../../../constants/routes'

const BuyFromHome = (props) => {
    const { searchText, setSearchText } = useBuyFromHome();
    return (
        <MainContainerApp>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <Spacer customHeight={hp(6)} />
                    <View style={appStyles.row}>
                        <PoppinsText style={styles.selectTokenText}>Select Token</PoppinsText>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                            <Image source={Images.questionMark} resizeMode='contain' style={styles.questionMark} />
                        </TouchableOpacity>
                    </View>
                    <Spacer />
                    <CustomTextInput5
                        value={searchText} onChangeText={(text) => setSearchText(text)}
                        leftImage={Images.searchWhite} placeholder='Search' inputStyle={styles.searchInput} />
                    <Spacer />
                    <PoppinsText style={styles.getStartedText}>Get started</PoppinsText>
                    <Spacer customHeight={hp(1)} />
                    <View style={appStyles.row}>
                        <SendTokenCard tokenLogo={Images.solanaLogo} tokenName={'Solana'} tokenSymbol={'SOL'} onPress={() => { }} />
                        <SendTokenCard tokenLogo={Images.solanaLogo} tokenName={'Solana'} tokenSymbol={'SOL'} onPress={() => { }} />
                    </View>
                    <Spacer />
                    <PoppinsText style={styles.popularTokensText}>Popular tokens</PoppinsText>
                    <Spacer />
                    <PopularTokensList searchText={searchText} setSearchText={setSearchText} onPressToken={() => props?.navigation.navigate(routes.buyTokenAmount)} />
                </View>
            </TouchableWithoutFeedback>

        </MainContainerApp>
    )
}

export default BuyFromHome
