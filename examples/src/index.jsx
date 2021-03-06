import React from "react";
import ReactDOM from "react-dom";

import { InitialValue } from "./initial-value";
import { Loop } from "./loop";
import { WithoutHook } from "./without-hook";
import { CustomCharacters } from "./custom-characters";

const App = () => (
  <main>
    <h1>Examples</h1>
    <h2>Initial Value</h2>
    <InitialValue />

    <h2>Loop Through Values</h2>
    <Loop />

    <h2>Without Hook</h2>
    <WithoutHook />

    <h2>Custom Characters</h2>
    <CustomCharacters />
  </main>
);

if (typeof window !== "undefined") {
  ReactDOM.render(<App />, document.getElementById("root"));
}
