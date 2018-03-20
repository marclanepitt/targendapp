import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import { Link } from 'react-router-dom';
import "./css/Register.css";
import RegisterFormElement from './RegisterFormElement.js';
import Loader from "../Common/Loader.js";
import logo from '../../img/classcalicon.jpg';
import screenshot from '../../img/app-screenshot.png';
import "html5-device-mockups/dist/device-mockups.min.css";
import MediaQuery from 'react-responsive';


const Api = ApiInstance.instance;

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password1:"",
			password2:"",
			first_name:"",
			last_name:"",
			errors:{},
			successes:{},
			loading: false,
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.dateHackToggle = this.dateHackToggle.bind(this);
		this.pushToHome = this.pushToHome.bind(this);
	}

	componentDidMount() {
		document.body.style.backgroundColor = "#2B73AD";
	}

	handleInputChange(e,field) {
        const { state } = this;
        state[field] = e.target.value;
        this.setState(state);
	}

	handleSubmit(e) {
		this.setState({
			loading:true,
		})
		e.preventDefault();
		
		const onSuccess = response => {
			this.setState({
				loading:false,
			})
			this.props.history.push('/courses');
		}
		const onError = err => {
			this.setState({
				errors:err.response.data,
				loading:false,
			})

		}

		const { email, password1,password2,first_name,last_name } = this.state;

        const data = {
		    email,
		    password1,
		    password2,
		    first_name,
		    last_name,
        };

		Api.registerUser(data,onSuccess,onError);
	}

	dateHackToggle() {
		if(this.state.dateHack === "text") {
			this.setState({
				dateHack:"date",
			});
		} else {
			this.setState({
				dateHack:"text",
			});
		}
	}

	pushToHome() {
		this.props.history.push("/");
	}


  render() {
  	let {errors,successes,loading} = this.state;
    return (
      <div>
      <Loader loading={loading}/>
		<div className="container">
		  <div className="row" id="pwd-container">
		  		<MediaQuery query="(min-device-width: 1224px)">
		    <div className="col-lg-7" style={{padding:'67px'}}>
		    	<div className="row">
		    	<div className="register-saying">
		    	Let's get organized, instantly!
		    	</div>
		    	<div className="register-subsaying">
		    	Pick<span className="subsaying-period">.</span> Request<span className="subsaying-period">.</span> Done<span className="subsaying-period">.</span>
		    	</div>
		    	</div>
		    	<div className="row">
		          <div className="device-wrapper">
					  <div className="device" data-device="iMac" data-orientation="portrait" data-color="black">
					    <div className="screen" style={{backgroundImage:"url("+screenshot+")"}}>
					    </div>
					  </div>
					</div>
				</div>
		    </div>
		    </MediaQuery>
		    
		    <div className="col-md-4">
		      <section className="login-form">
		        <form  onSubmit={this.handleSubmit}>
		          <img alt="ClassCal" style={{cursor:"pointer"}} onClick={this.pushToHome}  src={logo} className="login-title register-title"></img>
		          <div className="col-md-12" style={{display:'block',margin:'auto'}}>
		          	<RegisterFormElement
		          		type="text"
		          		placeholder="UNC Email"
		          		handleInputChange = {this.handleInputChange}
		          		name = "email"
		          		error = {errors['email']}
		          		success = {successes['email']}
		          	/>
		          	<RegisterFormElement
		          		type="password"
		          		placeholder="Password"
		          		handleInputChange = {this.handleInputChange}
		          		name = "password1"
		          		error = {errors['password1']}
		          	/>
		          	<RegisterFormElement
		          		type="password"
		          		placeholder="Confirm Password"
		          		handleInputChange = {this.handleInputChange}
		          		name = "password2"
		          		error = {errors['password2']}
		          	/>
		          	<RegisterFormElement
		          		type="text"
		          		placeholder="First Name"
		          		handleInputChange = {this.handleInputChange}
		          		name = "first_name"
		          		error = {errors['first_name']}
		          	/>
		          	<RegisterFormElement
		          		type="text"
		          		placeholder="Last Name"
		          		handleInputChange = {this.handleInputChange}
		          		name = "last_name"
		          		error = {errors['last_name']}
		          	/>
	  
		          <div className="pwstrength_viewport_progress"></div>
		          
		          <div className="col col-md-11" style={{left:"12px"}}>
		          <button type="submit" name="go" style={{backgroundColor:'#2B73AD'}}className="btn btn-lg btn-primary btn-block">Register</button>
		          </div>
		          <div>
		            Already have an account? <Link to="/login">Login</Link>
		          </div>
		          		          </div>

		          
		        </form>
		      </section>  
		      </div>
		      
		      <div className="col-md-4"></div>
		      

		  </div>
		</div>
       </div>
    );
  }
}

export default Register;
