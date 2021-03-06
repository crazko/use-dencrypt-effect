import React from "react";

type DencryptReturnType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

type DencryptInitialOptions = {
  initialValue?: string;
  callback: (value: string) => void;
};
type DencryptDefaultOptions = Partial<typeof defaultOptions>;

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
export function useDencrypt(
  options: DencryptDefaultOptions
): DencryptReturnType;
export function useDencrypt(
  initialValue: Required<DencryptInitialOptions["initialValue"]>
): DencryptReturnType;
export function useDencrypt(
  initialValue: Required<DencryptInitialOptions["initialValue"]>,
  options: DencryptDefaultOptions
): DencryptReturnType;
export function useDencrypt(
  v?: string | DencryptDefaultOptions,
  o?: DencryptDefaultOptions
) {
  let initialValue = "";
  let options: DencryptDefaultOptions = {};

  if (typeof v === "object") {
    options = v;
  } else if (typeof v === "string" && typeof o === "object") {
    initialValue = v;
    options = o;
  }

  const [result, setResult] = React.useState<string>();
  const [setValue, setSetValue] = React.useState<ReturnType<typeof dencrypt>>();

  React.useEffect(() => {
    const setValue = dencrypt({
      ...options,
      initialValue,
      callback: setResult,
    });

    setSetValue(() => setValue);
  }, []);

  return [result, setValue];
}

export default useDencrypt;

export const dencrypt = (
  options: DencryptInitialOptions & DencryptDefaultOptions
) => {
  const { chars, interval, callback, initialValue } = {
    ...defaultOptions,
    ...options,
  };

  let lastValue: string;
  let isCrypting: NodeJS.Timeout;

  if (initialValue) {
    lastValue = initialValue;
    callback(lastValue);
  }

  function* calculateValues(nextValue: string, prevValue = "") {
    const nextLength = nextValue.length;
    const prevLength = prevValue.length;
    const maxLength = Math.max(nextLength, prevLength);
    const iterations = 2 * maxLength;

    let i = 0;

    yield prevValue;

    while (i < iterations) {
      yield [...new Array(maxLength)]
        .map((_, j) => getChar(i, j, maxLength, prevValue, nextValue, chars))
        .join("");

      i++;
    }

    yield nextValue;
  }

  const setValue = (value: string, finished?: () => void) => {
    clearInterval(isCrypting);

    const values = calculateValues(value, lastValue);

    isCrypting = setInterval(() => {
      var next = values.next();

      if (next.done) {
        clearInterval(isCrypting);

        if (finished) {
          finished();
        }
      } else {
        lastValue = next.value;
        callback(lastValue);
      }
    }, interval);
  };

  return setValue;
};
