import React from "react";
import ReactDOM from "react-dom";
import {Route,BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import registerServiceWorker from "./js/registerServiceWorker";
import "./css/index.css";

ReactDOM.render((
  <BrowserRouter>
		<Route path='/' component={App} />
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
