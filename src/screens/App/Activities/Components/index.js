import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { transactionData } from '../../../../components/dummyData'
import Spacer from '../../../../components/Spacer'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { Fonts } from '../../../../constants/fonts'
import { colors } from '../../../../constants/colors'
import { appStyles } from '../../../../utilities/appStyles'
import PoppinsText from '../../../../components/PoppinsText'
import { NumberRoundFunction } from '../../../../constants/commonHelperFunctions/commonHelperFunction'
import { formatAddress } from '../../../../services/Helpers/CommonHelper'

const checkSendOrReceive = (item, activeWallet) => {
    let status
    if (item?.chain == 'bitcoin') {
        if (item?.from?.toLowerCase() == activeWallet?.btcWalletAddress?.toLowerCase()) {
            status = 'Sent'
        } else {
            status = 'Received'
        }
    } else if (item?.chain == 'Solana') {
        if (item?.from?.toLowerCase() == activeWallet?.solanaWalletAddress?.toLowerCase()) {
            status = 'Sent'
        } else {
            status = 'Received'
        }
    } else {
        if (item?.from?.toLowerCase() == activeWallet?.walletAddress?.toLowerCase()) {
            status = 'Sent'
        } else {
            status = 'Received'
        }
    }

    return status
}

export const ActivitiesList = ({ data, activeWallet, onPress }) => {

    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Spacer customHeight={hp(2)} />}
            renderItem={({ item, index }) => {
                let status = checkSendOrReceive(item, activeWallet)

                if (item?.isHeader) {
                    return <PoppinsText style={styles.date}>{item?.label}</PoppinsText>
                }


                return (
                    <View style={{ paddingHorizontal: wp(4) }}>
                        {/* {showDate && (
                            <>
                                <PoppinsText style={styles.date}>{item.date}</PoppinsText>
                                <Spacer customHeight={hp(1.5)} />
                            </>
                        )} */}

                        <View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => onPress(item, status)}
                                style={[appStyles.row, styles.activityItem]}>
                                <View style={appStyles.rowBasic}>
                                    <Image
                                        source={{ uri: item?.logo }}
                                        resizeMode="contain"
                                        style={styles.icon}
                                    />
                                    <View>
                                        <PoppinsText style={styles.title}>{status}</PoppinsText>
                                        <PoppinsText style={styles.subtitle}>{status == 'Sent' ? `To ${formatAddress(item?.to)}` : `From ${formatAddress(item?.from)}`}</PoppinsText>
                                    </View>
                                </View>

                                {item?.value && (
                                    <PoppinsText style={[styles.amount, { color: status == 'Sent' ? colors.white : '#4CAF50' }]}>
                                        {status == 'Sent' ? `-${NumberRoundFunction(item?.value)}` : `+${NumberRoundFunction(item?.value)}`} {item?.symbol?.toUpperCase()}
                                    </PoppinsText>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }}
        />
    )
}


const styles = StyleSheet.create({
    date: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray62,
        paddingHorizontal: wp(4)
    },
    activityItem: {
        borderRadius: 12,
        backgroundColor: colors.gray23,
        padding: wp(3)

    },
    icon: {
        width: wp(10.5),
        height: wp(10.5),
        marginRight: wp(3),
        borderRadius: 100
    },
    title: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray60,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray61,
    },
    amount: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.green1,
        textAlign: 'right'
    }
})