import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';
import './css/CourseMain.css';
import Loader from '../Common/Loader.js';
import CourseCard from './CourseCard.js';
import CourseLoader from './CourseLoader.js';
import CourseFilter from './CourseFilter.js';
import {Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
			showAlert:false,
			filters:{},
		}
		this.handleLogout = this.handleLogout.bind(this);
		this.generateCourses = this.generateCourses.bind(this);
		this.toggleAlert = this.toggleAlert.bind(this);
		this.setCourseLoading = this.setCourseLoading.bind(this);

	}

	componentDidMount() {
		if(Api.isAuthenticated()) {
			document.body.style.backgroundColor = "white";
			Promise.resolve(Api.getUser()).then(response=> {

				const onSuccess = filters => {
					console.log(filters)
					this.setState({
						filters:filters.data
					})
				}
				const onError = err=> {
					console.log(err);
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
		this.setState({
			user:data[0],
			showAlert:true,
			alertMessage: "You successfully added " + data[1],
			courseLoading:false,
		})
	}

	handleCourseRemove = data => {
		this.setState({
			user:data[0],
			showAlert:true,
			alertMessage: "You successfully removed " + data[1],
			courseLoading:false,
		})
	}

	toggleAlert() {
		this.setState({
			showAlert: !this.state.showAlert,
		})
	}

	setCourseLoading() {
		this.setState({
			courseLoading:true,
		})
	}

  render() {
  	let {loading,courseList,user,showAlert,alertMessage,courseLoading,filters} = this.state;
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
          		<a href="" className="badge1" data-badge={user.userprofile.courses.length}>
          		<Link to="/home" className="btn btn-default my-courses-btn"><b>Checkout</b></Link>
				</a>
          	</ul>
		    <ul className="nav navbar-nav navbar-right">
	       		<button onClick={this.handleLogout} className="btn btn-danger">Logout</button>
          	</ul>
		  </div>
		</nav>

		{showAlert ?
		<Alert bsStyle="success" style={{textAlign:"center"}} onDismiss={this.toggleAlert}>
		  {alertMessage}
		</Alert>
		:
		<div>
		</div>
		}

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
