


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
    const hasNonZeroDecimal = /\.\d*[1-9]/.test(number)
    const displayNumber = hasNonZeroDecimal ? Number(number).toFixed(2) : Math.round(number);
    return Number(displayNumber)
}

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