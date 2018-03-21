import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import logo_tp from "../../img/class-cal-tp.png";
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import "./css/MobileNav.css";

ReactGA.initialize('UA-115975493-1');
ReactGA.pageview("Landing Page");

class MobileNav extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showDropdown:false,
			dropdownIcon:"fa fa-bars"
		}

		this.getMenuItems = this.getMenuItems.bind(this);
	}

	getMenuItems() {
		if(this.props.type === "user") {
			return (
			<ul id ="mobile-menu-main" style={{marginTop:"3.3em"}}>
			<li><Link to="/courses"> Select Courses</Link></li>
			</ul>
	        )
		} else {
			return (
			<ul id ="mobile-menu-main">
			<li>
	      	{this.props.user.userprofile.courses.length > 0 ? 
	    		<Link to="/home" className="mobile-badge dropdown-badge" data-badge={this.props.user.userprofile.courses.length}>Checkout</Link>

	      		:
	      		<Link to="/home"> Checkout</Link>
	      	}
	      	</li>
	        <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSf_8Lzpl5omdBf4hMZo_ztQPHvxjDXUpPHlcFowsUeQxQ9MDA/viewform?usp=sf_link"> Don't see your class?</a></li>
	        </ul>
	        )
		}
	}

	toggleDropdown() {
		let icon = ""
		if(!this.state.showDropdown) {
			icon = "fa fa-times";
		} else {
			icon = "fa fa-bars";
		}
		this.setState({
			showDropdown:!this.state.showDropdown,
			dropdownIcon:icon
		})
	}
  render() {
    return (
	    <MediaQuery query="(max-device-width: 1224px)">
			<nav className="navbar navbar-default nav-actual" style={{backgroundColor:"#2B73AD"}}>
			  <div className="container-fluid">

			    <div className="navbar-header">
			      <a id="#top" onClick={this.animateAndScroll} >
			        <img style={{cursor:"pointer", maxWidth:"100px"}}  id="#top"  alt="Brand" className="brand-image" src={logo_tp}/>
			      </a>
			    </div>

			    <ul className="nav navbar-nav navbar-right " style={{display:"inline-block"}}>
			    	{this.props.user.userprofile.courses.length > 0 && this.props.type==="course" && this.state.dropdownIcon === "fa fa-bars" ? 
			        	<a className="mobile-badge" data-badge={this.props.user.userprofile.courses.length}><span style={{display:"none"}}>h</span></a>
						:
						<div/>
			    	}
			    	<i className={this.state.dropdownIcon} style={{fontSize:'25px',color:"white", cursor:"pointer"}} onClick={this.toggleDropdown.bind(this)}/>
	
			     </ul>
			     	{this.state.showDropdown ?
				      this.getMenuItems()
			    		:
			    		<div className="dd-placeholder">
			    		
			    		</div>
			    	}
			  </div>
			</nav>
	    </MediaQuery>
    );
  }
}

export default MobileNav;
