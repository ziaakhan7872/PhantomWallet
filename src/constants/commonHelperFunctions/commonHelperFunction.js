import { BitcoinAddressValidation } from "../../services/Helpers/BitcoinHelper";
import { EvmAddressValidation } from "../../services/Helpers/EVMHelper";
import { solanaAddresValidation } from "../../services/Helpers/SolanaHelper";


// export const convertBigValues = (value) => {
//     if (value >= 1e12) {
//         return (value / 1e12).toFixed(2) + 'T';
//     } else if (value >= 1e9) {
//         return (value / 1e9).toFixed(2) + 'B';
//     } else if (value >= 1e6) {
//         return (value / 1e6).toFixed(2) + 'M';
//     } else {
//         return  value?.toFixed(2)
//     }
// }

export const convertBigValues = (value) => {
    if (value == null || isNaN(value)) return '0.00';

    const num = Number(value);
    const absValue = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    const formatWithCommas = (n) =>
        new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    if (absValue >= 1e12) {
        return sign + (absValue / 1e12).toFixed(2) + 'T';
    } else if (absValue >= 1e9) {
        return sign + (absValue / 1e9).toFixed(2) + 'B';
    } else if (absValue >= 1e6) {
        return sign + (absValue / 1e6).toFixed(2) + 'M';
    } else if (absValue >= 1e5) {
        return sign + (absValue / 1e3).toFixed(2) + 'K';
    } else {
        // ✅ comma formatting for normal numbers
        return sign + formatWithCommas(absValue);
    }
};







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

    return numString
}

export function formatValueTwoDigit(balance, locale = "en-US") {
    const num = Number(balance);
    if (!num || Math.abs(num) < 0.0000005) return "0.00";

    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
}


export function formatValueFourDigit(balance) {
    const num = Number(balance);

    if (!num || Math.abs(num) < 0.0000005) return "0.00";

    return num.toFixed(4); // ALWAYS keeps 2 digits
}


// export const NumberRoundFunction = (number) => {
//     const num = Number(number);

//     if (isNaN(num)) return 0;

//     // If number is 0 or nearly 0
//     if (Math.abs(num) < 1e-8) return 0;

//     // For large numbers, round to 2 decimals
//     if (Math.abs(num) >= 1) return Number(num.toFixed(2));

//     // For small decimals, show up to 8 decimals but trim trailing zeros
//     return Number(num.toFixed(5));
// };


export const NumberRoundFunction = (number) => {
    const num = Number(number);

    if (isNaN(num)) return '0';

    // If number is 0 or nearly 0
    if (Math.abs(num) < 1e-8) return '0';

    // For large numbers, round to 2 decimals
    if (Math.abs(num) >= 1) {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // For small decimals, show up to 5 decimals
    const formatted = num.toFixed(5);
    // Remove trailing zeros
    return formatted.replace(/\.?0+$/, '');
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