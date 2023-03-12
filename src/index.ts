import React from "react";
import {
  dencrypt,
  DencryptInitialOptions,
  DencryptDefaultOptions,
} from "./dencrypt";

type DencryptReturnType = ReturnType<typeof dencrypt>;
type UseDencryptReturnType = [string, DencryptReturnType];

export function useDencrypt(): UseDencryptReturnType;
export function useDencrypt(
  initialValue: Required<DencryptInitialOptions["initialValue"]>
): UseDencryptReturnType;
export function useDencrypt(
  options: DencryptDefaultOptions
): UseDencryptReturnType;
export function useDencrypt(
  initialValue: Required<DencryptInitialOptions["initialValue"]>,
  options: DencryptDefaultOptions
): UseDencryptReturnType;
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
    options = o ? o : {};
  }

  const [result, setResult] = React.useState<string>();
  const [setValue, setSetValue] = React.useState(() =>
    dencrypt({
      ...options,
      initialValue,
      callback: setResult,
    })
  );

  return [result, setValue];
}

export { dencrypt };
