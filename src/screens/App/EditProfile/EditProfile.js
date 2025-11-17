import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { appStyles } from '../../../utilities/appStyles'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { RowButtons } from '../../../components/RowButtons'
import { colors } from '../../../constants/colors'
import LineBreak from '../../../components/LineBreak'
import { routes } from '../../../constants/routes'

const EditProfile = (props) => {
    const item = props?.route?.params?.item

    return (
        <AppContainer>
            <View style={styles.mainView}>
                <Spacer />
                <View style={appStyles.rowBasic}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.goBack()}>
                        <Image source={Images.backArrow} resizeMode='contain' style={styles.backArrow} />
                    </TouchableOpacity>
                    <PoppinsText style={styles.userName}>@{item?.username ?? ''}</PoppinsText>
                </View>
                <Spacer customHeight={hp(4)} />
                {/* <Image source={Images.profile1} resizeMode='contain' style={styles.profile1} /> */}
                <PoppinsText style={{ fontSize: 52, textAlign: 'center' }}>{item?.logo ?? '😍'}</PoppinsText>
                <Spacer customHeight={hp(1)} />
                <PoppinsText style={styles.userName1}>@{item?.username ?? ''}</PoppinsText>
                <Spacer customHeight={hp(1)} />
                <View style={{ ...appStyles.row, width: wp(60), alignSelf: 'center', paddingHorizontal: wp(3) }}>
                    <PoppinsText style={styles.followers}>O followers</PoppinsText>
                    <PoppinsText style={styles.date} >October 2025</PoppinsText>
                </View>
                <Spacer />

                <View style={{ alignSelf: 'center' }}>
                    <RowButtons titlebtn1='Edit Profile' titlebtn2='Follow' titleColor1={colors.gray52} tintColor2={colors.gray28} style={styles.btn1Styles} styleBtn={styles.btn2Styles}
                        onPressBtn1={() => props.navigation.navigate(routes.manageProfile, { item })}
                    />
                </View>
                <Spacer customHeight={hp(4)} />
                <LineBreak style={{ width: wp(100), alignSelf: 'center' }} />
                <Spacer customHeight={hp(4)} />
                <View style={{ alignSelf: 'center' }}>
                    <Image source={Images.noActivity} resizeMode='contain' style={styles.noActivity} />
                    <Spacer />
                    <PoppinsText style={styles.noActivityText}>No Activity Yet</PoppinsText>
                </View>
            </View>
        </AppContainer>
    )
}

export default EditProfile
