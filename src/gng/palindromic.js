
export const isPalindromic = (number) => {
    if (number == null || number === '') return false;
    const resolvedNumber = BigInt(number);
    if (resolvedNumber < 0n) return false;

    const numStr = resolvedNumber.toString();
    const reversed = numStr.split('').reverse().join('');
    
    return numStr === reversed;
};

export const getPalindromic = (count) => {
    const resolvedCount = Number(count);
    if (!resolvedCount || resolvedCount < 0) return [];

    const palindromes = [];
    let rootLength = 1;

    while (palindromes.length < resolvedCount) {
        const start = Math.pow(10, rootLength - 1);
        const end = Math.pow(10, rootLength) - 1;

        for (let i = start; i <= end; i++) {
            const s = i.toString();
            let rev = '';
            for (let j = s.length - 2; j >= 0; j--) {
                rev += s[j];
            }
            palindromes.push(s + rev);
            if (palindromes.length === resolvedCount) return palindromes;
        }

        for (let i = start; i <= end; i++) {
            const s = i.toString();
            let rev = '';
            for (let j = s.length - 1; j >= 0; j--) rev += s[j];
            palindromes.push(s + rev);
            if (palindromes.length === resolvedCount) return palindromes;
        }

        rootLength++;
    }

    return palindromes;
};