import React from "react";
import { useDencrypt } from "use-dencrypt-effect";

const value = "lorem ipsum";

export const CustomCharacters = () => {
  const [result, setResult] = useDencrypt(value, { chars: "\\/" });

  React.useEffect(() => {
    let run = true;

    const loop = async () => {
      while (run) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await setResult(value);
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
    <div style={{ fontFamily: "monospace", fontSize: "4rem" }}>{result}</div>
  );
};
