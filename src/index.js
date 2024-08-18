import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Grommet } from "grommet";
import store from "./store";
import { Provider } from "react-redux";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Grommet theme={theme}>
        <App />
      </Grommet>
    </Provider>
  </React.StrictMode>
);
