import { View } from 'react-native'
import React from 'react'
import { AppContainer, MainContainerApp } from '../../../components/MainContainer'
import { BuyAndSellHeader } from '../../../components/BuyAndSellHeader'
import { Images } from '../../../Images'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import EnterAmount from '../../../components/EnterAmount/EnterAmount'
import useBuyMain from './Hooks'
import { BuyTokenDetailsBottomSheet } from './Components'
import { routes } from '../../../constants/routes'

const BuyMain = (props) => {
    const { sellTokenFlow, buyTokenDetailsBottomSheetRef } = useBuyMain(props)
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(6)} />
                <BuyAndSellHeader leftImage={Images.backArrow} tokenLogo={Images.tokenLogo} tokenName={sellTokenFlow ? 'Sell Solana' : 'Buy Solana'} status={'421 people here'} rightImage={Images.slippage} onPressBackArrow={() => props?.navigation.goBack()} onPressRightImage={() => props?.navigation.navigate(routes.tokenDetailSettings)} />
                <Spacer />
                <EnterAmount
                    tokenLogo={Images.tokenLogo} chainLogo={Images.solanaRound}
                    tokenName={sellTokenFlow ? 'Receive USDC' : 'Pay USDC'} dropDown={Images.arrowDown}
                    dollarAmount={'$0.00'}
                    feeDollarAmmount={'$0.03 +0.85%'}
                    details={'Details'}
                    arrowDown={Images.arrowDown}
                    customCenterButton={true}
                    btnTitle={sellTokenFlow ? 'Sell now' : 'Buy now'}
                    onPressDetails={() => buyTokenDetailsBottomSheetRef.current?.open()}
                />
            </View>
            <BuyTokenDetailsBottomSheet buyTokenDetailsBottomSheetRef={buyTokenDetailsBottomSheetRef} />
        </MainContainerApp>
    )
}

export default BuyMain
