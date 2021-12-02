export const retryAxiosRequest =
  (func: () => void, stop: boolean = false, delay: number = 5000) =>
    !stop ? window.setTimeout(func, delay): -1;
