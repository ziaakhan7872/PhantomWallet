import { PASSWORD } from '../types';

export const setPassword = (password) => ({
    type: PASSWORD,
    payload: password,
});


