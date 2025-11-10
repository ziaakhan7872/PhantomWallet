import { Image, Keyboard, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { appStyles } from '../../../utilities/appStyles'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import LineBreak from '../../../components/LineBreak'
import { CustomKeyPad } from '../../../components/CustomKeyPad'
import useEnterSendingAmount from './Hooks'
import { AvailableAmountView } from './Components'
import { CustomButton } from '../../../components/CustomButton'
import { routes } from '../../../constants/routes'
import { NumberRoundFunction } from '../../../constants/commonHelperFunctions/commonHelperFunction'

const EnterSendingAmount = (props) => {
    const {
        receiverAddress, item,
        enteredAmount, setEnteredAmount,
        errorMessage, setErrorMessage,
        isDolorValue, setisDolorValue,
        enterkey, setEnterkey,
        handleNumberPress,
        handleDelete,
        handleLanguage,
    } = useEnterSendingAmount(props)

    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <View style={styles.container}>
                        <View style={[appStyles.row,]}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                                <Image source={Images.backArrow} resizeMode='contain' style={styles.goBackArrow} />
                            </TouchableOpacity>
                            <PoppinsText style={styles.title}>{'Enter Amount'}</PoppinsText>
                            <View style={styles.goBackArrow} />
                            {/* <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                                <PoppinsText style={styles.nextText}>{'Next'}</PoppinsText>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <Spacer customHeight={hp(1)} />
                    <View style={{ ...appStyles.rowBasic, paddingHorizontal: wp(3) }}>
                        <PoppinsText style={styles.toText}>To:</PoppinsText>
                        <CustomTextInput5
                            placeholder={`${receiverAddress?.slice(0, 12)}...${receiverAddress?.slice(-8)}`}
                            editable={false}
                            inputStyle={styles.inputStyle}
                            containerStyle={styles.inputContainer}
                            rightImage={Images.pencilWithBottomLine}
                            rightImageStyle={styles.rightImageStyle}
                            onPressRightImage={() => props?.navigation.goBack()}

                        />
                    </View>
                    <Spacer customHeight={hp(0.5)} />
                    <LineBreak style={styles.lineBreakStyle} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ ...appStyles.rowBasic, paddingHorizontal: wp(5) }}>
                            {/* <CustomTextInput5
                                    placeholder={'0'}
                                    value={enteredAmount || 0} onChangeText={(text) => setEnteredAmount(text)}
                                    inputStyle={styles.inputStyle1}
                                    containerStyle={styles.inputContainer1}
                                /> */}
                            <PoppinsText style={styles.inputStyle2}>{isDolorValue ? `$${enteredAmount || 0}` : `${enteredAmount || 0}`}</PoppinsText>
                            {!isDolorValue ? <PoppinsText style={styles.symbol}>{item?.symbol?.toUpperCase()}</PoppinsText> : null}
                        </View>
                        {!isDolorValue ?
                            <PoppinsText style={styles.dollarAmount}>{`~$${NumberRoundFunction(parseFloat(enteredAmount || 0) * parseFloat(item?.currentPriceUsd || 0))}`}</PoppinsText>
                            :
                            <PoppinsText style={styles.dollarAmount}>{`${NumberRoundFunction(parseFloat(enteredAmount || 0) / parseFloat(item?.currentPriceUsd || 0))} ${item?.symbol?.toUpperCase()}`}</PoppinsText>
                        }
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            setEnteredAmount('')
                            setisDolorValue(!isDolorValue)
                            setErrorMessage('')
                        }} style={{ position: 'absolute', right: wp(4) }}>
                            <Image source={Images.switchWithRound} resizeMode='contain' style={styles.switchWithRound} />
                        </TouchableOpacity>
                    </View>
                    {errorMessage ? <PoppinsText style={styles.errorMessage}>{errorMessage}</PoppinsText> : null}
                </View>
            </TouchableWithoutFeedback>

            <View style={{}}>
                <Spacer customHeight={hp(1)} />
                <LineBreak style={styles.lineBreakStyle} />
                <Spacer customHeight={hp(1)} />
                <AvailableAmountView
                    item={item}
                    isDolorValue={isDolorValue}
                    onPressMax={() => {
                        const balance = item?.balance;

                        if (balance !== undefined && balance !== null) {
                            let balanceString = balance.toString();

                            if (balanceString.includes('.')) {
                                const [whole, decimal] = balanceString.split('.');
                                const formattedDecimal = decimal.slice(0, 8);
                                balanceString = `${whole}.${formattedDecimal}`;
                            }

                            if (item?.chainName == "bitcoin") {
                                if (Number(balanceString) == 0) {
                                    setErrorMessage('')
                                }
                                let curuntPrice = item?.currentPriceUsd
                                const minimumbtcammount = 1.2 / Number(curuntPrice)
                                let minimumPrice = Number(balanceString) * Number(curuntPrice)
                                if (minimumPrice >= 1) {
                                    setErrorMessage('')
                                }

                                else if (Number(balanceString) == 0 && minimumPrice >= 1 || minimumPrice == 0) {
                                    setErrorMessage('')
                                }

                                else if (minimumPrice < 1) {
                                    setErrorMessage(`The minimum amount should not be less than ${minimumbtcammount.toFixed(8)} BTC`)
                                }


                            }
                            // Convert back to number if necessary or keep as string
                            setEnteredAmount(balanceString);
                        }
                    }}
                />
                <Spacer customHeight={hp(1)} />
                <CustomButton
                    title={'Send'}
                    // disabled={enteredAmount == 0 || (isDolorValue ? parseFloat(enteredAmount || 0) <= parseFloat(item?.balance || 0) : parseFloat(enteredAmount || 0) / parseFloat(item?.currentPriceUsd || 0) <= parseFloat(item?.balance || 0))}
                    disabled={isDolorValue
                        ? !(
                            Number(enteredAmount) > 0 &&
                            Number(enteredAmount) /
                            Number(item?.currentPriceUsd) <=
                            Number(item?.balance)
                        )
                        : !(
                            Number(enteredAmount) > 0 &&
                            Number(enteredAmount) <= Number(item?.balance)
                        )}
                    onPressBtn={() => props?.navigation.navigate(routes.sendSummaryScreen, { isDolorValue, enteredAmount, receiverAddress, item })} />
                <Spacer customHeight={hp(1)} />
                <CustomKeyPad onPressNumber={handleNumberPress} onDelete={handleDelete} onLanguage={handleLanguage} />
            </View>
        </MainContainerApp>
    )
}

export default EnterSendingAmount
