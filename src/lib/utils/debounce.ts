const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
): F => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return ((...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  }) as F;
};

export default debounce;
