import { Image, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { ActivitiesList } from './Components'
import { routes } from '../../../constants/routes'
import { hp, wp } from '../../../components/ResponsiveComponent'
import PoppinsText from '../../../components/PoppinsText'
import { appStyles } from '../../../utilities/appStyles'
import { MainContainerApp } from '../../../components/MainContainer'

const Activities = (props) => {
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(6)} />
                <View style={{ ...appStyles.row, paddingHorizontal: wp(4) }}>
                    <PoppinsText style={styles.recentActivityText}>Recent Activity</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>  <Image source={Images.horizontallyDots} resizeMode='contain' style={styles.horizontallyDots} /></TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>  <Image source={Images.cross} resizeMode='contain' style={styles.arrcrossowDown} /></TouchableOpacity>
                    </View>
                </View>
                <Spacer />
                <ActivitiesList onPress={() => props?.navigation.navigate(routes.activitiesDetails)} />
            </View>
        </MainContainerApp>
    )
}

export default Activities
