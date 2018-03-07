import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import {Link} from "react-router-dom";
import UserActionPanel from "./UserActionPanel.js";
import CourseCardPreview from "./CourseCardPreview";
import Loader from "../Common/Loader.js";
import {Alert} from "react-bootstrap";
import "./css/UserMain.css";

const Api = ApiInstance.instance;

class UserMain extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading:true,
			showAlert:false,
			alertMessage:"",
			alertType:"",
			courseList:[],
			user:{},
		}

		this.handleLogout = this.handleLogout.bind(this);
		this.handleCalRequest = this.handleCalRequest.bind(this);
		this.handleCancelRequest = this.handleCancelRequest.bind(this);
		this.toggleAlert = this.toggleAlert.bind(this);
		this.generateCourses = this.generateCourses.bind(this);
		document.getElementsByTagName('body')[0].style.overflowY = "hidden";

	}

	componentDidMount() {
		if(Api.isAuthenticated()) {
			document.body.style.backgroundColor = "white";
			Promise.resolve(Api.getUser()).then(response=> {
				this.setState({
					loading:false,
					user:response,
				});
			});
			this.generateCourses();
		} else {
			this.props.history.push("/login");
		}

	}

	generateCourses() {
		const onSuccess = response => {
			this.setState({
				courseList:response.data,
			});
		}

		const onError = err => {
			console.log("error loading courses");
		}

		Api.getCourses(1,onSuccess,onError);
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

	handleCancelRequest() {
		this.setState({
			loading:true
		});

		const onSuccess = response => {
			this.setState({
				loading:false,
				showAlert:true,
				alertMessage:"Successfully cancelled your calendar request",
				alertType:"success",
				user:response.data
			});
		}

		const onError = err => {
			this.setState({
				loading:false,
				showAlert:true,
				alertMessage:"Something went wrong in cancelling your calendar request",
				alertType:"danger"
			});
		}

		Api.calendarUndo(onSuccess,onError);
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
				alertType:"success",
				user:response.data,
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

  	let {loading,showAlert,alertMessage,alertType,courseList,user} = this.state;
    return (
      <div className="overflow-hide">
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
	       		<Link to="/courses" className="btn btn-default my-courses-btn"><b>My Courses</b></Link>
          	</ul>
		    <ul className="nav navbar-nav navbar-right">
	       		<button onClick={this.handleLogout} className="btn btn-danger">Logout</button>
          	</ul>
		  </div>
		</nav>

		{showAlert ?
		<Alert bsStyle={alertType} style={{textAlign:"center"}} onDismiss={this.toggleAlert}>
		  {alertMessage}
		</Alert>
		:
		<div>
		</div>
		}
		<div className = "container">
			<div className="row overflow-hide">
				<div className = "col col-lg-6">
					<div className = "course-cart-box">
					<div className="row course-cart-row">
					{user.userprofile.courses.length === 0 ?
						<div className="no-course-message" style={{display:"block",margin:"auto"}}>
							Add courses at the course select page
						</div>
						:

					courseList.map((course) =>
						user.userprofile.courses.indexOf(course.id) !== -1 ?
				    	<div className = "col col-sm-4" style={{marginLeft:'60px', marginTop:'20px'}}>
				    	<CourseCardPreview course={course}/>
				    	</div>
				    	:
				    	<div/>
					 )}
					</div>
					</div>
				</div>
				<div className = "col col-lg-6">
					<div className = "row" style={{marginTop:'20px'}}>
						<div className = "col col-lg-12">
							<UserActionPanel calRequest = {user.userprofile.cal_request} clickAction = {this.handleCalRequest} handleCancelRequest = {this.handleCancelRequest} panelType ={"calendar"}/>
						</div>
					</div>
					<div className = "row" style={{marginTop:'-130px'}}>
						<div className = "col col-lg-12">
							<UserActionPanel panelType = {"notifications"}/>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		}
       </div>
    );
  }
}

export default UserMain;
