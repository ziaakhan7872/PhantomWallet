import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { MainContainerApp } from '../../../components/MainContainer'
import Spacer from '../../../components/Spacer'
import { styles } from './styles'
import { Images } from '../../../Images'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import { SendTokensList } from './Components'
import { routes } from '../../../constants/routes'
import useSendTokens from './Hooks'
import { hp } from '../../../components/ResponsiveComponent'
import { NewCustomHeader } from '../../../components/MainHeader'

const SendTokens = (props) => {
    const {
        searchText, setSearchText,
        activeWalletWithTokens,
    } = useSendTokens(props)
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                {/* <View style={styles.container}>
                    <View style={[appStyles.row,]}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                            <Image source={Images.cross} resizeMode='contain' style={styles.cross} />
                        </TouchableOpacity>
                        <PoppinsText style={styles.title}>{'Select Token'}</PoppinsText>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Image resizeMode='contain' style={styles.rightImage} />
                        </TouchableOpacity>
                    </View>
                    <Spacer />
                    <CustomTextInput5 value={searchText} onChangeText={(text) => setSearchText(text)} leftImage={Images.searchWhite} placeholder={'Search tokens'} inputStyle={styles.inputStyle} containerStyle={styles.inputContainer} />
                </View> */}
                <View>
                    <NewCustomHeader title={'Select Token'} leftImage={Images.cross} onPressLeftImage={() => props?.navigation.goBack()} />
                    <Spacer />
                    <CustomTextInput5 value={searchText} onChangeText={(text) => setSearchText(text)} leftImage={Images.searchWhite} placeholder={'Search tokens'} inputStyle={styles.inputStyle} containerStyle={styles.inputContainer} />
                </View>
            </TouchableWithoutFeedback>
            <Spacer />
                      
             <SendTokensList
                data={activeWalletWithTokens?.tokens}
                searchText={searchText}
                onPressToken={(item) => props?.navigation.navigate(routes.sendTokensAddress, { item })}
            />

        </MainContainerApp>
    )
}

export default SendTokens
