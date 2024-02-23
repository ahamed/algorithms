import { runDijkstra, runSieveOfEratosthenes, runTrialDivision } from './prime-numbers';

const limit = 1_000_000;

console.time('trialStart');
runTrialDivision(limit);
console.timeEnd('trialStart');

console.time('sieveStart');
runSieveOfEratosthenes(limit);
console.timeEnd('sieveStart');

console.time('dijkstraStart');
runDijkstra(limit);
console.timeEnd('dijkstraStart');
