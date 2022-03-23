import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { store } from "./store";
import { Provider } from "react-redux";
import routes, { renderRoutes } from "./routes";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer
    position="bottom-left"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme= 'dark'
    />
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
