export const waitFor = async <T>(
  predicate: () => T | Promise<T>,
  options?: { timeout?: number; wait?: number }
): Promise<T> => {
  const { timeout = 10000, wait = 1000 } = options || {};
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const startDate = new Date();
  let counter = 0;
  const result = await predicate();

  while (new Date().getTime() - startDate.getTime() < timeout) {
    const result = await predicate();
    
    if (result) return result;

    await sleep(wait);
    console.log(`>> ATTEMPT(${++counter}): Element NOT FOUND in the current DOM. Will try again after ${wait}ms`)
  }
  
  //console.log("VALURE OF RESULT = " + result)
  return result;
  // throw new Error(
  // `Targeted Element Locator NOT FOUND:
  // 1 - Either it was NOT SPECIFIED in the current pageobject. 
  // 2 - Or it DOES NOT exist in the DOME.
  // Wait time of ${timeout}ms exceeded after ${counter} attempts.`);
};
