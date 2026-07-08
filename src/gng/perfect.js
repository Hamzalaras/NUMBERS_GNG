import { sortByLengthAndValue } from '../utils/sortLengthValue.js';

export const isPerfect = (number) => {
    if (number == null || number === '') return false;
    const n = BigInt(number);
    if (n <= 1n || (n & 1n) !== 0n) return false; 

    let temp = n;
    let k = 0n;
    while ((temp & 1n) === 0n) {
        temp >>= 1n;
        k++;
    }

    const p = Number(k + 1n);
    const expectedMersenne = (1n << BigInt(p)) - 1n;
    if (temp !== expectedMersenne) return false;

    if (p < 2) return false;
    for (let i = 2; i * i <= p; i++) {
        if (p % i === 0) return false;
    }

    if (p === 2) return true;
    let s = 4n;
    for (let i = 0; i < p - 2; i++) {
        s = (s * s - 2n) % temp;
    }
    return s === 0n;
};

export const getPerfect = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 1) return [];

    const result = [];
    let p = 2;

    const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) return false;
        }
        return true;
    };

    while (result.length < resolvedCount) {
        if (isPrime(p)) {
            const Mp = (1n << BigInt(p)) - 1n;
            let isMersenne = false;

            if (p === 2) {
                isMersenne = true;
            } else {
                let s = 4n;
                for (let i = 0; i < p - 2; i++) {
                    s = (s * s - 2n) % Mp;
                }
                if (s === 0n) isMersenne = true;
            }

            if (isMersenne) {
                const perfect = (1n << BigInt(p - 1)) * Mp;
                result.push(perfect.toString());
            }
        }
        p++;
    }

    return sortByLengthAndValue(result.slice(0, resolvedCount));
};