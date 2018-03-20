
//React
import React from "react";
import ReactDOM from "react-dom";
import {Route,BrowserRouter,Switch } from "react-router-dom";
import registerServiceWorker from "./js/registerServiceWorker";

//Components
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";
import CourseMain from "./components/CourseSelect/CourseMain";
import UserMain from "./components/UserHome/UserMain";
import NotFound from "./components/Common/NotFound";
import PasswordReset from "./components/Login/PasswordReset";
import PasswordResetConfirm from "./components/Login/PasswordResetConfirm";


//External Css
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

if (window.location.protocol !== 'https:')
{
 window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

ReactDOM.render((
  <BrowserRouter>
  		<Switch>
			<Route path='/login' component={Login}/>
			<Route exact path='/' component = {LandingPage}/>
			<Route path='/reset' component={PasswordReset}/>
			<Route path='/reset-confirm' component={PasswordResetConfirm}/>
			<Route path='/register' component={Register}/>
			<Route path='/courses' component = {CourseMain}/>
			<Route path='/home' component = {UserMain}/>
			<Route path="*" component={NotFound} />
		</Switch>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
