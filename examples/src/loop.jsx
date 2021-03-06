import React from "react";
import { useDencrypt } from "use-dencrypt-effect";

const values = ["useDencrypt", "Customizable", "React Hook", "Text Effect"];

export const Loop = () => {
  const [result, setResult] = useDencrypt();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const loop = async () => {
      await setResult(values[value]);
      setValue((i) => (i === values.length - 1 ? 0 : i + 1));
    };

    if (setResult) {
      setTimeout(loop, 1000);
    }
  }, [value, setResult]);

  return (
    <div
      style={{ fontFamily: "monospace", fontSize: "4rem", minHeight: "4rem" }}
    >
      {result}
    </div>
  );
};
