import { Platform, StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    tokenCurentPrice: {
        fontSize: 42,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray110,
    },
    greenArrowUp: {
        width: wp(2.5),
        height: wp(2.5),
        marginRight: wp(2),
        marginBottom: hp(0.3)
    },
    dollarPrice: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.green7
    },
    percentageRoundBox: {
        marginLeft: wp(2),
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.1),
        backgroundColor: colors.green5,
        borderRadius: 5
    },
    percentageText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.green6,
        textAlign: 'center',
        marginTop: Platform.OS == 'ios' ? 0 : hp(0.2)
    },
    bgView: {
        width: wp(44),
        borderRadius: 12,
        padding: wp(3),
        backgroundColor: colors.gray23
    },
    balanceText: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray25,
        textAlign: 'left',
        paddingHorizontal: wp(2)
    },
    balance: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray62,
        textAlign: 'left',
        paddingHorizontal: wp(2)
    },
    hourBgView: {
        borderRadius: 12,
        padding: wp(3),
        backgroundColor: colors.gray23
    },
    changeReturn: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray36,
    },
    changeAmount: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.green8,
    },
    perpsText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray108,
    },
    twoRoundsWithCircle: {
        width: wp(7),
        height: wp(7),
        marginRight: wp(3)
    },
    tradeText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray63,
    },
    multiplyText: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray45,
    },
    stakeText: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray3,
    },
    earnText: {
        fontSize: 17,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray83,
    },
    percentText: {
        fontSize: 17,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.green9,
    },
    graphDotLines: {
        width: wp(74.5),
        height: hp(11.75),
        alignSelf: 'flex-end'
    },
    btn1Container: {
        width: wp(42),
        height: wp(10.5),
        backgroundColor: colors.btnDisableColor,
        borderWidth: 0,
        borderRadius: 10
    },
    btn2Container: {
        width: wp(42),
        height: wp(10.5),
        backgroundColor: colors.green10,
        borderWidth: 0,
        borderRadius: 10
    },
    infoText1: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray111,
    },
    about: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white,
    },
    desc: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray8
    },
    showMore: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.lightPurple10
    },
    website: {
        width: wp(22.5),
        height: wp(7.5)
    },
    telegram: {
        width: wp(22.5),
        height: wp(7.5),
    },
    twitter: {
        width: wp(12),
        height: wp(7.5)
    },
    performanceText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray47
    },
    receivedText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray25,
    },
    amountCrypto: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray97,
    },
    address: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.green13,
        textAlign: 'left'
    },
    resText1: {
        fontSize: 10,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray112,
        textAlign: 'left'
    },
    positionText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray98,
    },
    bottomBtn1: {
        width: wp(42),
        height: wp(10.5),
        backgroundColor: colors.lightPurple11,
        borderWidth: 0,
        borderRadius: 9
    },
    bottomBtn2: {
        width: wp(42),
        height: wp(10.5),
        backgroundColor: colors.lightPurple11,
        borderWidth: 0,
        borderRadius: 9
    },
    modalContainer: {
        backgroundColor: colors.bottomSheetBgColor,
        borderRadius: 20,
        paddingHorizontal: wp(5),
        paddingVertical: hp(3),
        width: wp(85),
        alignSelf: 'center',
    },
    modalContent: {
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: colors.gray23,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
    },
    modalInput: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white,
        textAlign: 'left',
        padding: 0,
    },
    modalButton: {
        flex: 1,
        height: hp(5.5),
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: colors.btnDisableColor,
    },
    saveButton: {
        backgroundColor: '#AB9FF1',
    },
    cancelButtonText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray62,
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.black,
    },
})