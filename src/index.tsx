import * as React from "react";
import * as ReactDOM from "react-dom";
import { DefaultTypelessProvider } from "typeless";
import "./index.css";
import App from "./main/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <DefaultTypelessProvider>
    <App />
  </DefaultTypelessProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
