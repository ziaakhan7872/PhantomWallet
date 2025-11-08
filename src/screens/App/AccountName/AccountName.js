import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import { Images } from '../../../Images'
import { styles } from './styles'
import { NewCustomHeader } from '../../../components/MainHeader'
import { MainContainerApp } from '../../../components/MainContainer'

const AccountName = (props) => {
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <NewCustomHeader title={'Account Name'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                    <Spacer customHeight={hp(2.5)} />
                    <CustomTextInput5 placeholder={'Account 1'} inputStyle={styles.textInputStyle} rightImage={Images.crossWithBox} rightImageStyle={styles.crossWithBox} />
                </View>
            </TouchableWithoutFeedback>

        </MainContainerApp>
    )
}

export default AccountName
