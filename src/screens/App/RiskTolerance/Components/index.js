import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { riskToleranceOptions } from '../../../../components/dummyData'
import Spacer from '../../../../components/Spacer'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { colors } from '../../../../constants/colors'
import { appStyles } from '../../../../utilities/appStyles'
import PoppinsText from '../../../../components/PoppinsText'
import { Fonts } from '../../../../constants/fonts'
import { Images } from '../../../../Images'

export const RiskToleranceOptions = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <FlatList
            data={riskToleranceOptions}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Spacer customHeight={hp(1)} />}
            removeClippedSubviews={false}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedOption(item)} style={[styles.optionContainer, appStyles.row]}>
                        <View style={appStyles.rowBasic}>
                            <Image source={item?.logo} resizeMode='contain' style={styles.optionLogo} />
                            <View style={{ flex: 1 }}>
                                <PoppinsText style={styles.optionTitle}>{item?.title}</PoppinsText>
                                <PoppinsText style={styles.optionDescription}>{item?.description}</PoppinsText>
                            </View>
                            <Image source={selectedOption === item ? Images.radioCheckRound : Images.radioUnFill} resizeMode='contain' style={styles.radioBtn} />
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    )
}


const styles = StyleSheet.create({
    optionContainer: {
        borderRadius: 13,
        padding: wp(4),
        backgroundColor: colors.gray14
    },
    optionLogo: {
        width: wp(3),
        height: wp(4),
        marginRight: wp(3),
        alignSelf: 'flex-start'
    },
    optionTitle: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray31
    },
    optionDescription: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray20
    },
    radioBtn: {
        width: wp(4.5),
        height: wp(4.5)
    }
})