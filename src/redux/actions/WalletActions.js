import { ISFIGERPRINT, PIN } from "../types";


export const SavePin = data => {
    return {
        type: PIN,
        payload: data,
    };
};

export const SaveFingerPrint = data => {
    return {
        type: ISFIGERPRINT,
        payload: data,
    };
};