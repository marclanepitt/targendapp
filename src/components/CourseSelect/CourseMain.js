import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import './css/CourseMain.css';
import Loader from '../Common/Loader.js';
import CourseCard from './CourseCard.js';
import CourseLoader from './CourseLoader.js';
import CourseFilter from './CourseFilter.js';
import { Link } from 'react-router-dom';
import logo from '../../img/classcalicon.jpg';
import {AlertList } from "react-bs-notifier";

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
		}
		this.handleLogout = this.handleLogout.bind(this);
		this.generateCourses = this.generateCourses.bind(this);
		this.setCourseLoading = this.setCourseLoading.bind(this);
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

  render() {
  	let {loading,courseList,user,courseLoading,filters} = this.state;
    return (
      <div className="overlow-hide">
      {loading ?
      	<Loader loading={loading}/>
      :
      	<div>
  		<nav className="navbar navbar-default">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <a className="navbar-brand">
		        <img alt="ClassCal" src={logo} className="nav-logo"/>
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

		<AlertList
			position="top-right"
			alerts={this.state.alerts}
			timeout={2000}
			dismissTitle="Begone!"
			onDismiss={this.onAlertDismissed.bind(this)}
		/>

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
					<a href="https://docs.google.com/forms/d/e/1FAIpQLSf_8Lzpl5omdBf4hMZo_ztQPHvxjDXUpPHlcFowsUeQxQ9MDA/viewform?usp=sf_link">Don't see your class?</a>
				</div>
		</div>

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

export default CourseMain;
