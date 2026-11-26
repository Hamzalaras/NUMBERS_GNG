import { isAbundant, getAbundant } from './gng/abundant.js';
import { getAutomorphic, isAutomorphic } from './gng/automorphic.js';
import { getDeficient, isDeficient } from './gng/deficient.js';
import { getHappy, isHappy } from './gng/happy.js';
import { getHarshad, isHarshad } from './gng/harshad.js';
import { getKarprekar, isKarprekar } from './gng/karprekar.js';
import { getNarcissistic, isNarcissistic } from './gng/narcissistic.js';
import { getPalindromic, isPalindromic } from './gng/palindromic.js';
import { getPerfect, isPerfect } from './gng/perfect.js';
import { getPowerful, isPowerful } from './gng/powerful.js';
import { getSmith, isSmith } from './gng/smith.js';


export const Abundant = {
    is: isAbundant,
    get: getAbundant,
};

export const Automorphic = {
    is: isAutomorphic,
    get: getAutomorphic,
};

export const Deficient = {
    is: isDeficient,
    get: getDeficient,
};

export const Happy = {
    is: isHappy,
    get: getHappy,
};

export const Harshad = {
    is: isHarshad,
    get: getHarshad,
};

export const Karprekar = {
    is: isKarprekar,
    get: getKarprekar,
};

export const Narcissistic = {
    is: isNarcissistic,
    get: getNarcissistic,
};

export const    Palindromic = {
    is: isPalindromic,
    get: getPalindromic,
};

export const Perfect = {
    is: isPerfect,
    get: getPerfect,
};

export const Smith = {
    is: isSmith,
    get: getSmith,
};

export const Powerful = {
    is: isPowerful,
    get: getPowerful,
};

export {
    isAbundant, getAbundant, isAutomorphic, getAutomorphic,
    isDeficient, getDeficient, isHappy, getHappy,
    isHarshad, getHarshad, isKarprekar, getKarprekar,
    isNarcissistic, getNarcissistic, isPalindromic, getPalindromic,
    isPerfect, getPerfect, isSmith, getSmith,
    isPowerful, getPowerful,
};