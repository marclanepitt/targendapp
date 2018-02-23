import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import { Link } from 'react-router-dom'

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
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleErrors = this.handleErrors.bind(this);
	}

	componentDidMount() {
	}

	handleInputChange(e,field) {
        const { state } = this;
        state[field] = e.target.value;
        this.setState(state);
	}

	handleSubmit(e) {
		e.preventDefault();
		
		const onSuccess = response => {
			this.props.history.push('/courses');
		}
		const onError = err => {
			this.handleErrors(err.response.data);
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

	handleErrors(errors) {

	}

  render() {
  	let {loginError} = this.state;
    return (
      <div>
		<div className="container">
		  
		  <div className="row" id="pwd-container">
		    <div className="col-md-4"></div>
		    
		    <div className="col-md-4">
		      <section className="login-form">
		        <form  onSubmit={this.handleSubmit}>
		          <h2 className="login-title">Targenda</h2>

		          {loginError ?
		          	<div style={{color:"#d9534f"}}>
		          		Incorrect email or password
		          	</div>
		           :
		           <div>
		           </div>

		          }

			      <input onChange = {e=>this.handleInputChange(e,"first_name")} type="text" name="firstName" placeholder="First Name"  className="form-control input-lg" />
		      
		          <input onChange = {e=>this.handleInputChange(e,"last_name")} type="text" name="lastName" placeholder="Last Name"  className="form-control input-lg" />
		          
		          <input onChange = {e=>this.handleInputChange(e,"major")} type="text" name="email" placeholder="Major"  className="form-control input-lg" />

		          <input onChange = {e=>this.handleInputChange(e,"graduation_year")} type="date" name="graduationYear" placeholder="graduationYear" className="form-control input-lg" />
	          
		          <input onChange = {e=>this.handleInputChange(e,"email")} type="email" name="email" placeholder="UNC Email"  className="form-control input-lg" />
		          
		          <input type="password" onChange={e=>this.handleInputChange(e,"password1")} className="form-control input-lg" id="password" placeholder="Password" />

		          <input type="password" onChange={e=>this.handleInputChange(e,"password2")} className="form-control input-lg" id="password2" placeholder="Confirm Password" />		          
		          
		          <div className="pwstrength_viewport_progress"></div>
		          
		          
		          <button type="submit" name="go" className="btn btn-lg btn-primary btn-block">Register</button>
		          <div>
		            Already have an account? <Link to="/login">Login</Link>
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
