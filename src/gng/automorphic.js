import { sortByLengthAndValue } from '../utils/sortLengthValue.js';


export const isAutomorphic = (number) => {
    if (number == null || number === '') return false;
    const resolvedNumber = BigInt(number);
    if (resolvedNumber < 0n) return false;
    const square = (resolvedNumber * resolvedNumber).toString();
    return square.endsWith(resolvedNumber.toString());
};

const nextAutomorphic = (n, k) => {
    const nextPower = 10n ** (2n * BigInt(k));
    let nextN = (3n * (n ** 2n) - 2n * (n ** 3n)) % nextPower;
    if (nextN < 0n) nextN += nextPower;
    return nextN;
};

export const getAutomorphic = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 1) return [];

    const result = ['0', '1'];
    if (resolvedCount === 1) return ['0'];
    if (resolvedCount === 2) return result;

    let currentFive = 5n;
    let k = 1;

    const fiveBranch = [5n];

    while (k < resolvedCount) {
        currentFive = nextAutomorphic(currentFive, k);
        k *= 2;
        fiveBranch.push(currentFive);
    }

    const masterFiveStr = currentFive.toString();
    const totalDigitsAvailable = masterFiveStr.length;

    for (let i = 1; i <= totalDigitsAvailable; i++) {
        const fiveStr = masterFiveStr.slice(-i);
        result.push(fiveStr);

        const powerOfTen = 10n ** BigInt(i);
        const sixNum = (powerOfTen + 1n) - BigInt(fiveStr);
        
        const sixStr = sixNum.toString().padStart(i, '0');
        result.push(sixStr);

        if (result.length >= resolvedCount) break;
    }

    return sortByLengthAndValue(result.slice(0, resolvedCount));
};