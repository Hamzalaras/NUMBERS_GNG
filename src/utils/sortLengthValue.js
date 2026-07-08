export const sortByLengthAndValue = (array) => {
    return [...array].sort((a, b) => {
        const diff = a.length - b.length;
        if (diff !== 0) return diff;
        return BigInt(a) < BigInt(b) ? -1 : 1;
    });
};