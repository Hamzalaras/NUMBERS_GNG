# Specialized Number Theory Utilities

A high-performance, mathematically optimized JavaScript utility package to validate and generate various special types of numbers (e.g., Perfect, Automorphic, Kaprekar, Narcissistic numbers, etc.).

Unlike naive implementations that rely on brute-force $O(N)$ or $O(N\sqrt{N})$ loops, this library leverages advanced number theory principles—such as **Hensel's Lemma**, the **Lucas-Lehmer test**, **Extended Euclidean Algorithm**, and **Smallest Prime Factor (SPF) Sieves**—to achieve optimal, sub-linear execution times.

## Installation

```bash
npm install numbers_gng
```

## Usage

This package supports both Named Exports (highly recommended for tree-shaking to keep your bundle small) and Namespace Objects.

### Option 1: Namespace Objects (Grouped)

```javascript
import { Abundant, Perfect, Automorphic } from 'numbers_gng';

// Validation (Expects a Number, String, or BigInt -> Returns Boolean)
console.log(Abundant.is(12));      // true
console.log(Perfect.is(28));       // true

// Generation (Expects a Count -> Returns an Array of Strings)
console.log(Automorphic.get(5));  // ['0', '1', '5', '6', '25']
```

### Option 2: Direct Named Exports (Optimal for Tree-Shaking)

```javascript
import { isNarcissistic, getNarcissistic, isHappy } from 'numbers_gng';

console.log(isHappy(19)); // true
console.log(getNarcissistic(4)); // Returns first 4 Narcissistic numbers
```

## API & Algorithms Reference

Every number type exports two primary functions:

- **`is[Type](number)`**: Validates if the given input is a valid number of that type. Returns a boolean. Supports large numbers via BigInt.
- **`get[Type](count)`**: Generates the first `count` numbers of that type. Returns an `Array<string>` containing the values.

Here is a brief breakdown of what to expect and the underlying algorithms used for optimal performance:

### 1. Abundant Numbers

**Definition:** A number whose proper divisors sum up to more than the number itself.

**Algorithm Used:** Uses a Harmonic Series Sieve (similar to the Sieve of Eratosthenes) to compute divisor sums. It utilizes the mathematically proven density limit (~24.8% for abundant numbers) to pre-calculate the exact array size, resolving the request in a single pass without throwing away allocation memory.

### 2. Deficient Numbers

**Definition:** A number whose proper divisors sum up to less than the number itself.

**Algorithm Used:** Uses a Harmonic Series Sieve (similar to the Sieve of Eratosthenes) to compute divisor sums. It utilizes the mathematically proven density limit (~75.2% for deficient numbers) to pre-calculate the exact array size, resolving the request in a single pass without throwing away allocation memory.

### 3. Automorphic Numbers

**Definition:** A number whose square ends in the same digits as the number itself (e.g., $25^2 = 625$).

**Algorithm Used:** Bypasses string processing completely during generation. It utilizes Modular Lifting (Hensel's Lemma) to solve the congruence $3n^2 - 2n^3 \pmod{10^k}$, jumping directly from one valid digit length to the next in $\mathcal{O}(\log N)$ time.

### 4. Happy Numbers

**Definition:** A number which eventually reaches 1 when replaced by the sum of the square of its digits repeatedly.

**Algorithm Used:** Validation implements Floyd's Cycle-Finding Algorithm (Tortoise and Hare) using $\mathcal{O}(1)$ auxiliary space. Generation uses a hardcoded low-bound threshold cache up to 2000, as all larger numbers mathematically collapse into this range within a few steps.

### 5. Harshad Numbers

**Definition:** An integer that is divisible by the sum of its digits (e.g., $18 / (1+8) = 2$).

**Algorithm Used:** Generation circumvents expensive string allocations inside tight loops by maintaining a native integer tracking register that computes digit sums incrementally via `currentNum % 10 === 0`.

### 6. Kaprekar Numbers

**Definition:** A positive integer with a web-property where if you square it, the split halves of the string representation sum back up to the original number (e.g., $45^2 = 2025 \rightarrow 20 + 25 = 45$).

**Algorithm Used:** Rather than squaring every integer sequentially, it mathematically computes factors of $10^k - 1$ using prime factorization and applies the Extended Euclidean Algorithm to find modular inverse pairs.

### 7. Narcissistic Numbers (Armstrong Numbers)

**Definition:** A number that is the sum of its own digits each raised to the power of the number of digits (e.g., $153 = 1^3 + 5^3 + 3^3$).

**Algorithm Used:** Implements D.G. Radcliffe's algorithm of Combinations with Repetitions. Instead of testing integers sequentially up to $10^{39}$, it tests combinations of digit frequencies, decreasing search space sizes from billions to fractions of a second.

### 8. Palindromic Numbers

**Definition:** Numbers that read the same backwards and forwards (e.g., $12321$).

**Algorithm Used:** Uses a direct Root-Half Construction Matrix. It dynamically generates only the left mathematical root of the palindrome and mirrors it onto itself, resulting in an exact $\mathcal{O}(1)$ time complexity per generated palindrome.

### 9. Perfect Numbers

**Definition:** A positive integer that is equal to the sum of its positive proper divisors (e.g., $6 = 1 + 2 + 3$).

**Algorithm Used:** Strictly implements the Euclid-Euler Theorem along with the Lucas-Lehmer Test for Mersenne Primes ($M_p = 2^p - 1$). It evaluates whether a Mersenne number is prime and translates it directly into an even perfect number instantly.

### 10. Smith Numbers

**Definition:** A composite number for which the sum of its digits is equal to the sum of the digits of its prime factors.

**Algorithm Used:** Employs a pre-computed Smallest Prime Factor (SPF) Sieve via a modified Sieve of Eratosthenes. This upgrades factorization lookups from standard $\mathcal{O}(\sqrt{N})$ trial division loops into blazing fast $\mathcal{O}(\log N)$ operations.

## License

MIT