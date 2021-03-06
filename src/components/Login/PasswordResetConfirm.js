import React, { Component } from 'react';
import './css/Login.css';
import ApiInstance from '../../js/utils/Api.js';
import Loader from '../Common/Loader.js';
import queryString from "query-string";
import RegisterFormElement from "../Register/RegisterFormElement";
import logo from '../../img/classcalicon.jpg';
import {Alert} from 'react-bootstrap';


const Api = ApiInstance.instance;

class PasswordResetConfirm extends Component {

	constructor(props) {
		super(props);
		var parsed = queryString.parse(this.props.location.search);
		this.state = {
			new_password1:"",
			new_password2:"",
			loading:false,
			token:parsed.token,
			uid:parsed.uid,
			resetError:{},
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		e.preventDefault();

		this.setState({
			loading:true,
		})

		const onSuccess = response => {
			this.props.history.push('/login');
			this.setState({
				loading:false
			})
		}
		const onError = err => {
			this.setState({
				loading:false,
				resetError:err.response.data
			})
		}

		const { new_password1,new_password2,token,uid } = this.state;

        const data = {
        	new_password1,
            new_password2,
            token,
            uid
        };

		Api.confirmResetPassword(data,onSuccess,onError);
	}

	pushToHome() {
		this.props.history.push("/");
	}


  render() {
  	let {loading,resetError} = this.state;
    return (
      <div>
      	<Loader loading = {loading} />
		<div className="container">
		  
		  <div className="row" id="pwd-container">
		    <div className="col-md-4"></div>
		    
		    <div className="col-md-4">
		      <section className="login-form">
		        <form  onSubmit={this.handleSubmit}>
		          <img style={{cursor:"pointer"}} onClick={this.pushToHome} src={logo} alt="ClassCal" className="login-title"/>

		          {resetError['token'] || resetError['uid'] ?
		          	<Alert bsStyle="danger" style={{textAlign:"center", marginTop:'10px'}}>
		          		This link is expired.
		          	</Alert>
		           :
		           <div>
		           </div>

		          }
         		  <RegisterFormElement
	          		type="password"
	          		placeholder="New Password"
	          		handleInputChange = {this.handleInputChange}
	          		name = "new_password1"
	          		error = {resetError['new_password1']}
         		  />
         		  <RegisterFormElement
	          		type="password"
	          		placeholder="Confirm Password"
	          		handleInputChange = {this.handleInputChange}
	          		name = "new_password2"
	          		error = {resetError['new_password2']}
         		  />
		          
		          <div className="pwstrength_viewport_progress"></div>
		          
		          <div className="col-lg-11" style={{display:"block",margin:"auto"}}>
		          <button type="submit" name="go" className="btn btn-lg btn-primary btn-block" style={{backgroundColor:'#2B73AD'}}>Change Password</button>
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

export default PasswordResetConfirm;
