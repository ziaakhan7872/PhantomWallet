import { Platform, StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    margin: {
        paddingHorizontal: wp(4)
    },
    tokenCurentPrice: {
        fontSize: 42,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white,
    },
    greenArrowUp: {
        width: wp(2.5),
        height: wp(2.5),
        marginRight: wp(2),
        marginBottom: hp(0.3)
    },
    dollarPrice: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#447E65',
    },
    percentageRoundBox: {
        backgroundColor: '#34A06E',
        paddingHorizontal: wp(1),
        paddingVertical: hp(0.1),
        borderRadius: 7,
        marginLeft: wp(2)
    },
    percentageText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#175232',
    },
    bgView: {
        width: wp(45.5),
        borderRadius: 20,
        padding: wp(3),
        backgroundColor: '#222222'
    },
    balanceText: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4',
        textAlign: 'left',
        paddingHorizontal: wp(2)
    },
    balance: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white,
        textAlign: 'left',
        paddingHorizontal: wp(2)
    },
    hourBgView: {
        borderRadius: 21,
        padding: wp(3),
        backgroundColor: '#222222'
    },
    changeReturn: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4',
    },
    changeAmount: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.green8,
    },
    perpsText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#C0C0C0',
    },
    twoRoundsWithCircle: {
        width: wp(12),
        height: wp(12),
    },
    tradeText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white,
    },
    multiplyText: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4',
    },
    stakeText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#B4B4B4',
    },
    earnText: {
        fontSize: 20,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white,
    },
    percentText: {
        fontSize: 20,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#439D72',
    },
    graphDotLines: {
        width: wp(74.5),
        height: hp(11.75),
        alignSelf: 'flex-end'
    },
    btn1Container: {
        width: wp(40),
        height: wp(11.5),
        backgroundColor: colors.btnDisableColor,
        borderWidth: 0,
        borderRadius: 16
    },
    btn2Container: {
        width: wp(40),
        height: wp(11.5),
        backgroundColor: colors.green10,
        borderWidth: 0,
        borderRadius: 16
    },
    infoText1: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#C0C0C0',
    },
    about: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#C0C0C0',
    },
    desc: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4'
    },
    showMore: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: '#A193EA'
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
        color: '#C0C0C0'
    },
    receivedText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white,
    },
    amountCrypto: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.mainGreenChange,
    },
    address: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4',
        textAlign: 'left'
    },
    resText1: {
        fontSize: 11,
        fontFamily: Fonts.Poppins.Regular,
        color: '#A1A1A1',
        textAlign: 'left'
    },
    positionText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#B4B4B4',
    },
    staking: {
        width: wp(92),
        height: wp(70),
    },
    bottomBtn1: {
        width: wp(42),
        height: wp(11.5),
        backgroundColor: '#5F57A2',
        borderWidth: 0,
        borderRadius: 16
    },
    bottomBtn2: {
        width: wp(42),
        height: wp(11.5),
        backgroundColor: '#5F57A2',
        borderWidth: 0,
        borderRadius: 16
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