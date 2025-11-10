import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppContainer } from '../../../components/MainContainer'
import { AppHeader } from '../../../components/AppHeader'
import { Images } from '../../../Images'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import PoppinsText from '../../../components/PoppinsText'
import { RowView, SelectTokenList } from './Components'
import LineBreak from '../../../components/LineBreak'
import { appStyles } from '../../../utilities/appStyles'
import { CustomButton } from '../../../components/CustomButton'
import useShowPrivateKey from './Hooks'
import { routes } from '../../../constants/routes'
import { SeedPhraseCard } from '../ShowSeedPhrase/Components'

const ShowPrivateKey = (props) => {
    const { item, isChecked, setIsChecked, showPrivateKey, setShowPrivateKey, isCopy, onPressCopy } = useShowPrivateKey(props)
    return (
        <AppContainer>
            <View style={styles.mainView}>
                <AppHeader leftImage={Images.backArrow} title={'Show Private Key'} onPressBack={() => props?.navigation.goBack()} />

                {showPrivateKey ?
                    <>
                        <Spacer />
                        <View style={styles.alertView}>
                            <PoppinsText style={styles.alertText}>Do not share your Private Key!</PoppinsText>
                            <Spacer customHeight={hp(1)} />
                            <PoppinsText style={styles.alertDesc}>If someone has your Private Key they will have full control of your wallet.</PoppinsText>
                        </View>
                        <Spacer />
                        {/* <SeedPhraseCard showSeedPhrase={showPrivateKey} setShowSeedPhrase={setShowPrivateKey} seedPhrase={item?.privateKey ?? ''} onPressCopy={onPressCopy} isCopy={isCopy} /> */}
                        <View style={styles.copyPrivateKeyBgView}>
                            <PoppinsText style={styles.copyPrivateKeyText}>{item?.privateKey ?? ''}</PoppinsText>
                        </View>
                        <Spacer />
                        <TouchableOpacity onPress={() => onPressCopy()} style={{ ...appStyles.rowBasic, alignSelf: 'center' }}>
                            {isCopy ? null : <Image
                                source={Images.copy}
                                style={styles.copyimg}
                                resizeMode='contain'
                            />}
                            <PoppinsText style={styles.copyTextStyle}>{isCopy ? 'Copied' : "Copy to clipboard"}</PoppinsText>
                        </TouchableOpacity>
                        {/* <View style={{ paddingHorizontal: wp(4) }}>
                            <PoppinsText style={styles.selectAccountText}>Select your account</PoppinsText>
                            <Spacer />
                            <SelectTokenList onPressToken={(item) => props?.navigation.navigate(routes.copyPrivateKey, { token: item })} />
                        </View> */}
                    </>
                    :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Image source={Images.infoWithRedCircle} resizeMode='contain' style={styles.infoWithRedCircle} />
                        <Spacer />
                        <PoppinsText style={styles.title}>Keep Your Private Key Secret</PoppinsText>
                        <Spacer />
                        <View style={{ paddingHorizontal: wp(4) }}>
                            <RowView leftImage={Images.keyWithRound} title={'Your private key is like a password for your account.'} />
                            <Spacer />
                            <RowView leftImage={Images.eyeSlashWithRound} title={'If someone gets it, they can drain your wallet. Theres is no way to recover lost funds.'} />
                            <Spacer />
                            <RowView leftImage={Images.infoWithRound} title={'Never share it with anyone—no person,website, or app.'} />
                        </View>
                    </View>
                }
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                {showPrivateKey ?
                    null
                    // <CustomButton title={showPrivateKey ? 'Done' : 'Continue'} disabled={!isChecked} titleStyles={!isChecked ? styles.disabledTitle : styles.btnEnableTitle} onPressBtn={() => setShowPrivateKey(true)} />
                    :
                    <>
                        <LineBreak />
                        <Spacer />
                        <TouchableOpacity activeOpacity={0.8} style={{ ...appStyles.rowBasic, paddingHorizontal: wp(4) }} onPress={() => { setIsChecked(!isChecked) }}>
                            <Image source={isChecked ? Images.checkBox : Images.unCheckBox} resizeMode='contain' style={styles.checkBox} />
                            <PoppinsText style={styles.bottomText}>I understand that sharing my private key could result in permanent loss of funds</PoppinsText>
                        </TouchableOpacity>
                        <Spacer />
                        <CustomButton title={showPrivateKey ? 'Done' : 'Continue'} disabled={!isChecked} titleStyles={!isChecked ? styles.disabledTitle : styles.btnEnableTitle} onPressBtn={() => setShowPrivateKey(true)} />
                    </>
                }
            </View>
        </AppContainer>
    )
}

export default ShowPrivateKey
