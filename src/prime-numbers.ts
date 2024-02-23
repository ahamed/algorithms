import Heap from 'heap-js';

export function runTrialDivision(total: number) {
  const primeNumbers = [2];
  const rangeUpperValue = total;

  for (let i = 3; i <= rangeUpperValue; i++) {
    const currentNumber = i;
    const sqrtOfCurrentNumber = Math.floor(Math.sqrt(currentNumber));

    for (const number of primeNumbers) {
      if (currentNumber % number === 0) {
        break;
      }

      if (number > sqrtOfCurrentNumber) {
        primeNumbers.push(currentNumber);
        break;
      }
    }
  }

  return primeNumbers;
}

export function runSieveOfEratosthenes(total: number) {
  const checkUntil = Math.floor(Math.sqrt(total));
  const reference: Record<number, boolean> = [];

  for (let number = 2; number <= total; number++) {
    reference[number] = true;
  }

  for (let number = 2; number <= checkUntil; number++) {
    const currentNumber = number;

    if (!reference[currentNumber]) {
      continue;
    }

    let factor = 2;

    while (currentNumber * factor <= total) {
      const multiple = currentNumber * factor;
      reference[multiple] = false;
      factor++;
    }
  }

  const primes: number[] = [];

  for (let number = 2; number <= total; number++) {
    if (reference[number]) {
      primes.push(number);
    }
  }

  return primes;
}

interface Pool {
  prime: number;
  square: number;
}

export function runDijkstra(total: number) {
  const primePool = new Heap<Pool>((first, second) => {
    return first.square - second.square;
  });

  primePool.push({ prime: 2, square: 4 });
  const primes = [2];

  for (let number = 3; number <= total; number++) {
    while (number > (primePool.peek() as Pool).square) {
      const { prime, square } = primePool.pop() as Pool;
      primePool.push({ prime, square: square + prime });
      continue;
    }

    const peek = primePool.peek() as Pool;

    if (number === peek.square) {
      primePool.pop();
      primePool.push({ prime: peek.prime, square: peek.prime + peek.square });
    } else {
      primes.push(number);
      primePool.push({ prime: number, square: number * number });
    }
  }

  return primes;
}
