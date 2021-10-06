import {MAX_REQUESTS, Milliseconds, NB_REQUESTS, REQ_MAX_DURATION, REQ_MIN_DURATION, TIME_INTERVAL} from './constants';

const START_TIME = Date.now();
function log(...data: any[]): void {
  const now = Date.now();
  console.log(`[${now - START_TIME}]`, ...data);
}

/**
 * Generates a random number (min <= x < max)
 * @param min
 * @param max
 */
function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

let REQ_COUNTER = 1;

/**
 * Each call of this method will return an incremented counter after request duration.
 */
async function performRequest(): Promise<number> {
  const counter = REQ_COUNTER++;
  const duration = rand(REQ_MIN_DURATION, REQ_MAX_DURATION);
  log(`[${counter}] Starting request (${duration}ms duration)`);
  return new Promise<number>((resolve, reject) => setTimeout(() => {
    if (counter !== REQ_COUNTER - 1) {
      return reject(`Concurrency error (${counter} !== ${REQ_COUNTER - 1})`);
    }
    log(`[${counter}] Finished request`);
    resolve(counter);
  }, duration));
}

async function waitRateLimit(timestamps: Milliseconds[]) {
  if (timestamps.length < MAX_REQUESTS) {
    log(`No need to wait (${timestamps.length}/${MAX_REQUESTS})`);
    return;
  }
  do {
    const timestamp = timestamps.shift();
    const endTimestamp = timestamp + TIME_INTERVAL;
    const now = Date.now();
    if (endTimestamp > now) {
      log(`Waiting ${endTimestamp - now}ms before next request`);
      await delay(endTimestamp - now);
    }
  } while (timestamps.length >= MAX_REQUESTS);
}

async function delay(milliseconds: Milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main() {
  const timestamps: Milliseconds[] = [];
  for (let i = 0; i < NB_REQUESTS; i++) {
    await waitRateLimit(timestamps);
    timestamps.push(Date.now());
    await performRequest();
  }
}

main().catch(reason => {
  console.error(reason);
  process.exit(1);
});
