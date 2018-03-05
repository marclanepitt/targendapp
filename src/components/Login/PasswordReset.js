import React, { Component } from 'react';
import './css/Login.css';
import ApiInstance from '../../js/utils/Api.js';
import Loader from '../Common/Loader.js';
import {Alert} from 'react-bootstrap';


const Api = ApiInstance.instance;

class PasswordReset extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			loading:false,
			loginError:false,
			showAlert:false,
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

		this.setState({
			loading:true,
		})

		const onSuccess = response => {
			console.log(response)
			// this.props.history.push('/login');
			this.setState({
				loading:false,
				showAlert:true
			})
		}
		const onError = err => {
			console.log(err)
			this.setState({
				loginError:true,
				loading:false,
			})
		}

		const { email } = this.state;

        const data = {
            email,
        };

		Api.resetPassword(data,onSuccess,onError);
	}

  render() {
  	let {loginError,loading,showAlert} = this.state;
    return (
      <div>
      	{showAlert ?
		<Alert bsStyle="success" style={{textAlign:"center"}}>
		  Success! You should recieve an email with further instructions shortly.
		</Alert>
		:
		<div>
		</div>
		}
      	<Loader loading = {loading} />
		<div className="container">
		  <div className="row" id="pwd-container">
		    <div className="col-md-4"></div>
		    
		    <div className="col-md-4">
		      <section className="login-form">
		        <form  onSubmit={this.handleSubmit}>
		          <h2 className="login-title">Targenda</h2>

		          {loginError ?
		          	<div style={{color:"#d9534f"}}>
		          		This email was not found in our system
		          	</div>
		           :
		           <div>
		           </div>

		          }

		          <input onChange = {e=>this.handleInputChange(e,"email")} type="email" name="email" placeholder="UNC Email"  className="form-control input-lg" />
		         		          
		          
		          <div className="pwstrength_viewport_progress"></div>
		          
		          
		          <button type="submit" name="go" className="btn btn-lg btn-primary btn-block">Reset Password</button>
		          
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

export default PasswordReset;
