export type Milliseconds = number;

export const MAX_REQUESTS = +process.env.MAX_REQUESTS ?? 60;
export const TIME_INTERVAL: Milliseconds = +process.env.TIME_INTERVAL ?? 60_000;
export const NB_REQUESTS = +process.env.NB_REQUESTS ?? 1_500;
export const REQ_MIN_DURATION: Milliseconds = +process.env.REQ_MIN_DURATION ?? 300;
export const REQ_MAX_DURATION: Milliseconds = +process.env.REQ_MAX_DURATION ?? 2_000;
