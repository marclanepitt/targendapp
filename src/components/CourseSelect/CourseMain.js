import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import './css/CourseMain.css';
import Loader from '../Common/Loader.js';
import CourseCard from './CourseCard.js';
import CourseLoader from './CourseLoader.js';
import CourseFilter from './CourseFilter.js';
import { Link } from 'react-router-dom';
import logo from "../../img/class-cal-tp.png";
import {AlertList } from "react-bs-notifier";
import MediaQuery from 'react-responsive';
import MobileNav from "../Common/MobileNav";

const Api = ApiInstance.instance;
let departmentFilter = null;
let numFilter = null;
let sectFilter = null;

class CourseMain extends Component {

	constructor(props) {
		super(props);
		this.state= {
			user: {},
			loading:true,
			courseLoading:true,
			courseList:[],
			departmentFilter:null,
			numFilter:null,
			sectFilter:null,
			alerts: [],
			filters:{},
			showFilters:false,
		}
		this.handleLogout = this.handleLogout.bind(this);
		this.generateCourses = this.generateCourses.bind(this);
		this.setCourseLoading = this.setCourseLoading.bind(this);
		this.pushToHome = this.pushToHome.bind(this);
		this.showFilters = this.showFilters.bind(this);
		document.getElementsByTagName('body')[0].style.overflowY = "scroll";

	}

	componentDidMount() {
		if(Api.isAuthenticated()) {
			document.body.style.backgroundColor = "white";
			Promise.resolve(Api.getUser()).then(response=> {
				if(!response.userprofile) {
					this.props.history.push("/login");
				}
				const onSuccess = filters => {
					this.setState({
						filters:filters.data
					})
				}
				const onError = err=> {
				}

				Api.getCourseFilters(onSuccess,onError)

				this.setState({
					loading:false,
					user:response,
				});
				this.generateCourses();
			});
		} else {
			this.props.history.push("/login");
		}

	}

	generateCourses() {
		const onSuccess = response => {
			this.setState({
				courseList:response.data,
				courseLoading:false,
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

	handleFilterChange = data =>{
		let semFilter;
		if(data[1] === "Department") {
			if(!data[0]) {
				departmentFilter = null;
			} else {
				departmentFilter = data[0].value;
			}
		} else if(data[1] === "Num") {
			if(!data[0]) {
				numFilter = null;
			} else {
				numFilter = data[0].value;
			}
		} else if(data[1] === "Sect") {
			if(!data[0]) {
				sectFilter = null;
			} else {
				sectFilter = data[0].value;			
			}
		} else if(data[1] === "Semester") {
			if(!data[0]) {
				semFilter = null;
			} else {
				semFilter = data[0].value;			
			}
		}

		const onSuccess = response => {
			this.setState({
				courseList:response.data,
			})
		}

		const onError = err => {

		}

		Api.getFilteredCourses(1,departmentFilter,numFilter,sectFilter,semFilter,onSuccess,onError);
	}

	handleCourseAdd = data => {
		const newAlert ={
			id: (new Date()).getTime(),
			type: "success",
			headline: "Success!",
			message: "You successfully added " + data[1],
		};

		this.setState({
			user:data[0],
			courseLoading:false,
			alerts: [...this.state.alerts, newAlert]

		})
	}

	handleCourseRemove = data => {
		const newAlert ={
			id: (new Date()).getTime(),
			type: "danger",
			headline: "Bye Bye!",
			message: "You successfully removed " + data[1],
		};

		this.setState({
			user:data[0],
			courseLoading:false,
			alerts: [...this.state.alerts, newAlert]

		})
	}

	setCourseLoading() {
		this.setState({
			courseLoading:true,
		})
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

	pushToHome() {
		this.props.history.push("/");
	}

	showFilters() {
		this.setState({
			showFilters:!this.state.showFilters,
		})
	}

  render() {
  	let {loading,courseList,user,courseLoading,filters} = this.state;
    return (
      <div className="overlow-hide">
      {loading ?
      	<Loader loading={loading}/>
      :
      	<div>
     <MediaQuery query="(min-device-width: 1224px)">
  		<nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <a className="navbar-brand">
		        <img alt="ClassCal" style={{cursor:"pointer"}} onClick={this.pushToHome} src={logo} className="nav-logo"/>
		      </a>
		    </div>
		     <ul className="nav navbar-nav">
          		<a href="" className="badge1" data-badge={user.userprofile.courses.length}>
          		<Link to="/home" className="btn btn-default my-courses-btn"><b>Checkout</b></Link>
				</a>
          	</ul>
		    <ul className="nav navbar-nav navbar-right">
	       		<button onClick={this.handleLogout} className="btn btn-danger">Logout</button>
          	</ul>
		  </div>
		</nav>
	    </MediaQuery>
	    <MobileNav user = {user} type={"course"} history={this.props.history}/>
		<AlertList
			position="top-right"
			alerts={this.state.alerts}
			timeout={2000}
			dismissTitle="Begone!"
			onDismiss={this.onAlertDismissed.bind(this)}
		/>
		<MediaQuery query="(max-device-width: 1224px)">
	     <br/>
	     <br/>
	     <br/>
	     </MediaQuery>
	   <MediaQuery query="(min-device-width: 1224px)">
		<div className = "row search-bar">
				<div className = "col col-lg-2">
					<CourseFilter onChange={this.handleFilterChange} options ={filters['department']} attribute = "Department" />
				</div>
				<div className = "col col-lg-1">
					<CourseFilter onChange={this.handleFilterChange} options ={filters['number']} attribute = "Num" />
				</div>
				<div className = "col col-lg-1">
					<CourseFilter onChange={this.handleFilterChange} options ={filters['section']} attribute = "Sect" />
				</div>
				<div className = "col col-lg-2">
					<CourseFilter onChange={this.handleFilterChange} options ={filters['semester']} placeholder= 'S18' attribute = "Semester" />
				</div>
				<div className = "col col-lg-4"/>

				<div className = "col col-lg-2" style={{marginTop:'8px'}}>
					<a href="https://docs.google.com/forms/d/e/1FAIpQLSeU_46a-F1EhVskyTyUzev6GBQQn9Sma3Oyx5VeSMIVr0bevQ/viewform?usp=sf_link">Don't see your class?</a>
				</div>
		</div>
		</MediaQuery>
		<MediaQuery query="(max-device-width: 1224px)">
		<div style={{width:"100%"}}>
			<div style={{textAlign:"center",cursor:"pointer"}} onClick={this.showFilters}>
			<i className="fa fa-sliders" style={{fontSize:"20px"}}/> <span style={{fontSize:"20px"}}>Filters</span> 
			&nbsp;
			{this.state.showFilters ? 
			<i className="fa fa-caret-up" style={{fontSize:"20px"}}/>
				:
			<i className="fa fa-caret-down" style={{fontSize:"20px"}}/>

			}
			</div>
		</div>
			{this.state.showFilters ? 
				<div>
				<div className = "row" >
					<div className="col col-lg-10">
					<CourseFilter onChange={this.handleFilterChange} options ={filters['department']} attribute = "Department" />
					</div>
				</div>
				<br/>
				<div className = "row">
					<div className="col col-lg-10">
					<CourseFilter onChange={this.handleFilterChange} options ={filters['number']} attribute = "Num" />
					</div>
				</div>
				<br/>
				<div className = "row">
				<div className="col col-lg-10">
					<CourseFilter onChange={this.handleFilterChange} options ={filters['section']} attribute = "Sect" />
				</div>
				</div>
				<br/>
				<div className = "row">
					<div className="col col-lg-10">
					<CourseFilter onChange={this.handleFilterChange} options ={filters['semester']} placeholder= 'S18' attribute = "Semester" />
					</div>
				</div>
				</div>
				:
				<div/>
			}
		</MediaQuery>
		<div className = "course-card-container">
		{courseLoading ?
      			<CourseLoader loading={courseLoading}/>
      		:
	        <div className="row course-card-inner">
				{courseList.map(course => {
				    return user.userprofile.courses.indexOf(course.id) !== -1 ?
				    	<CourseCard course={course} chosen = {true} setCourseLoading={this.setCourseLoading} handleCourseRemove = {this.handleCourseRemove}/>
				    	:
				    	<div/>
				})}
				{courseList.map(course => {
				    return user.userprofile.courses.indexOf(course.id) === -1 ?
						<CourseCard course={course} chosen = {false} setCourseLoading={this.setCourseLoading} handleCourseAdd = {this.handleCourseAdd}/>
				    	:
				    	<div/>

				})


			}        	
	        </div>
	    }
        </div>

	    </div>
    	}
      </div>
    );
  }
}

//test comment again on branch Trevor

export default CourseMain;
