import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/store.js";
import { Toaster } from 'sonner';
import { ProfileIdProvider } from "./utils/ProfileIdContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProfileIdProvider>
        <App />
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            duration: 2000,
            closeButton: true,
          }}
        />
      </ProfileIdProvider>
    </Provider>
  </React.StrictMode>,
);
