import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import {Link} from "react-router-dom";
import UserActionPanel from "./UserActionPanel.js";
import CourseCardPreview from "./CourseCardPreview";
import Loader from "../Common/Loader.js";
import "./css/UserMain.css";
import logo from '../../img/classcalicon.jpg';
import {AlertList } from "react-bs-notifier";


const Api = ApiInstance.instance;

class UserMain extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading:true,
			alerts:[],
			alertMessage:"",
			alertType:"",
			courseList:[],
			user:{},
		}

		this.handleLogout = this.handleLogout.bind(this);
		this.handleCalRequest = this.handleCalRequest.bind(this);
		this.handleCancelRequest = this.handleCancelRequest.bind(this);
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
			const newAlert ={
				id: (new Date()).getTime(),
				type: "danger",
				headline: "Undone!",
				message: "Successfully cancelled your calendar request"
			};

			this.setState({
				user:response.data,
				loading:false,
				alerts: [...this.state.alerts, newAlert]

			});
		}

		const onError = err => {
			const newAlert ={
				id: (new Date()).getTime(),
				type: "warning",
				headline: "Uh oh!",
				message: "Something went wrong in cancelling your request"
			};

			this.setState({
				loading:false,
				alerts: [...this.state.alerts, newAlert]

			});
		}

		Api.calendarUndo(onSuccess,onError);
	}

	handleCalRequest() {
		this.setState({
			loading:true
		});

		const onSuccess = response => {
			const newAlert ={
				id: (new Date()).getTime(),
				type: "success",
				headline: "Woo Hoo!",
				message: "Thank you! We will get you your calendar ASAP"
			};

			this.setState({
				user:response.data,
				loading:false,
				alerts: [...this.state.alerts, newAlert]

			});
		}

		const onError = err => {
			const newAlert ={
				id: (new Date()).getTime(),
				type: "warning",
				headline: "Uh oh!",
				message: "Something went wrong in sending your request"
			};

			this.setState({
				loading:false,
				alerts: [...this.state.alerts, newAlert]

			});
		}

		Api.calendarRequest(onSuccess,onError);
	}	

	onAlertDismissed(alert) {
		const alerts = this.state.alerts;

		// find the index of the alert that was dismissed
		const idx = alerts.indexOf(alert);

		if (idx >= 0) {
			this.setState({
				// remove the alert from the array
				alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
			});
		}
	}

  render() {

  	let {loading,courseList,user} = this.state;
    return (
      <div className="overflow-hide">
      {loading ?
      	<Loader loading={loading}/>
      :
  		<div>
	  	<nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <a className="navbar-brand ">
		        <img alt="ClassCal" src={logo} className="nav-logo"/>
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

		<AlertList
			position="top-right"
			alerts={this.state.alerts}
			timeout={5000}
			onDismiss={this.onAlertDismissed.bind(this)}
		/>

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
