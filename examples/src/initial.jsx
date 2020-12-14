import React from "react";
import { useDencrypt } from "use-dencrypt-effect";

export const Initial = () => {
  const { result, dencrypt } = useDencrypt("Roman");

  return (
    <h1
      onMouseOver={() => dencrypt("Roman ")}
      onMouseOut={() => dencrypt("Roman")}
    >
      {result}
    </h1>
  );
};
