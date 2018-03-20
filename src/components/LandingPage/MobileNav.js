import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import logo_tp from "../../img/class-cal-tp.png";
import ReactGA from 'react-ga';
import $ from 'jquery';
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
		this.pushToLogin = this.pushToLogin.bind(this);
	}

	pushToLogin() {
		this.props.loginPush();
		ReactGA.event({
			category:"CTA",
			action:"Went to login page",
		});
	}
	pushToRegister() {
		this.props.registerPush();
		ReactGA.event({
			category:"CTA",
			action:"Went to Register Page",
		});
	}
		handleScroll(e) {
      var header = $('#nav-bg');
      var range = 200;
      var scrollTop = $(e.target).scrollTop();
      let height = header.outerHeight();
      let offset = height / 1.1;
      let calc = ((scrollTop - offset + range) / range)-1;
	      header.css({ 'opacity': calc });
	      if (calc > '.9') {
	        header.css({ 'opacity': 1 });
	      } else if ( calc < '0' ) {
	        header.css({ 'opacity': 0 });
	      }
	}

	animateAndScroll(e) {
		if(e.target.id === "#top") {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);			
		} else {
			$('html, body').animate({
				scrollTop: $(e.target.id).offset().top
			}, 1000);
		}
		ReactGA.event({
			category:"Navigation",
			action:"Navigated to " + e.target.id,
		});
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
			<nav className="navbar navbar-default nav-actual">
			  <div className="container-fluid">

			    <div className="navbar-header">
			      <a id="#top" onClick={this.animateAndScroll} >
			        <img style={{cursor:"pointer", maxWidth:"180px"}}  id="#top"  alt="Brand" className="brand-image" src={logo_tp}/>
			      </a>
			    </div>

			    <ul className="nav navbar-nav navbar-right " style={{display:"inline-block"}}>
			    	<i className={this.state.dropdownIcon} style={{fontSize:'25px',color:"white", cursor:"pointer"}} onClick={this.toggleDropdown.bind(this)}/>
	
			     </ul>
			     {this.state.showDropdown ?
				      <ul id ="mobile-menu">
						<li><a id="#features" onClick={this.animateAndScroll}> Features</a></li>
				        <li><a id="#social-proof" onClick={this.animateAndScroll}> About</a></li>
				        <li><a id="#contact-us" onClick={this.animateAndScroll}> Contact Us</a></li>
				        <li><a  onClick={this.pushToLogin.bind(this)}>Login</a></li>
				      </ul>
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
