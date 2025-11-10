import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import { AppHeader } from '../../../components/AppHeader'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import PoppinsText from '../../../components/PoppinsText'
import { RowView, SeedPhraseCard } from './Components'
import { CustomButton } from '../../../components/CustomButton'
import { appStyles } from '../../../utilities/appStyles'
import LineBreak from '../../../components/LineBreak'
import useShowSeedPhrase from './Hooks'

const ShowSeedPhrase = (props) => {
    const { item, isChecked, setIsChecked, showSeedPhrase, setShowSeedPhrase, onPressCopy, isCopy } = useShowSeedPhrase(props)
    return (
        <AppContainer>
            <View style={styles.mainView}>
                <AppHeader leftImage={Images.backArrow} title={'Show Recovery Phrase'} onPressBack={() => props?.navigation.goBack()} />
                <Spacer customHeight={hp(4)} />

                {showSeedPhrase ?
                    <>
                        <View style={styles.alertView}>
                            <PoppinsText style={styles.alertText}>Do not share your Recovery Phrase!</PoppinsText>
                            <Spacer customHeight={hp(1)} />
                            <PoppinsText style={styles.alertDesc}>lf someone has your Recovery Phrase they will have full control of your wallet.</PoppinsText>
                        </View>
                        <Spacer />
                        <SeedPhraseCard showSeedPhrase={showSeedPhrase} setShowSeedPhrase={setShowSeedPhrase} seedPhrase={item?.seedPhrase ?? ''} onPressCopy={onPressCopy} isCopy={isCopy} />
                    </>
                    :
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                        <Image source={Images.infoWithRedCircle} resizeMode='contain' style={styles.infoWithRedCircle} />
                        <Spacer />
                        <PoppinsText style={styles.title}>Keep Your Recovery Phrase Secret</PoppinsText>
                        <Spacer />
                        <View style={{ paddingHorizontal: wp(4) }}>
                            <RowView leftImage={Images.keyWithRound} title={'Your secret recovery phrase is like a master key to your wallet.'} />
                            <Spacer />
                            <RowView leftImage={Images.eyeSlashWithRound} title={'If someone gets it, they can steal your funds. There is no way to recover lost funds.'} />
                            <Spacer />
                            <RowView leftImage={Images.infoWithRound} title={'Never share it with anyone—no person, website, or app.'} />
                        </View>
                    </View>
                }
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                {showSeedPhrase ?
                    <CustomButton title={'Done'} disabled={!isChecked} titleStyles={!isChecked ? styles.disabledTitle : styles.btnEnableTitle} onPressBtn={() => props?.navigation.goBack()} />

                    :
                    <>
                        <LineBreak />
                        <Spacer />
                        <TouchableOpacity activeOpacity={0.8} style={{ ...appStyles.rowBasic, paddingHorizontal: wp(4) }} onPress={() => { setIsChecked(!isChecked) }}>
                            <Image source={isChecked ? Images.checkBox : Images.unCheckBox} resizeMode='contain' style={styles.checkBox} />
                            <PoppinsText style={styles.bottomText}>I understand that sharing my recovery phrase could result in permanent loss of funds.</PoppinsText>
                        </TouchableOpacity>
                        <Spacer />
                        <CustomButton title={'Continue'} disabled={!isChecked} titleStyles={!isChecked ? styles.disabledTitle : styles.btnEnableTitle} onPressBtn={() => setShowSeedPhrase(true)}

                        />
                    </>
                }
            </View>
        </AppContainer>
    )
}

export default ShowSeedPhrase
