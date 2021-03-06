import React from "react";
import {
  dencrypt,
  DencryptInitialOptions,
  DencryptDefaultOptions,
} from "./dencrypt";

type DencryptReturnType = [string, ReturnType<typeof dencrypt>];

export function useDencrypt(): DencryptReturnType;
export function useDencrypt(
  initialValue: Required<DencryptInitialOptions["initialValue"]>
): DencryptReturnType;
export function useDencrypt(
  options: DencryptDefaultOptions
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
  } else if (typeof v === "string") {
    initialValue = v;
    options = o ?? {};
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

export { dencrypt };
