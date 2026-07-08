
export const getPrimeFactors = (n) => {
    const factors = new Map();
    let d = 2n;
    let temp = n;

    while (temp % d === 0n) {
        factors.set(d, (factors.get(d) || 0n) + 1n);
        temp /= d;
    }

    d = 3n;
    while (d * d <= temp) {
        if (temp % d === 0n) {
            let count = 0n;
            while (temp % d === 0n) {
                count++;
                temp /= d;
            }
            factors.set(d, count);
        }
        d += 2n;
    }
    if (temp > 1n) {
        factors.set(temp, 1n);
    }
    return factors;
};