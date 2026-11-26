import { getPrimeFactors } from '../utils/primeFactors.js';
import { sortByLengthAndValue } from '../utils/sortLengthValue.js';

export const isPowerful = (number) => {
    if (number == null || number === '') return false;
    const n = BigInt(number);
    if (n < 1n) return false;
    if (n === 1n) return true;

    const factors = getPrimeFactors(n);
    for (const power of factors.values()) {
        if (power < 2n) return false;
    }

    return true;
};

const cbrtBigInt = (n) => {
    if (n < 2n) return n;
    let low = 1n;
    let high = n;

    while (low <= high) {
        const mid = (low + high) >> 1n;
        const cube = mid * mid * mid;
        if (cube === n) return mid;
        if (cube < n) low = mid + 1n;
        else high = mid - 1n;
    }
    return high;
};

export const getPowerful = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 1) return [];

    const limit = BigInt(Math.ceil((resolvedCount * 0.6) ** 2)) + 100n;
    const maxB = Number(cbrtBigInt(limit));

    const isSquareFree = new Uint8Array(maxB + 1).fill(1);
    isSquareFree[0] = 0;

    for (let i = 2; i * i <= maxB; i++) {
        const sq = i * i;
        for (let j = sq; j <= maxB; j += sq) {
            isSquareFree[j] = 0;
        }
    }

    const powerfulNumbers = [];

    for (let b = 1; b <= maxB; b++) {
        if (!isSquareFree[b]) continue;

        const bBig = BigInt(b);
        const bCubed = bBig * bBig * bBig;

        for (let a = 1n; ; a++) {
            const val = a * a * bCubed;
            if (val > limit) break;
            powerfulNumbers.push(val.toString());
        }
    }

    return sortByLengthAndValue(powerfulNumbers).slice(0, resolvedCount);
};