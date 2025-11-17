import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from 'react-native'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import { Images } from '../../../Images'
import { styles } from './styles'
import { NewCustomHeader } from '../../../components/MainHeader'
import { MainContainerApp } from '../../../components/MainContainer'
import { CustomButton } from '../../../components/CustomButton'
import { useEffect, useState } from 'react'
import database from '../../../services/database'
import { routes } from '../../../constants/routes'

const AccountName = (props) => {
    const item = props?.route?.params?.item

    const [accountName, setAccountName] = useState(item?.name ?? '')

    useEffect(() => {
        if (item?.name)
            setAccountName(item?.name ?? '')
    }, [item])

    const onPressSave = async () => {
        console.log('accountName', accountName);
        try {
            if (accountName?.trim()?.length > 0) {
                const updateres = await database.updateWalletAccountName(item?.id, accountName)
                props?.navigation.replace(routes.MainTabs)
            }
        } catch (error) {
            console.log('catch error in onPressSave:', error);
        }
    }

    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <ScrollView scrollEnabled={false}>
                <View style={styles.mainView}>
                    <NewCustomHeader title={'Account Name'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                    <Spacer customHeight={hp(2.5)} />
                    <CustomTextInput5
                        placeholder={'Account Name'}
                        value={accountName}
                        onChangeText={(text) => setAccountName(text)}
                        inputStyle={styles.textInputStyle}
                        rightImage={Images.crossWithBox}
                        rightImageStyle={styles.crossWithBox} />
                </View>
            </ScrollView>

            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Save'} onPressBtn={() => onPressSave()} />
            </View>
        </MainContainerApp>
    )
}

export default AccountName
