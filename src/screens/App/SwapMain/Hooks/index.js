import React, { useRef, useState } from 'react'

const useSwapMain = (props) => {

    const previousFromTokenItem = props?.route?.params?.item

    console.log(previousFromTokenItem, 'previousFromTokenItempreviousFromTokenItempreviousFromTokenItem');


    const payTokenBottomSheet = useRef(null)
    const receiveTokenBottomSheet = useRef(null)

    const [selectedTokenPay, setSelectedTokenPay] = useState({})
    const [enterAmountPay, setEnterAmountPay] = useState('')
    const [erroMessage, seterroMessage] = useState('');
    const [selectedChainFrom, setSelectedChainFrom] = useState({});
    const [FromtokenBalance, setFromtokenBalance] = useState('');
    const [PriceButton, setPriceButton] = useState('')
    const [typePayOrReceive, setTypePayOrReceive] = useState('');
    const [fromstateCurentPrice, setfromstateCurentPrice] = useState('');
    const [selectedTokenReceive, setSelectedTokenReceive] = useState({})
    const [Recivetokenbalance, setRecivetokenbalance] = useState('');
    const [enterAmountReceive, setEnterAmountReceive] = useState('')
    const [FeatchLoading, setFeatchLoading] = useState(false);
    const [tostateCurentPrice, settostateCurentPrice] = useState('');

    const [toSelectedToken, setToSelectedToken] = useState(previousFromTokenItem?.tokenName);
    const [fromSelectedToken, setFromSelectedToken] = useState(previousFromTokenItem?.tokenName);


    const handleAmmount = text => {
        // setgasPrice('')
        // setpriceImpact('')
        // setEnterAmountReceive('')
        seterroMessage('')
        if (text?.toString().split('.').length > 2) {
            return;
        }
        setEnterAmountPay(text);
    };


    return {
        handleAmmount,
        selectedTokenPay,
        enterAmountPay,
        selectedChainFrom,
        FromtokenBalance,
        PriceButton, setPriceButton,
        typePayOrReceive, setTypePayOrReceive,
        fromstateCurentPrice,
        selectedTokenReceive,
        Recivetokenbalance,
        enterAmountReceive,
        FeatchLoading,
        tostateCurentPrice,
        payTokenBottomSheet,
        receiveTokenBottomSheet,
        previousFromTokenItem,
        fromSelectedToken, setFromSelectedToken,
        toSelectedToken, setToSelectedToken,
    }
}

export default useSwapMain
