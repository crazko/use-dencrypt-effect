import { useEffect, useState } from "react";

const getRandomChar = (chars: string[]) =>
  chars[Math.floor(Math.random() * chars.length)];

const getChar = (
  i: number,
  j: number,
  maxLength: number,
  oldValue: string,
  newValue: string,
  chars: string[]
) => {
  if (j > i) {
    return oldValue[j];
  }

  if (i >= maxLength && j < i - maxLength) {
    return newValue[j];
  }

  return getRandomChar(chars);
};

const defaultOptions = {
  chars: [
    "-",
    ".",
    "/",
    "^",
    "*",
    "!",
    "}",
    "<",
    "~",
    "$",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ],
  interval: 50
};

export const useDencrypt = (options?: Partial<typeof defaultOptions>) => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const { chars, interval } = { ...defaultOptions, ...options };

  useEffect(() => {
    let i = 0;

    const crypting = setInterval(() => {
      setResult(oldValue => {
        if (oldValue === value) {
          clearInterval(crypting);

          return value;
        }

        const oldLength = oldValue ? oldValue.length : 0;
        const newLength = value.length;
        const maxLength = Math.max(oldLength, newLength);

        return [...new Array(maxLength)]
          .map((_, j) => getChar(i, j, maxLength, oldValue, value, chars))
          .join("");
      });

      i++;
    }, interval);

    return () => clearInterval(crypting);
  }, [value, chars, interval]);

  return {
    result,
    dencrypt: setValue
  };
};

export default useDencrypt;
