import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import {Link} from "react-router-dom";
import UserActionPanel from "./UserActionPanel.js";
import Loader from "../Common/Loader.js";
import {Alert} from "react-bootstrap";

const Api = ApiInstance.instance;

class UserMain extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading:false,
			showAlert:false,
			alertMessage:"",
			alertType:"",
		}

		this.handleLogout = this.handleLogout.bind(this);
		this.handleCalRequest = this.handleCalRequest.bind(this);
		this.toggleAlert = this.toggleAlert.bind(this);
	}

	handleLogout(e) {
		e.preventDefault();
		this.setState({
			loading:true,
		});
		const onSuccess = response => {
			this.props.history.push('/login');
		}

		const onError = err => {
			console.log("Error Logging Out :(");
		}

		Api.logoutUser(onSuccess,onError);
	}

	handleCalRequest() {
		this.setState({
			loading:true
		});

		const onSuccess = response => {
			this.setState({
				loading:false,
				showAlert:true,
				alertMessage:"Congrats! We will email you your calendar in 1-2 business days.",
				alertType:"success"
			});
		}

		const onError = err => {
			this.setState({
				loading:false,
				showAlert:true,
				alertMessage:"Something went wrong in requesting your calendar",
				alertType:"danger"
			});
		}

		Api.calendarRequest(onSuccess,onError);
	}
	toggleAlert() {
		this.setState({
			showAlert: !this.state.showAlert,
		})
	}

  render() {
  	let {loading,showAlert,alertMessage,alertType} = this.state;
    return (
      <div>
      {loading ?
      	<Loader loading={loading}/>
      :
  		<div>
	  	<nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <a className="navbar-brand">
		        Targenda
		      </a>
		    </div>
		     <ul className="nav navbar-nav">
	       		<Link to="/courses" className="btn btn-default"><b>Add Courses</b></Link>
          	</ul>
		    <ul className="nav navbar-nav navbar-right">
	       		<button onClick={this.handleLogout} className="btn btn-danger">Logout</button>
          	</ul>
		  </div>
		</nav>

		{showAlert ?
		<Alert bsStyle={alertType} onDismiss={this.toggleAlert}>
		  {alertMessage}
		</Alert>
		:
		<div>
		</div>
		}
		<div className = "container">
			<div className = "row" style={{marginTop:'50px'}}>
				<UserActionPanel clickAction = {this.handleCalRequest} panelType ={"calendar"}/>
				<UserActionPanel panelType = {"notifications"}/>
			</div>
		</div>
		</div>
		}
       </div>
    );
  }
}

export default UserMain;
