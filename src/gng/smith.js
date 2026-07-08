const getSumOfDigits = (n) => {
    let sum = 0n;
    let number = BigInt(n);

    while (number > 0n) {
        sum += number % 10n;
        number /= 10n;
    }
    return sum;
};

const getPrimeFactors = (n) => {
    const factors = [];
    let temp = BigInt(n);
    let d = 2n;

    while (d * d <= temp) {
        while (temp % d === 0n) {
            factors.push(d);
            temp /= d;
        }
        d++;
    }

    if (temp > 1n) {
        factors.push(temp);
    }

    return factors;
};

const isPrime = (n) => {
    const number = BigInt(n);
    if (number < 2n) return false;
    if (number === 2n) return true;
    if (number % 2n === 0n) return false;

    let d = 3n;
    while (d * d <= number) {
        if (number % d === 0n) return false;
        d += 2n;
    }
    return true;
};

export const isSmith = (number) => {
    if (number == null || number === '') return false;
    const resolvedNumber = BigInt(number);
    if (resolvedNumber <= 1n) return false;

    if (isPrime(resolvedNumber.toString())) return false;

    const numberDigitSum = getSumOfDigits(resolvedNumber);

    const primeFactors = getPrimeFactors(resolvedNumber);
    let primeFactorsDigitSum = 0n;

    for (const factor of primeFactors) {
        primeFactorsDigitSum += getSumOfDigits(factor);
    }

    return numberDigitSum === primeFactorsDigitSum;
};

const getDigitSum = (num) => {
    let sum = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
};

export const getSmith = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 1) return [];


    const limit = Math.ceil(resolvedCount * 45) + 100;

    const spf = new Uint32Array(limit + 1);
    for (let i = 2; i <= limit; i++) spf[i] = i;

    for (let i = 2; i * i <= limit; i++) {
        if (spf[i] === i) {
            for (let j = i * i; j <= limit; j += i) {
                if (spf[j] === j) spf[j] = i;
            }
        }
    }

    const smithNumbers = [];

    for (let i = 4; i <= limit; i++) {
        if (spf[i] === i) continue;
        
        const targetSum = getDigitSum(i);
        let factorDigitSum = 0;
        let temp = i;
        

        while (temp > 1) {
            const primeFactor = spf[temp];
            factorDigitSum += getDigitSum(primeFactor);
            temp = Math.floor(temp / primeFactor);
        }
        
        if (targetSum === factorDigitSum) {
            smithNumbers.push(i.toString());
            if (smithNumbers.length === resolvedCount) break;
        }
    }
    
    return smithNumbers;
};