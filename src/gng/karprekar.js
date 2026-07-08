import { getPrimeFactors } from '../utils/primeFactors.js';

export const isKarprekar = (number) => {
    if (number == null || number === '') return false;
    const bigNumber = BigInt(number);
    if (bigNumber < 0n) return false;
    const bigNumberLength = bigNumber.toString().length;
    const squareStr = (bigNumber * bigNumber).toString();
    const rightHalf = squareStr.slice(-bigNumberLength);
    const leftHalf = squareStr.slice(0, squareStr.length - rightHalf.length) || '0';

    const bigRightHalf = BigInt(rightHalf)
    if (bigRightHalf && bigRightHalf + BigInt(leftHalf) == bigNumber) return true;
    return false;
};


const getDivisorPairs = (M) => {
    const primeFactors = getPrimeFactors(M);
    const primePowers = [...primeFactors.entries()].map(([p, power]) => p ** power);
    const pairs = [];
    
    const generate = (index, currentA) => {
        if (index === primePowers.length) {
            let currentB = M / currentA;
            if (currentA * currentA <= M) {
                pairs.push({ a: currentA, b: currentB });
            }
            return;
        }
        generate(index + 1, currentA * primePowers[index]);
        generate(index + 1, currentA);
    };
    
    generate(0, 1n);
    return pairs;
};

const extendedGCD = (a, b) => {
    let old_r = BigInt(a), r = BigInt(b);
    let old_s = 1n, s = 0n;
    let old_t = 0n, t = 1n;
    
    while (r !== 0n) {
        let quotient = old_r / r;
        [old_r, r] = [r, old_r - quotient * r];
        [old_s, s] = [s, old_s - quotient * s];
        [old_t, t] = [t, old_t - quotient * t];
    }
    return { gcd: old_r, x: old_s, y: old_t };
};

const generateKarprekarNumbers = (k) => {
    const M = 10n ** BigInt(k) - 1n;
    const karprekarNumbers = new Set();
    
    const pairs = getDivisorPairs(M);

    for (const { a, b } of pairs) {
        let { gcd, x } = extendedGCD(a, b);
        if (gcd === 1n) {
            let n1 = (a * x) % M;
            if (n1 < 0n) n1 += M;
            
            let n2 = M - n1 + 1n;
            
            if (n1 > 1n && n1 < M) karprekarNumbers.add(n1);
            if (n2 > 1n && n2 < M) karprekarNumbers.add(n2);
        }
    }
    return karprekarNumbers;
};

export const getKarprekar = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 0) return [];

    const result = new Set([0n, 1n]); 

    let k = 1;
    while (result.size < resolvedCount) {
        for (const karprekar of generateKarprekarNumbers(k++)) {
            result.add(karprekar);
        }
    }

    return [...result]
        .sort((x, y) => (x < y ? -1 : x > y ? 1 : 0))
        .slice(0, resolvedCount)
        .map(n => n.toString());
};