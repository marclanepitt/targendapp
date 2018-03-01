import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import {Link} from "react-router-dom";
import UserActionPanel from "./UserActionPanel.js";
import Loader from "../Common/Loader.js";

const Api = ApiInstance.instance;

class UserMain extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading:false,
		}

		this.handleLogout = this.handleLogout.bind(this);
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

  render() {
  	let {loading} = this.state;
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

		<div className = "container">
			<div className = "row" style={{marginTop:'50px'}}>
				<UserActionPanel panelType ={"calendar"}/>
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
