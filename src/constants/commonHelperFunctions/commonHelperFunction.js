import { BitcoinAddressValidation } from "../../services/Helpers/BitcoinHelper";
import { EvmAddressValidation } from "../../services/Helpers/EVMHelper";
import { solanaAddresValidation } from "../../services/Helpers/SolanaHelper";



export function formatBalance(balance) {
    const numString = balance?.toString();

    if (Math.abs(Number(numString)) < 0.0000005) {
        return 0;
    }

    const parts = numString?.split(".");

    if (parts?.length > 1 && parts[1]?.length > 4) {
        return parts[0] + "." + parts[1]?.substring(0, 4);
    }

    return numString;
}

export function formatBalancetwoDigit(balance) {
    const numString = balance?.toString();

    if (Math.abs(Number(numString)) < 0.0000005) {
        return 0;
    }

    const parts = numString?.split(".");

    if (parts?.length > 1 && parts[1]?.length > 2) {
        return parseFloat(parts[0] + "." + parts[1]?.substring(0, 2));
    }

    return numString;
}

export const NumberRoundFunction = (number) => {
    const num = Number(number);

    if (isNaN(num)) return 0;

    // If number is 0 or nearly 0
    if (Math.abs(num) < 1e-8) return 0;

    // For large numbers, round to 2 decimals
    if (Math.abs(num) >= 1) return Number(num.toFixed(2));

    // For small decimals, show up to 8 decimals but trim trailing zeros
    return Number(num.toFixed(5));
};


export function functionHandleCurentPrice(value) {
    const subscriptChars = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
    function removeZerosAndDot(value) {
        if (value?.toString().includes('e-')) {
            let num = value; // or any other number in scientific notation
            let parts = num.toString().split('e-');
            let base = parseFloat(parts[0]);
            let exponent = parseInt(parts[1]);
            let floatingNum = base * Math.pow(10, -exponent);
            let formattedNum = floatingNum.toFixed(9).replace(/\.?0+$/, ''); // 9 decimal places

            let numStr = formattedNum.toString(); // convert to string
            let numWithoutZeros = numStr.replace(/^0\.0*/, ''); // remove leading zeros and decimal point
            return numWithoutZeros
        } else {
            let numStr = value.toString(); // convert to string
            let numWithoutZeros = numStr.replace(/^0\.0*/, ''); // remove leading zeros and decimal point
            return numWithoutZeros;
        }
    }

    if (value >= 0.001 || value == 0) {
        return formatBalance(value);
    } else {
        const zeroCount = Math.max(Math.floor(-Math.log10(value)), 0);
        const integerPart = '0';
        const fractionalPart = removeZerosAndDot(value);
        const subscript = Array.from(zeroCount.toString()).map(
            c => subscriptChars[parseInt(c)],
        );

        return `${integerPart}.0${subscript.join('')}${fractionalPart}`;
    }
}

export const ValidateSendAddress = async (item, addresses) => {

    let isvalidadres = ''
    console.log('item?.isEvm', item);

    if (item?.isEvm == 1) {
        isvalidadres = EvmAddressValidation(addresses.trim())
    }
    else if (item?.chainName == "bitcoin") {
        isvalidadres = BitcoinAddressValidation(addresses.trim())
    }
    else if (item?.chainName == "Solana") {
        isvalidadres = await solanaAddresValidation(addresses.trim())
    }

    console.log('item?.isEvm::::isvalidadres', isvalidadres);
    return isvalidadres
}