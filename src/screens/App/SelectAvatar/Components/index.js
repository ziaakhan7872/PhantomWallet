import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyles } from '../../../../utilities/appStyles'
import PoppinsText from '../../../../components/PoppinsText'
import { Fonts } from '../../../../constants/fonts'
import { colors } from '../../../../constants/colors'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { emojis } from '../../../../components/dummyData'
import Spacer, { HorizontalSpacer } from '../../../../components/Spacer'

export const RowTabs = ({ selectedTab, setSelectedTab }) => {
    return (
        <View style={{ ...appStyles.row, paddingHorizontal: wp(5), width: wp(60) }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedTab('Emojis')}>
                <PoppinsText style={{
                    ...styles.tabText,
                    color: selectedTab === 'Emojis' ? colors.lightPurple8 : colors.gray28
                }}>Emojis</PoppinsText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedTab('Collectibles')}>
                <PoppinsText style={{
                    ...styles.tabText,
                    color: selectedTab === 'Collectibles' ? colors.lightPurple8 : colors.gray28
                }}>Collectibles</PoppinsText>
            </TouchableOpacity>
        </View>
    )
}

export const EmojisList = ({ setSelectedEmoji }) => {
    return (
        <FlatList
            data={emojis}
            showsVerticalScrollIndicator={false}
            numColumns={8}
            removeClippedSubviews={false}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, }} onPress={() => setSelectedEmoji(item?.emoji)}>
                        <PoppinsText style={styles.emojiImage}>{item?.emoji}</PoppinsText>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export const CollectiblesList = () => {
    return (
        <FlatList
            data={null}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            ItemSeparatorComponent={() => <Spacer />}
            ListEmptyComponent={() => {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', height: hp(40) }}>
                        <PoppinsText style={styles.emptyText}>No collectibles</PoppinsText>
                    </View>
                )
            }}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity activeOpacity={0.8}>
                    </TouchableOpacity>
                )
            }}
        />
    )
}


const styles = StyleSheet.create({
    tabText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
    },
    emojiImage: {
        width: wp(6),
        height: wp(7.5),
        alignSelf: 'center',
    },
    emptyText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Medium,
        color: colors.gray108,
        textAlign: 'center'
    }
})