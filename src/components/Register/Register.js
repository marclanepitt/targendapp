import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import { Link } from 'react-router-dom'
import {FormGroup, FormControl,HelpBlock} from 'react-bootstrap'

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
			firstErrorMessage:"",
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		e.preventDefault();
		
		const onSuccess = response => {
			this.props.history.push('/courses');
		}
		const onError = err => {
		     for(let i = 0; i < err.response.data.length; i++) {
		     	
		     }
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


  render() {
  	let {firstErrorMessage} = this.state;
    return (
      <div>
		<div className="container">
		  
		  <div className="row" id="pwd-container">
		    <div className="col-md-4"></div>
		    
		    <div className="col-md-4">
		      <section className="login-form">
		        <form  onSubmit={this.handleSubmit}>
		          <h2 className="login-title">Targenda</h2>

				<FormGroup
		          controlId="formBasicText"
		        >
		          <FormControl
		            type="text"
		            placeholder="First Name"
		            onChange={e=>this.handleInputChange(e,"first_name")}
		          />
		          <FormControl.Feedback />
		          {firstErrorMessage !== "" ?
		          <HelpBlock>{firstErrorMessage}</HelpBlock>
		          :
		          <div/>
		      		}
		        </FormGroup>
		        <FormGroup
		          controlId="formBasicText"
		        >
		          <FormControl
		            type="text"
		            placeholder="Last Name"
		            onChange={e=>this.handleInputChange(e,"last_name")}
		          />
		          <FormControl.Feedback />
		          <HelpBlock></HelpBlock>
		        </FormGroup>
		        
		        <FormGroup
		          controlId="formBasicText"
		        >
		          <FormControl
		            type="text"
		            placeholder="Major"
		            onChange={e=>this.handleInputChange(e,"major")}
		          />
		          <FormControl.Feedback />
		          <HelpBlock></HelpBlock>
		        </FormGroup>

		        <FormGroup
		          controlId="formBasicText"
		        >
		          <FormControl
		            type="date"
		            placeholder="Graduation Year"
		            onChange={e=>this.handleInputChange(e,'graduation_year')}
		          />
		          <FormControl.Feedback />
		          <HelpBlock></HelpBlock>
		        </FormGroup>

		        <FormGroup
		          controlId="formBasicText"
		        >
		          <FormControl
		            type="text"
		            placeholder="UNC Heelmail"
		            onChange={e=>this.handleInputChange(e,"email")}
		          />
		          <FormControl.Feedback />
		          <HelpBlock></HelpBlock>
		        </FormGroup>


		        <FormGroup
		          controlId="formBasicText"
		        >
		          <FormControl
		            type="password"
		            placeholder="Password"
		            onChange={e=>this.handleInputChange(e,"password1")}
		          />
		          <FormControl.Feedback />
		          <HelpBlock></HelpBlock>
		        </FormGroup>


		        <FormGroup
		          controlId="formBasicText"
		        >
		          <FormControl
		            type="password"
		            placeholder="Confirm Password"
		            onChange={e=>this.handleInputChange(e,"password2")}
		          />
		          <FormControl.Feedback />
		          <HelpBlock></HelpBlock>
		        </FormGroup>	          
		          
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
