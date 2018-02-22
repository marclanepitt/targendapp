import React from "react";
import ReactDOM from "react-dom";
import {Route,BrowserRouter,Switch } from "react-router-dom";
import App from "./components/App/App";
import Login from "./components/Login/Login";
import CourseMain from "./components/CourseSelect/CourseMain";
import registerServiceWorker from "./js/registerServiceWorker";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.css";


ReactDOM.render((
  <BrowserRouter>
  		<Switch>
			<Route exact path='/' component={App}/>
			<Route path='/login' component={Login}/>
			<Route path='/courses' component = {CourseMain}/>
		</Switch>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
