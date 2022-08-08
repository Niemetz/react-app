export const waitFor = async <T>(

  predicate: () => T | Promise<T>,
  options?: { timeout?: number; wait?: number },

): Promise<T> => {
  const { timeout = 10000, wait = 1000 } = options || {};
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const startDate = new Date();
  let counter = 0;
  //const result = await predicate();

  while (new Date().getTime() - startDate.getTime() < timeout) {
    const result = await predicate();
    if (result) return result;
    await sleep(wait);
    console.log(`>> ATTEMPT(${++counter}): Element WAS NOT FOUND in the current DOM. Will try again after ${wait}ms`)
    }
  throw new Error(`Pageobject element locator WAS NOT FOUND in the DOM after 10 wait attempts of 1000ms interval.`);

};
