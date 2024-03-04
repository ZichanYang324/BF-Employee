import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/store.js";
import { ProfileIdProvider } from "./utils/ProfileIdContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProfileIdProvider>
        <App />
      </ProfileIdProvider>
    </Provider>
  </React.StrictMode>,
);
