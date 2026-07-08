
export const isHarshad = (number) => {
    if (number == null || number === '') return false;
    const n = BigInt(number);
    if (n <= 0n) return false;

    const str = n.toString();
    let sum = 0n;
    for (let i = 0; i < str.length; i++) {
        sum += BigInt(str[i]);
    }

    return n % sum === 0n;
};

export const getHarshad = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 0) return [];

    const harshadNumbers = [];
    let currentNum = 1;
    let currentSum = 1;

    while (harshadNumbers.length < resolvedCount) {
        if (currentNum % currentSum === 0) {
            harshadNumbers.push(currentNum.toString());
        }

        currentNum++;
        
        if (currentNum % 10 === 0) {
            let temp = currentNum;
            currentSum = 0;
            while (temp > 0) {
                currentSum += temp % 10;
                temp = Math.floor(temp / 10);
            }
        } else {
            currentSum++;
        }
    }

    return harshadNumbers;
};