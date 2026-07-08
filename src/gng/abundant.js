import { getPrimeFactors } from '../utils/primeFactors.js';

export const isAbundant = (number) => {
    if (number == null || number === '') return false;
    
    const bigNumber = BigInt(number);
    if (bigNumber < 12n) return false;

    const primeFactors = getPrimeFactors(bigNumber);
    let sigma = 1n;

    for (const [p, power] of primeFactors.entries()) {
        const prime = BigInt(p);
        const pow = BigInt(power);
        
        const numerator = (prime ** (pow + 1n)) - 1n;
        const denominator = prime - 1n;
        
        sigma *= (numerator / denominator);
    }

    return sigma > 2n * bigNumber;
};
export const getAbundant = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 1) return [];

    const limit = Math.ceil(resolvedCount * 4.2) + 20;

    const divisorSums = new Uint32Array(limit + 1);
    divisorSums.fill(1);
    divisorSums[0] = 0;
    divisorSums[1] = 0;

    const half = Math.floor(limit / 2);

    for (let i = 2; i <= half; i++) {
        for (let j = i * 2; j <= limit; j += i) {
            divisorSums[j] += i;
        }
    }

    const abundantNumbers = [];

    for (let i = 12; i <= limit; i++) {
        if (divisorSums[i] > i) {
            abundantNumbers.push(i.toString());
            if (abundantNumbers.length === resolvedCount) break;
        }
    }

    return abundantNumbers;
};