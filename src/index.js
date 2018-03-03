
//React
import React from "react";
import ReactDOM from "react-dom";
import {Route,BrowserRouter,Switch } from "react-router-dom";
import registerServiceWorker from "./js/registerServiceWorker";

//Components
import App from "./components/App/App";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CourseMain from "./components/CourseSelect/CourseMain";
import UserMain from "./components/UserHome/UserMain";
import NotFound from "./components/Common/NotFound";


//External Css
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";


ReactDOM.render((
  <BrowserRouter>
  		<Switch>
			<Route exact path='/' component={App}/>
			<Route path='/login' component={Login}/>
			<Route path='/register' component={Register}/>
			<Route path='/courses' component = {CourseMain}/>
			<Route path='/home' component = {UserMain}/>
			<Route path="*" component={NotFound} />
		</Switch>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
