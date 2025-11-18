import { Platform, ScrollView, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { wp } from "./ResponsiveComponent";
import { colors } from "../constants/colors";

export const SimpleRBSheet = props => {
    return (
        <RBSheet
            ref={props.refRBSheet}
            height={props.height}
            closeDuration={500}
            openDuration={500}
            draggable
            closeOnPressBack={true}
            closeOnDragDown={true}
            onClose={props.onClose}
            customModalProps={{
                statusBarTranslucent: true,
            }}

            customStyles={{
                wrapper: {
                    backgroundColor: Platform.OS === 'ios' ? '#00000099' : '#00000099',
                },
                draggableIcon: {
                    backgroundColor: props.barColor ?? colors.bottomSheetBgColor,
                    width: props.barWidth ?? wp(36),
                },
                container: {
                    backgroundColor: props.backgroundColor ?? colors.bottomSheetBgColor,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomEndRadius: 16,
                    borderBottomStartRadius: 16,
                    overflow: 'hidden',
                    width: wp(100),
                    alignSelf: 'center',
                },

            }}>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: props.paddingHorizontal ? props.paddingHorizontal : wp(4), }}>
                {props.children}
            </ScrollView>

        </RBSheet>
    );
};

const styles = StyleSheet.create({

})