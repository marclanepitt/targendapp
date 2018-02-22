import React, { Component } from 'react';
import './css/Login.css';
import ApiInstance from '../../js/utils/Api.js';

const Api = ApiInstance.instance;

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password:"",
			loginError:false,
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
			this.setState({
				loginError:true
			})
		}

		const { email, password } = this.state;

        const data = {
            username:email,
            password
        };

		Api.loginUser(data,onSuccess,onError);
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

		          <input onChange = {e=>this.handleInputChange(e,"email")} type="email" name="email" placeholder="UNC Email"  className="form-control input-lg" />
		          
		          <input type="password" onChange={e=>this.handleInputChange(e,"password")} className="form-control input-lg" id="password" placeholder="Password" />
		          
		          
		          <div className="pwstrength_viewport_progress"></div>
		          
		          
		          <button type="submit" name="go" className="btn btn-lg btn-primary btn-block">Sign in</button>
		          <div>
		            <a>Create account</a> or <a>reset password</a>
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

export default Login;
