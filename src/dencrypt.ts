export type DencryptInitialOptions = {
  initialValue?: string;
  callback: (value: string) => void;
};
export type DencryptDefaultOptions = Partial<typeof defaultOptions>;

const defaultOptions = {
  chars: "-./^*!}<~$012345abcdef",
  interval: 50,
};

const getRandomChar = (chars: string) =>
  chars[Math.floor(Math.random() * chars.length)];

const getChar = (
  i: number,
  j: number,
  maxLength: number,
  oldValue: string,
  newValue: string,
  chars: string
) => {
  if (j > i) {
    return oldValue[j];
  }

  if (i >= maxLength && j < i - maxLength) {
    return newValue[j];
  }

  return getRandomChar(chars);
};

export const dencrypt = (
  options: DencryptInitialOptions & DencryptDefaultOptions
) => {
  const { chars, interval, callback, initialValue } = {
    ...defaultOptions,
    ...options,
  };

  let lastValue: string;
  let isCrypting: ReturnType<typeof setInterval>;

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

  const setValue = (value: string) => {
    clearInterval(isCrypting);
    const values = calculateValues(value, lastValue);

    return new Promise<string>((resolve) => {
      isCrypting = setInterval(() => {
        var next = values.next();

        if (next.done) {
          clearInterval(isCrypting);
          resolve(lastValue);
        } else {
          lastValue = next.value;
          callback(lastValue);
        }
      }, interval);
    });
  };

  return setValue;
};
