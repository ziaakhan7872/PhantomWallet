import { View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import PoppinsText from '../../../components/PoppinsText'

const ChatScreen = () => {
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <PoppinsText style={styles.comingSoonText}>👆 Coming soon</PoppinsText>
                </View>
            </View>
        </MainContainerApp>
    )
}

export default ChatScreen
