import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mainStore from "./app/stores/mainStore";
import {ModalConstructor} from "./app/components/modals/modalConstructor";
import { Provider } from 'mobx-react';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <Provider {...mainStore}>
          <BrowserRouter>
                  <App />
                  <ModalConstructor/>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
