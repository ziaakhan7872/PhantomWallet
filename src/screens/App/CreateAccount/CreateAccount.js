import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import { CustomButton } from '../../../components/CustomButton'
import { NewCustomHeader } from '../../../components/MainHeader'

const CreateAccount = (props) => {
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <NewCustomHeader title={'Create Account'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                    <Spacer customHeight={hp(3)} />
                    <CustomTextInput5 placeholder={'Account Name'} inputStyle={styles.textInputStyle} rightImage={Images.crossWithBox} rightImageStyle={styles.crossWithBox} />
                </View>
            </TouchableWithoutFeedback>

            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Create'} onPressBtn={() => { }} />
            </View>
        </MainContainerApp>
    )
}


export default CreateAccount