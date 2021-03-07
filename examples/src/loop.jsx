import React from "react";
import { useDencrypt } from "use-dencrypt-effect";

const values = ["useDencrypt", "Customizable", "React Hook", "Text Effect", ""];

export const Loop = () => {
  const [result, setResult] = useDencrypt();

  React.useEffect(() => {
    let i = 0;
    let run = true;

    const loop = async () => {
      while (run) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await setResult(values[i]);

        i = i === values.length - 1 ? 0 : i + 1;
      }
    };

    if (setResult) {
      loop();
    }

    return () => {
      run = false;
    };
  }, [setResult]);

  return (
    <div
      style={{ fontFamily: "monospace", fontSize: "4rem", minHeight: "4rem" }}
    >
      {result}
    </div>
  );
};
