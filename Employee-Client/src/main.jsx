import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/store.js";
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>,
);
