import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./features/store";
import { productsApi } from "./features/apiSlice";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ApiProvider api={productsApi}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApiProvider>
  </Provider>
);
