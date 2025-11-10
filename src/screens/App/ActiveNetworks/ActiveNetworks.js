import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { AppContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import { AppHeader } from '../../../components/AppHeader'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { networks } from '../../../components/dummyData'
import { appStyles } from '../../../utilities/appStyles'
import PoppinsText from '../../../components/PoppinsText'

const ActiveNetworks = (props) => {
    const [selectedNetworks, setSelectedNetworks] = useState([])

    const handleSelectNetwork = (item) => {
        const alreadySelected = selectedNetworks.some(n => n.id === item.id)
        if (alreadySelected) {
            setSelectedNetworks(prev => prev.filter(n => n.id !== item.id))
        } else {
            setSelectedNetworks(prev => [...prev, item])
        }
    }

    return (
        <AppContainer>
            <View style={styles.mainView}>
                <AppHeader leftImage={Images.backArrow} title='Active Networks' onPressBack={() => props?.navigation.goBack()} />
                <Spacer />
                <View style={{ paddingHorizontal: wp(4) }}>
                    <FlatList
                        data={networks}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <Spacer customHeight={hp(0.2)} />}
                        removeClippedSubviews={false}
                        renderItem={({ item, index }) => {

                            const isFirst = index === 0;
                            const isLast = index === networks.length - 1;
                            const isSelected = selectedNetworks.some(n => n.id === item.id)

                            return (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => handleSelectNetwork(item)}
                                    style={[
                                        styles.itemCard,
                                        isFirst && styles.firstItemCard,
                                        isLast && styles.lastItemCard,
                                        appStyles.row
                                    ]}>
                                    <View style={appStyles.rowBasic}>
                                        <Image source={item?.logo} resizeMode='contain' style={styles.itemLogo} />
                                        <PoppinsText style={styles.itemName}>{item?.name}</PoppinsText>
                                    </View>
                                    <Image source={isSelected ? Images.checkBox : Images.unCheckBox} resizeMode='contain' style={styles.unCheckBox} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        </AppContainer>
    )
}

export default ActiveNetworks
