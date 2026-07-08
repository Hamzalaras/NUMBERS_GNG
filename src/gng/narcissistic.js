import { sortByLengthAndValue } from '../utils/sortLengthValue.js';



export const isNarcissistic = (number) => {
    if (number == null || number === '') return false;
    const resolvedNumber = BigInt(number);
    if (resolvedNumber < 0n) return false;

    const resolvedNumberStr = resolvedNumber.toString();
    const power = BigInt(resolvedNumberStr.length);
    const accumulateNumber = resolvedNumberStr.split('')
                                .reduce((total, current) => total + BigInt(current) ** power, 0n);

    if (accumulateNumber === resolvedNumber) return true;
    else return false;
};

const getNarcissisticForLength = (k) => {
    const found = [];
    const current = new Array(k).fill(0);
    const kBig = BigInt(k);

    const powers = Array.from({ length: 10 }, (_, i) => BigInt(i) ** kBig);

    while (true) {
        let sum = 0n;
        for (let j = 0; j < k; j++) {
            sum += powers[current[j]];
        }

        const sumStr = sum.toString();
        if (sumStr.length === k) {
            const countCurrent = new Array(10).fill(0);
            const countSum = new Array(10).fill(0);
            
            for (let j = 0; j < k; j++) {
                countCurrent[current[j]]++;
                countSum[parseInt(sumStr[j], 10)]++;
            }

            let isMatch = true;
            for (let m = 0; m < 10; m++) {
                if (countCurrent[m] !== countSum[m]) {
                    isMatch = false;
                    break;
                }
            }

            if (isMatch) found.push(sumStr);
        }

        let i = k - 1;
        while (i >= 0 && current[i] === 9) {
            i--;
        }
        if (i < 0) break;

        current[i]++;
        for (let j = i + 1; j < k; j++) {
            current[j] = current[i];
        }
    }
    return found;
};

export const getNarcissistic = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 1) return [];

    const result = [];
    let k = 1;

    while (result.length < resolvedCount && k <= 39) result.push(...getNarcissisticForLength(k++));

    return sortByLengthAndValue(result.slice(0, resolvedCount));
};