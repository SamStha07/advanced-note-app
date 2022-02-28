let timeoutID: any;

export const debounceFn = (fn: any, delay: number = 2000) => {
  return () => {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      fn();
    }, delay);
  };
};
