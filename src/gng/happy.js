
export const isHappy = (number) => {
    if (number == null || number === '') return false;
    let slow = BigInt(number);
    if (slow <= 0n) return false;
    
    const getNext = (n) => {
        let sum = 0n;
        while (n > 0n) {
            const digit = n % 10n;
            sum += digit * digit;
            n /= 10n;
        }
        return sum;
    };

    let fast = getNext(slow);
    while (fast !== 1n && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }

    return fast === 1n;
};

const happyCache = new Uint8Array(2000);
happyCache[1] = 1;
[4, 16, 37, 58, 89, 145, 42, 20].forEach(num => happyCache[num] = 2);

const getSumOfSquares = (num) => {
    let sum = 0;
    while (num > 0) {
        const digit = num % 10;
        sum += digit * digit;
        num = Math.floor(num / 10);
    }
    return sum;
};

const checkHappy = (n) => {
    let current = n;
    const track = new Set();

    while (current >= 2000 || happyCache[current] === 0) {
        if (current < 2000) {
            if (track.has(current)) break;
            track.add(current);
        }
        current = getSumOfSquares(current);
    }

    const isHappyResult = happyCache[current] === 1;
    const finalStatus = isHappyResult ? 1 : 2;

    track.forEach(num => happyCache[num] = finalStatus);

    return isHappyResult;
};

export const getHappy = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 0) return [];

    const happyNumbers = [];
    let currentNum = 1;

    while (happyNumbers.length < resolvedCount) {
        if (checkHappy(currentNum)) {
            happyNumbers.push(currentNum.toString());
        }
        currentNum++;
    }

    return happyNumbers;
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