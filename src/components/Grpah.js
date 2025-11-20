import React from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { colors } from '../constants/colors';
import { Images } from '../Images';
import { hp, wp } from './ResponsiveComponent';

const { width } = Dimensions.get('window');

export const Graph = ({ graphData, graphLoading }) => {
    let data = graphData?.map((item) => {
        return {
            value: item?.length > 0 ? item[1] : 0,
        }
    });

    let chartData = data?.length > 0 ? data : [{ value: 0 }];

    const minValue = Math.min(...chartData.map(item => item.value));
    const maxValue = Math.max(...chartData.map(item => item.value));

    const normalizedData = chartData.map(item => ({
        value: (item.value - minValue) * 5000000,
    }));


    // console.log('normalizedData:::normalizedData', normalizedData);

    return (
        <View style={styles.container}>
            {graphLoading ? (
                <View style={{ height: hp(28.9), justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={'#75bb75'} size={'large'} />
                </View>
            ) : (
                <LineChart
                    data={normalizedData}
                    width={wp(89)}
                    hideDataPoints
                    height={200}
                    onlyPositive
                    spacing={wp(2.5)}
                    hideOrigin
                    hideYAxisText
                    color={'#75bb75'}
                    curved
                    scrollAnimation
                    scrollToEnd
                    yAxisColor={'transparent'}
                    xAxisColor={colors.bgColor}
                    adjustToWidth={true}
                    noOfSections={3}
                    rulesThickness={1}
                    rulesType="solid"
                    rulesColor={colors.bgColor}
                    rulesLength={wp(89)}
                // data={data}
                // width={width - 40}
                // hideDataPoints
                // // height={150}
                // hideOrigin
                // verticalLabelRotation={30}
                // isAnimated
                // color={colors.green}
                // strokeWidth={3}
                // hideRules={true}
                // yAxisLabelSuffix={''}
                // yAxisColor={'transparent'}
                // // xAxisLabelTextStyle={styles.labelStyle}
                // // yAxisLabelTextStyle={styles.labelStyle}
                // lineWidth={3} // Set the width of the line
                // hideDataPoint={false}
                // dataPointsColor={'#FFFFFF'}
                // lineStyle={{ borderRadius: 10 }}
                // hideYAxisText     // 👈 hides the left numbers
                // hideAxesAndRules
                />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: colors.borderClor,
        // backgroundColor: colors.blueBgColor,
        borderRadius: 20
    },
    header: {
        // color: 'white',
        // fontSize: 24,
        // marginBottom: 20,
    },
    labelStyle: {
        color: colors.white,
    },
})