import React from 'react';
import './css/grid.css';
import './css/landingPage.css';
import $ from 'jquery';
import screenshot from '../../img/app-screenshot.png';
import "html5-device-mockups/dist/device-mockups.min.css";
import SimpleLineIcon from 'react-simple-line-icons';
import logo_tp from "../../img/class-cal-tp.png";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-115975493-1');
ReactGA.pageview("Landing Page");

export default class LandingPage extends React.Component {
	constructor() {
		super();
		this.state = {
			content: [
			{
				id: 'features',
				title: 'Features',
				steps: [ 
					{
						img: 'calendar',
						title: 'Select',
						description: 'Choose all of your enrolled classes'
					},
					{
						img: "call-out",
						title: 'Request',
						description: 'Send us a request'
					},
					{
						img: "fire",
						title: 'Done',
						description: 'Get all of your assignments synced instantly'
					}
				]
			},
			]
		};
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

	renderSteps(i) {
		var steps = [];
		for (var j=0; j<3; j++) {
			var step = this.state.content[i].steps[j];
			steps.push((
			<div key={j} className="grid-item-1">
				<div className="grid">
					<div className="grid-row-item-row-center">
						<SimpleLineIcon size="Large" name={step.img} />
						<div className="title-description">{step.title}</div>
						<div className="description">{step.description}</div>
					</div>
				</div>
			</div>));
		}
		return steps;
	}

	renderHelpSections() {
		var sectionDivs = [];
		for (var i=0; i<this.state.content.length; i++) {
			var isEven = i % 2 === 0 ? true:false;
			sectionDivs.push((
				<div key={i} id={this.state.content[i].id} className={"grid-row-item-row section-header " + (isEven ? 'even': 'odd')}>
					<div className="grid-item subtitle">{this.state.content[i].title}</div>
					<div className="grid">
						<div className="grid-row-item-col">
							{this.renderSteps(i)}
						</div>
					</div>
				</div>
				)
			)
		}

		return (
			sectionDivs
		)
	}

	pushToLogin() {
		this.props.history.push("/login");
		ReactGA.event({
			category:"CTA",
			action:"Went to login page",
		});
	}
	pushToRegister() {
		this.props.history.push("/register");
		ReactGA.event({
			category:"CTA",
			action:"Went to Register Page",
		});
	}

	render() {
		return (
			<div>
			<div id='nav-bg'></div>

			<nav className="navbar navbar-default nav-actual">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <a id="#top" onClick={this.animateAndScroll} >
			        <img style={{cursor:"pointer"}}  id="#top"  alt="Brand" className="brand-image" src={logo_tp}/>
			      </a>
			    </div>
			    <ul className="nav navbar-nav navbar-right" style={{display:"inline-block"}}>
			        <li><a id="#features" onClick={this.animateAndScroll}> Features</a></li>
			        <li><a id="#social-proof" onClick={this.animateAndScroll}> About</a></li>
			        <li><a id="#contact-us" onClick={this.animateAndScroll}> Contact Us</a></li>
			        <li><a className="btn btn-sm nav-button" onClick={this.pushToLogin.bind(this)}>Login</a></li>
			     </ul>
			  </div>
			</nav>
			<div id="header" className="landing-page grid">
			<div className="js-odoo"></div>
				<div className="main-title-container">
					<div className="grid-row-item-row title-row">
						<div className="grid-item title">We. Organize. You.</div>
						<div className="grid-item slogan">Get to studying, we'll calendarize your assignments in an instant.</div>
					</div>
					<div className="row">
						<div className="col col-sm-6 button-wrap">
    						<a className='cta-button' onClick={this.pushToRegister.bind(this)}>Get Started</a>
						</div>
						<div className="col col-sm-6">
				          <div className="device-wrapper" style={{marginRight:'200px'}} id="landing-device">
							  <div className="device" data-device="iMac" data-orientation="portrait" data-color="black">
							    <div className="screen" style={{backgroundImage:"url("+screenshot+")"}}>
							    </div>
							  </div>
							</div>
						</div>
					</div>
				</div>
				{this.renderHelpSections()}
				<div id="social-proof" className="grid-row-item-row section-header odd">
					<div className="grid-item subtitle" style={{fontSize:"30px"}}>
					We all want to spend a little less time organizing...
					</div>
					<div className="row">
					<div className="quote-box">
						  <div className="quote-text">
						    <i className="fa fa-quote-left"> </i><span id="text">It's too time consuming to organize with online planners. It's time for syllabi to be automated.</span>
						  </div>

						  <div className="quote-author">

						    <span id="author"><b>Marc Pittinsky</b></span> via
						      &nbsp;<i className="fa fa-twitter"></i>

						  </div>
						</div>
					</div>
				</div>
				<div id="contact-us" className="grid-row-item-row section-header even">
					<div className="grid-item subtitle" style={{fontSize:"60px"}}>
					Contact Us
					</div>
					<div className="row" style={{fontSize:"20px"}}>
						Have any questions?  Any suggestions? Just want to say hello?
					</div>
					<div className="row" style={{margin:'20px'}}>
						<i className="fa fa-envelope"></i>
					</div>
					<div className="row" style={{fontSize:"20px"}}>
						Email us at support@classcal.com
					</div>
				</div>
				<div className="grid-row-item-col subfooter">
					<div className="grid-item"><a>Terms and Privacy</a></div>
				</div>
				<div className="grid-row-item-row footer">
					<div className="grid-item">All Rights Reserved ClassCal {new Date().getFullYear()}</div>
				</div>
			</div>
			</div>
		)
	}
}