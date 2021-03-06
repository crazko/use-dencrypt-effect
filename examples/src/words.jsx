import React from "react";
import { useDencrypt } from "use-dencrypt-effect";

const values = ["useDencrypt", "Customizable", "React Hook", "Text Effect"];

export const Words = () => {
  const [result, setResult] = useDencrypt();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (setResult) {
      setTimeout(() => {
        setResult(values[value], () =>
          setValue((i) => (i === values.length - 1 ? 0 : i + 1))
        );
      }, 1000);
    }
  }, [value, setResult]);

  return <h1 style={{ fontFamily: "monospace" }}>{result}</h1>;
};
