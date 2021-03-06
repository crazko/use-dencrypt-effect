import React from "react";
import { useDencrypt } from "use-dencrypt-effect";

export const Initial = () => {
  const [result, setResult] = useDencrypt("bukacaka", {
    chars: ["-"],
  });

  return (
    <div>
      <h1
        style={{ fontFamily: "monospace" }}
        onMouseOver={() => setResult("dencrypt")}
      >
        {result}
      </h1>
    </div>
  );
};
