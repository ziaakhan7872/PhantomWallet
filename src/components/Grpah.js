// import React from 'react';
// import { StyleSheet, Dimensions, ImageBackground, View, ActivityIndicator } from 'react-native';
// // import { LineChart } from 'react-native-gifted-charts';
// import { colors } from '../constants/colors';
// import { Images } from '../Images';
// import { hp, wp } from './ResponsiveComponent';
// import { LineChart } from 'react-native-wagmi-charts';
// import { Skia } from '@shopify/react-native-skia';
// console.log("SKIA_CHECK:", Skia);

// const { width } = Dimensions.get('window');

// export const Graph = ({ graphData, graphLoading, change24h, selectedTab }) => {
//     const testWagmiData = [
//         { timestamp: 1734680000000, value: 210.12 },
//         { timestamp: 1734680300000, value: 211.05 },
//         { timestamp: 1734680600000, value: 209.88 },
//         { timestamp: 1734680900000, value: 212.44 },
//         { timestamp: 1734681200000, value: 213.12 },
//         { timestamp: 1734681500000, value: 214.55 },
//         { timestamp: 1734681800000, value: 213.77 },
//         { timestamp: 1734682100000, value: 215.02 },
//         { timestamp: 1734682400000, value: 216.33 },
//         { timestamp: 1734682700000, value: 217.10 },
//         { timestamp: 1734683000000, value: 216.40 },
//         { timestamp: 1734683300000, value: 218.12 }
//     ];

//     // ||||||||||||||||||||+++++++++++++++++______________----------------------------////////////////



//     let data = graphData?.map((item) => {
//         return {
//             value: item?.length > 0 ? item[1] : 0,
//         }
//     });
//     console.log('datadatadata,datadata', data);

//     let chartData = data?.length > 0 ? data : [{ value: 0 }];

//     const minValue = Math.min(...chartData.map(item => item.value));
//     const maxValue = Math.max(...chartData.map(item => item.value));

//     const normalizedData = chartData.map(item => ({
//         value: (item.value - minValue) * 5000000,
//     }));

//     console.log("GRAPHDATAAAA ===", graphData.slice(0, 5))

//     let wagmiData = (graphData ?? [])
//         .filter(item => item?.length >= 2)
//         .map(item => ({
//             timestamp: Number(item[0]) * 1000, // MUST be ms
//             value: Number(item[1]),            // must be float, not huge number
//         }))
//         .sort((a, b) => a.timestamp - b.timestamp);
//     console.log("wagmiDatawagmiData ====", JSON.stringify(wagmiData, null, 2));

//     // const normalizedData = normalizedData1?.reverse();
//     // console.log('normalizedData:::normalizedData', normalizedData);

//     const lastItem = normalizedData[normalizedData?.length - 1]?.value ?? 0;
//     const secondLastItem = normalizedData[normalizedData?.length - 2]?.value ?? 0;
//     console.log('lastItem:::lastItem', lastItem, secondLastItem);


//     // let finalData = selectedTab == '1H' ? [...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData] :
//     //     (selectedTab == '1D' || selectedTab == '1W') ? [...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData, ...normalizedData] : normalizedData;


//     let finalData = selectedTab == '1H' ? [...normalizedData, ...normalizedData,] : normalizedData

//     return (
// <View style={styles.container}>
//     {graphLoading ? (
//         <View style={{ height: hp(28.9), justifyContent: 'center', alignItems: 'center' }}>
//             <ActivityIndicator color={'#29a16b'} size={'large'} />
//         </View>
//     ) : (
//                 // <LineChart
//                 //     data={finalData}
//                 //     width={wp(89)}
//                 //     hideDataPoints
//                 //     height={200}
//                 //     onlyPositive
//                 //     spacing={selectedTab == '1H' ? wp(1) : (selectedTab == '1D' || selectedTab == '1W') ? wp(1) : wp(0.5)}
//                 //     hideOrigin
//                 //     hideYAxisText
//                 //     color={change24h?.toString()?.includes('-') ? '#e94f33' : '#29a16b'}
//                 //     curved
//                 //     scrollAnimation
//                 //     scrollToEnd
//                 //     yAxisColor={'transparent'}
//                 //     xAxisColor={colors.bgColor}
//                 //     adjustToWidth={true}
//                 //     noOfSections={3}
//                 //     rulesThickness={1}
//                 //     rulesType="solid"
//                 //     rulesColor={colors.bgColor}
//                 //     rulesLength={wp(89)}
//                 // // data={data}
//                 // // width={width - 40}
//                 // // hideDataPoints
//                 // // // height={150}
//                 // // hideOrigin
//                 // // verticalLabelRotation={30}
//                 // // isAnimated
//                 // // color={colors.green}
//                 // // strokeWidth={3}
//                 // // hideRules={true}
//                 // // yAxisLabelSuffix={''}
//                 // // yAxisColor={'transparent'}
//                 // // // xAxisLabelTextStyle={styles.labelStyle}
//                 // // // yAxisLabelTextStyle={styles.labelStyle}
//                 // // lineWidth={3} // Set the width of the line
//                 // // hideDataPoint={false}
//                 // // dataPointsColor={'#FFFFFF'}
//                 // // lineStyle={{ borderRadius: 10 }}
//                 // // hideYAxisText     // 👈 hides the left numbers
//                 // // hideAxesAndRules
//                 // />
//                 <LineChart.Provider data={testWagmiData}>
//                     <LineChart width={wp(89)} height={200}>
//                         <LineChart.Path
//                             color={change24h?.toString()?.includes('-') ? '#e94f33' : '#29a16b'}
//                             smoothing="bezier"
//                         />
//                         <LineChart.CursorLine />
//                         <LineChart.CursorCrosshair color="#fff" />
//                         <LineChart.Tooltip
//                             textStyle={{ color: '#fff' }}
//                             backgroundColor="#00000090"
//                         />
//                     </LineChart>
//                 </LineChart.Provider>
//             )}
//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // borderWidth: 1,
//         // borderColor: colors.borderClor,
//         // backgroundColor: colors.blueBgColor,
//         borderRadius: 20
//     },
//     header: {
//         // color: 'white',
//         // fontSize: 24,
//         // marginBottom: 20,
//     },
//     labelStyle: {
//         color: colors.white,
//     },
// })

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import PoppinsText from './PoppinsText';
import Animated, {
    withRepeat,
    withTiming,
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { hp, wp } from './ResponsiveComponent';

export const Graph = ({ change24h, onPriceChange, setDailyPnl, dailyPnl, graphData, graphLoading, balanceValue }) => {

    // console.log("graphData:::graphData", graphData);

    let data = graphData?.map((item) => {
        return {
            value: item?.length > 0 ? item[1] : 0,
            timestamp: item?.length > 0 ? item[0] : 0,
        }
    });

    // const data = [
    //     { timestamp: 1734680000000, value: 210 },
    //     { timestamp: 1734680300000, value: 230 },
    //     { timestamp: 1734680600000, value: 190 },
    //     { timestamp: 1734680900000, value: 250 },
    //     { timestamp: 1734681200000, value: 170 },
    //     { timestamp: 1734681500000, value: 260 },
    //     { timestamp: 1734681800000, value: 200 },
    //     { timestamp: 1734682100000, value: 270 },
    //     { timestamp: 1734682400000, value: 180 },
    //     { timestamp: 1734682700000, value: 300 },
    //     { timestamp: 1734683000000, value: 190 },
    //     { timestamp: 1734683300000, value: 310 },
    //     { timestamp: 1734680000000, value: 210 },
    //     { timestamp: 1734680300000, value: 230 },
    //     { timestamp: 1734680600000, value: 190 },
    //     { timestamp: 1734680900000, value: 250 },
    //     { timestamp: 1734681200000, value: 170 },
    //     { timestamp: 1734681500000, value: 260 },
    //     { timestamp: 1734681800000, value: 200 },
    //     { timestamp: 1734682100000, value: 270 },
    //     { timestamp: 1734682400000, value: 180 },
    //     { timestamp: 1734682700000, value: 300 },
    //     { timestamp: 1734683000000, value: 190 },
    //     { timestamp: 1734683300000, value: 310 },
    //     { timestamp: 1734680000000, value: 210 },
    //     { timestamp: 1734680300000, value: 230 },
    //     { timestamp: 1734680600000, value: 190 },
    //     { timestamp: 1734680900000, value: 250 },
    //     { timestamp: 1734681200000, value: 170 },
    //     { timestamp: 1734681500000, value: 260 },
    //     { timestamp: 1734681800000, value: 200 },
    //     { timestamp: 1734682100000, value: 270 },
    //     { timestamp: 1734682400000, value: 180 },
    //     { timestamp: 1734682700000, value: 300 },
    //     { timestamp: 1734683000000, value: 110 },
    //     { timestamp: 1734683300000, value: 100 },
    // ];

    // Pulse animation
    // const pulse = useSharedValue(1);
    // useEffect(() => {
    //     pulse.value = withRepeat(withTiming(1.4, { duration: 900 }), -1, true);
    // }, []);


    return (
        <View style={styles.container}>
            {graphLoading ? (
                <View style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={'#4AA46C'} size={'large'} />
                </View>
            ) : (

                <LineChart.Provider data={data}
                    onCurrentIndexChange={(idx) => {
                        const point = data[idx];
                        if (point) {
                            // const priceDifference = point.value - data[data?.length - 1]?.value; // Difference between the two prices
                            // const price24hAgo = (priceDifference / data[data?.length - 1]?.value) * 100;

                            // const priceDifference1 = data[data?.length - 1]?.value - point.value;
                            // const dollarChange = priceDifference1 * balanceValue;

                            const currentPrice = Number(data?.[data.length - 1]?.value || 0);
                            const selectedPrice = Number(point?.value || 0);

                            if (!currentPrice || !selectedPrice) {
                                return { dollarChange: 0, percentageChange: 0 };
                            }

                            // selected vs current
                            const dollarChange = selectedPrice - currentPrice; // ✅ 2900 - 3000 = -100 (down)
                            const percentageChange = (dollarChange / currentPrice) * 100;

                            onPriceChange?.(point.value, point.timestamp, percentageChange, dollarChange);
                        } else {
                            onPriceChange?.(data[data?.length - 1]?.value, data[data?.length - 1]?.timestamp, change24h, dailyPnl?.pnlAmount);
                        }
                    }}
                >
                    <LineChart width={wp(95)} height={250} >
                        <LineChart.Path
                            width={3}
                            color={change24h < 0 ? '#E54D2E' : '#4AA46C'}
                        />
                        {/* <LineChart.Dot size={20} at={data.length - 1} hasPulse={true} pulseDurationMs={100} hasOuterDot={true} outerSize={20} /> */}

                        <LineChart.CursorCrosshair showAtLastPoint at={data.length - 1} size={13} color={change24h < 0 ? '#E54D2E' : '#4AA46C'} />
                        {/* <LineChart.CursorLine color='#101010' lineProps={{ strokeWidth: 0, }} textStyle={{ color: '#101010' }} /> */}
                        <LineChart.CursorLine color='#B4B4B4' lineProps={{ strokeWidth: 2, }} textStyle={{ color: '#B4B4B4' }} />
                    </LineChart>

                </LineChart.Provider>

            )}

            {/* <LineChart.Provider
                data={data}
            >

                <LineChart height={200} width={350} interactive>

                    <LineChart.Path
                        smoothing="none"
                        width={3}
                        color={change24h < 0 ? '#e94f33' : '#29a16b'}
                    />

                    <LineChart.HorizontalLine
                        at="center"
                        color="gray"
                        strokeDasharray={[4, 6]}

                    />

                    <LineChart.CursorLine color="#fff" width={1.5} />

                    <LineChart.CursorCrosshair>
                        {({ timestamp }) => timestamp && (
                            <View style={styles.cursorBox}>
                                <PoppinsText style={styles.cursorText}>
                                    {new Date(timestamp).toLocaleTimeString()}
                                </PoppinsText>
                            </View>
                        )}
                    </LineChart.CursorCrosshair>

                </LineChart>

                {restX != null && restY != null && (
                    <Animated.View
                        style={[
                            styles.restingDot,
                            pulseStyle,
                            {
                                transform: [
                                    { translateX: restX - 6 },
                                    { translateY: restY - 6 },
                                ],
                            },
                        ]}
                    />
                )}

            </LineChart.Provider> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: { justifyContent: 'center', alignItems: 'center', width: wp(96) },

    restingDot: {
        position: 'absolute',
        width: 12,
        height: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start'
    },

    cursorBox: {
        backgroundColor: '#00000090',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 8,
    },
    cursorText: {
        color: '#fff',
        fontSize: 11,
    },
});




