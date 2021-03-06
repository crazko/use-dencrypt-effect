import React from "react";
import { dencrypt } from "use-dencrypt-effect";

export const WithoutHook = () => {
  const element = React.useRef();
  const setValue = dencrypt({
    callback: (value) => {
      element.current.textContent = value;
    },
  });

  return (
    <>
      <p>
        Even though this example is using React, <code>dencrypt()</code>{" "}
        function can be used without it.
      </p>
      <p>
        <button onClick={() => setValue("new value")}>change value</button>:{" "}
        <strong ref={element}>value</strong>
      </p>
    </>
  );
};
