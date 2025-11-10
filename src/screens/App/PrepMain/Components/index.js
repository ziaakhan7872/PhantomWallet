import { FlatList, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../../../constants/colors'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { Images } from '../../../../Images'
import Spacer from '../../../../components/Spacer'
import PoppinsText from '../../../../components/PoppinsText'
import { Fonts } from '../../../../constants/fonts'
import { CustomButton } from '../../../../components/CustomButton'
import { appStyles } from '../../../../utilities/appStyles'
import { cryptoPairs } from '../../../../components/dummyData'

export const TradePerpCard = ({ onPressBtn1, onPressBtn2 }) => {
    return (
        <View style={styles.tradePerpCard}>
            <Spacer />
            <Image source={Images.perpImage1} resizeMode='contain' style={styles.perpImage} />
            <Spacer />
            <PoppinsText style={styles.title}>Trade Perps</PoppinsText>
            <PoppinsText style={styles.desc}>Use perps to trade on an asset's future price movements. You'll need to add funds to your perps balance to get started.</PoppinsText>
            <Spacer />
            <CustomButton title={'Add Funds'} titleStyles={styles.btn1TitleStyles} onPressBtn={onPressBtn1} btnSyles={styles.btnSyles1} />
            <Spacer customHeight={hp(1)} />
            <CustomButton title={'Learn more'} onPressBtn={onPressBtn2} btnSyles={styles.btnSyles2} titleStyles={{ color: colors.gray44 }} />
        </View>
    )
}

export const ExplorePerps = ({ }) => {
    return (
        <FlatList
            data={cryptoPairs}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            ItemSeparatorComponent={() => <Spacer />}
            renderItem={({ item }) => {
                return (
                    <View style={appStyles.row}>
                        <View style={appStyles.rowBasic}>
                            <Image source={item?.icon} resizeMode='contain' style={styles.tokenLogo} />
                            <View>
                                <PoppinsText style={styles.tokenName}>{item?.tokenName}</PoppinsText>
                                <Spacer customHeight={hp(0.2)} />
                                <PoppinsText style={styles.leverage}>{item?.leverage}</PoppinsText>
                            </View>
                        </View>
                        <View>
                            <PoppinsText style={styles.dollarAmount}>{item?.dollarPrice}</PoppinsText>
                            <Spacer customHeight={hp(0.2)} />
                            <PoppinsText style={styles.percentageAmount}>{item?.change}</PoppinsText>
                        </View>
                    </View>
                )
            }}
        />
    )
}


const styles = StyleSheet.create({
    // TradePerpCard
    tradePerpCard: {
        borderRadius: 13,
        backgroundColor: colors.gray23,
        padding: wp(5)
    },
    perpImage: {
        width: wp(19.5),
        height: wp(10),
        alignSelf: 'center'
    },
    title: {
        fontSize: 17,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray83,
        textAlign: 'center'
    },
    desc: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray78,
        textAlign: 'center'
    },
    btnSyles1: {
        width: wp(86),
        height: hp(5.5),
        alignSelf: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: colors.lightPurple18
    },
    btn1TitleStyles: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray139,
        textAlign: 'center'
    },
    btnSyles2: {
        width: wp(86),
        height: hp(5.5),
        alignSelf: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: colors.btnDisableColor
    },
    // ExplorePerps
    tokenLogo: {
        width: wp(10.5),
        height: wp(10.5),
        marginRight: wp(3),
        borderRadius: 100
    },
    tokenName: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray49,
    },
    leverage: {
        fontSize: 11,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray61,
    },
    dollarAmount: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray38,
        textAlign: 'right'
    },
    percentageAmount: {
        fontSize: 11,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.green3,
        textAlign: 'right'
    },
})