import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import './css/CourseMain.css';
import Loader from '../Common/Loader.js';
import CourseCard from './CourseCard.js';


const Api = ApiInstance.instance;

class CourseMain extends Component {

	constructor(props) {
		super(props);
		this.state= {
			user: {},
			loading:true,
		}
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		if(Api.isAuthenticated()) {
			document.body.style.backgroundColor = "white";
			Promise.resolve(Api.user).then(response=> {
				this.setState({
					loading:false,
					user:response,
				});
			});
		} else {
			this.props.history.push("/login");
		}

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
  	let {user,loading} = this.state;
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
		    <ul className="nav navbar-nav navbar-right">
	       		<button onClick={this.handleLogout} className="btn btn-danger">Logout</button>
          	</ul>
		  </div>
		</nav>
		<div className = "course-card-container">
	        <div className="row course-card-inner">
		        <CourseCard/>
		        <CourseCard/>
		        <CourseCard/>
		        <CourseCard/>
	        </div>
        </div>

	    </div>
    	}
      </div>
    );
  }
}

export default CourseMain;
