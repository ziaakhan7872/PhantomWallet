import { PIN, ISFIGERPRINT } from '../types';


const initState = {
    pin: '',
    isBiometric: false,
};


const userdataReducer = (state = initState, action) => {
    switch (action.type) {

        case PIN:
            return {
                ...state,
                pin: action.payload,
            };
        case ISFIGERPRINT:
            return {
                ...state,
                isBiometric: action.payload,
            };

        default:
            return state;
    }
};

export default userdataReducer;
