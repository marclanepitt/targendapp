import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import { Link } from 'react-router-dom';
import "./css/Register.css";
import RegisterFormElement from './RegisterFormElement.js';
import Loader from "../Common/Loader.js";

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
			graduation_year:"",
			major:"",
			errors:{},
			successes:{},
			loading: false,
			dateHack:"text",
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.dateHackToggle = this.dateHackToggle.bind(this);
	}

	componentDidMount() {
		document.body.style.backgroundColor = "#4B9CD3";
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

		const { email, password1,password2,first_name,last_name,major,graduation_year } = this.state;

        const data = {
		    email,
		    password1,
		    password2,
		    first_name,
		    last_name,
		    major,
		    graduation_year,
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


  render() {
  	let {errors,dateHack,successes,loading} = this.state;
    return (
      <div>
      <Loader loading={loading}/>
		<div className="container">
		  
		  <div className="row" id="pwd-container">
		    <div className="col-md-3"></div>
		    
		    <div className="col-md-6">
		      <section className="login-form">
		        <form  onSubmit={this.handleSubmit}>
		          <h2 className="login-title">Targenda</h2>
		          <div className="col-md-8" style={{display:'block',margin:'auto'}}>
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
		          	<RegisterFormElement
		          		type={dateHack}
		          		placeholder="Graduation Date"
		          		handleInputChange = {this.handleInputChange}
		          		onFocus={this.dateHackToggle}
					    onBlur={this.dateHackToggle}
		          		name = "graduation_year"
		          		error = {errors['graduation_year']}
		          	/>
		          	<RegisterFormElement
		          		type="text"
		          		placeholder="Major"
		          		handleInputChange = {this.handleInputChange}
		          		name = "major"
		          		error = {errors['major']}
		          	/>
	  
		          <div className="pwstrength_viewport_progress"></div>
		          
		          
		          <button type="submit" name="go" className="btn btn-lg btn-primary btn-block">Register</button>
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
