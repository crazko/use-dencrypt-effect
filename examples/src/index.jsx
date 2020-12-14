import React from "react";
import ReactDOM from "react-dom";

import { Words } from "./words";
import { Initial } from "./initial";

const App = () => (
  <div>
    <div>{/* <Words /> */}</div>
    <div>
      <Initial />
    </div>
  </div>
);

if (typeof window !== "undefined") {
  ReactDOM.render(<App />, document.getElementById("root"));
}
