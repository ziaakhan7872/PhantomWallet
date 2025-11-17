import { Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import { AppHeader } from '../../../components/AppHeader'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { CollectiblesList, EmojisList, RowTabs } from './Components'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import { CustomButton } from '../../../components/CustomButton'
import PoppinsText from '../../../components/PoppinsText'
import database from '../../../services/database'
import { routes } from '../../../constants/routes'

const SelectAvatar = (props) => {
    const item = props?.route?.params?.item

    const [selectedTab, setSelectedTab] = useState('Emojis')
    const [selectedEmoji, setSelectedEmoji] = useState(item?.logo ?? '😍')

    useEffect(() => {
        if (item?.logo) {
            setSelectedEmoji(item?.logo ?? '😍')
        }
    }, [item])

    const onPressSave = async () => {
        try {
            const updateres = await database.updateWalletLogo(item?.id, selectedEmoji)
            props?.navigation.replace(routes.MainTabs)
        } catch (error) {
            console.log('catch error in onPressSave:', error);
        }
    }

    return (
        <AppContainer>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <AppHeader leftImage={Images.backArrow} title={'Select Avatar'} onPressBack={() => props?.navigation.goBack()} />
                    <Spacer customHeight={hp(3)} />
                    {/* <Image source={Images.profile1} resizeMode='contain' style={styles.profile1} /> */}
                    <PoppinsText style={styles.profileText}>{selectedEmoji}</PoppinsText>
                    <Spacer customHeight={hp(4)} />
                    <RowTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                    <Spacer />
                    <View style={{ paddingHorizontal: wp(4) }}>
                        <CustomTextInput5 leftImage={Images.searchWhite} placeholder={'Search...'} inputStyle={styles.inputStyle} containerStyle={styles.containerInputStyle} />
                    </View>
                    <Spacer />
                    {selectedTab === 'Emojis' ?
                        <>
                            <PoppinsText style={styles.suggestedText}>Suggested</PoppinsText>
                            <Spacer customHeight={hp(1)} />
                            <EmojisList setSelectedEmoji={setSelectedEmoji} />
                        </>
                        :
                        <CollectiblesList />}
                </View>
            </TouchableWithoutFeedback>

            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Save'} onPressBtn={() => onPressSave()} />
            </View>
        </AppContainer>
    )
}

export default SelectAvatar
