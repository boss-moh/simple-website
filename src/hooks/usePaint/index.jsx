import { useState } from "react";

export function usePaint(i, step, length) {
  const [index, setIndex] = useState(i);

  if (!length) {
    return { start: 0, total: 0 };
  }

  const next = index + step >= length ? length - 1 : index + step;
  const prev = index - step > 0 ? index - step : 0;

  const total = Math.ceil(length / step);

  const increment = () => setIndex(next);
  const decrement = () => setIndex(prev);

  return { index, total, increment, decrement };
}

export default usePaint;
