import { useEffect, useState, Dispatch, SetStateAction } from "react";

type DencryptReturnType = {
  result: string;
  dencrypt: Dispatch<SetStateAction<string>>;
};

type DencryptOptions = Partial<typeof defaultOptions>;

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
    "f",
  ],
  interval: 50,
};

export function useDencrypt(): DencryptReturnType;
export function useDencrypt(options: DencryptOptions): DencryptReturnType;
export function useDencrypt(initialValue: string): DencryptReturnType;
export function useDencrypt(
  initialValue: string,
  options: DencryptOptions
): DencryptReturnType;
export function useDencrypt(
  v?: string | DencryptOptions,
  o?: DencryptOptions
): DencryptReturnType {
  let initialValue = "";
  let options;

  if (typeof v === "object") {
    options = v;
  } else if (typeof v === "string") {
    initialValue = v;
    options = o;
  }

  const [value, setValue] = useState(initialValue);
  const [result, setResult] = useState(initialValue);

  const { chars, interval } = { ...defaultOptions, ...options };

  useEffect(() => {
    let i = 0;

    const crypting = setInterval(() => {
      setResult((oldValue) => {
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
    dencrypt: setValue,
  };
}

export default useDencrypt;
