import { getPrimeFactors } from '../utils/primeFactors.js';

export const isDeficient = (number) => {
    if (number == null || number === '') return false;
    
    const bigNumber = BigInt(number);
    if (bigNumber < 1n) return false;
    if (bigNumber === 1n) return true; 

    const primeFactors = getPrimeFactors(bigNumber);
    let sigma = 1n;

    for (const [p, power] of primeFactors.entries()) {
        const prime = BigInt(p);
        const pow = BigInt(power);
        
        const numerator = (prime ** (pow + 1n)) - 1n;
        const denominator = prime - 1n;
        
        sigma *= (numerator / denominator);
    }

    return sigma < 2n * bigNumber;
};


export const getDeficient = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 0) return [];

    const limit = Math.ceil(resolvedCount * 1.4) + 10;
    const divisorSums = new Uint32Array(limit + 1);
    divisorSums.fill(1);
    divisorSums[0] = 0;
    divisorSums[1] = 0;

    const half = Math.floor(limit / 2);
    for (let i = 2; i <= half; i++) {
        for (let j = 2 * i; j <= limit; j += i) {
            divisorSums[j] += i;
        }
    }

    const deficientNumbers = [];
    for (let i = 1; i <= limit; i++) {
        if (divisorSums[i] < i) {
            deficientNumbers.push(i.toString());
            if (deficientNumbers.length === resolvedCount) {
                break;
            }
        }
    }

    return deficientNumbers;
};