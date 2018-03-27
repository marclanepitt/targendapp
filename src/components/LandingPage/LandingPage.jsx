import React from 'react';
import './css/grid.css';
import './css/landingPage.css';
import $ from 'jquery';
import screenshot from '../../img/app-screenshot.png';
import "html5-device-mockups/dist/device-mockups.min.css";
import SimpleLineIcon from 'react-simple-line-icons';
import logo_tp from "../../img/class-cal-tp.png";
import ReactGA from 'react-ga';
import SimpleTextSlotMachine from './SimpleTextSlotMachine';
import MediaQuery from 'react-responsive';
import MobileNav from "./MobileNav";

ReactGA.initialize('UA-115975493-1');
ReactGA.pageview("Landing Page");
ReactGA.event({
	category:"START",
	action:"Landed on Landing Page",
});

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
			],
			termsShow:true,

		};

		this.handleScroll = this.handleScroll.bind(this);
		this.termsClose = this.termsClose.bind(this);
		this.termsOpen = this.termsOpen.bind(this);
	}

	componentDidMount() {
       		window.addEventListener('scroll',this.handleScroll);
     }

	componentWillUnmount() {
	    	window.removeEventListener('scroll', this.handleScroll);
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

	termsClose() {
		this.setState({
			termsShow:false
		})
	}

	termsOpen() {
		this.setState({
			termsShow:true
		})
	}


	render() {
		return (
			<div>
			<div id='nav-bg'></div>
			<MediaQuery query="(min-device-width: 1224px)">
				<nav className="navbar navbar-default nav-actual">
				  <div className="container-fluid">

				    <div className="navbar-header">
				      <a id="#top" onClick={this.animateAndScroll} >
				        <img style={{cursor:"pointer"}}  id="#top"  alt="Brand" className="brand-image" src={logo_tp}/>
				      </a>
				    </div>
				    <ul className="nav navbar-nav navbar-right " style={{display:"inline-block"}}>
				        <li><a id="#features" onClick={this.animateAndScroll}> Features</a></li>
				        <li><a id="#social-proof" onClick={this.animateAndScroll}> About</a></li>
				        <li><a id="#contact-us" onClick={this.animateAndScroll}> Contact Us</a></li>
				        <li><a className="btn btn-sm nav-button" onClick={this.pushToLogin.bind(this)}>Login</a></li>
				     </ul>
				  </div>
				</nav>
			</MediaQuery>
			<MobileNav loginPush={this.pushToLogin.bind(this)} registerPush={this.pushToRegister.bind(this)}/>
			<div id="header" className="landing-page grid">
				<MediaQuery query="(min-device-width: 1224px)">
					<div className="main-title-container">
						<div className="grid-row-item-row title-row">
							<div className="grid-item title">We. Organize.<SimpleTextSlotMachine textList={["Easily","Efficiently","College","You","Tarheels","Courses","Tests",]}/></div>
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
				</MediaQuery>
				<MediaQuery query="(max-device-width: 1224px)">
					<div className="main-title-container">
					<br/>
						<div className="grid-row-item-row title-row">
							<div className="grid-item title" style={{fontSize:'34px'}}>We. Organize.<SimpleTextSlotMachine textList={["Easily","Efficiently","College","You","Tarheels","Courses","Tests",]}/></div>
						</div>
					<div className="col col-sm-6">
					          <div className="device-wrapper" style={{marginRight:'200px'}} id="landing-device">
								  <div className="device" data-device="iMac" data-orientation="portrait" data-color="black">
								    <div className="screen" style={{backgroundImage:"url("+screenshot+")"}}>
								    </div>
								  </div>
								</div>
							</div>
							<div style={{marginLeft:"-50%"}}>
							 <a className='cta-button' onClick={this.pushToRegister.bind(this)}>Get Started</a>
							 </div>
						</div>
				</MediaQuery>
				{this.renderHelpSections()}
				<div id="social-proof" className="grid-row-item-row section-header odd">
					<MediaQuery query="(max-device-width: 1224px)">
					<div className="grid-item subtitle" style={{fontSize:"24px"}}>
					We all want to spend a little less time organizing...
					</div>
					</MediaQuery>
					<MediaQuery query="(min-device-width: 1224px)">
					<div className="grid-item subtitle" style={{fontSize:"30px"}}>
					We all want to spend a little less time organizing...
					</div>
					</MediaQuery>
					<div className="row">
				<MediaQuery query="(max-device-width: 1224px)">
					<div className="quote-box" style={{width:"220px", marginLeft:".05em"}}>
						  <div className="quote-text" style={{width:"220px"}}>
						    <i className="fa fa-quote-left"> </i><span id="text">It's too time consuming to organize with online planners. It's time for syllabi to be automated.</span>
						  </div>

						  <div className="quote-author" style={{width:"190px"}}>

						    <span id="author"><b>Marc Pittinsky</b></span> via
						      &nbsp;<i className="fa fa-twitter"></i>

						  </div>
						</div>
				</MediaQuery>
				<MediaQuery query="(min-device-width: 1224px)">
					<div className="quote-box">
						  <div className="quote-text">
						    <i className="fa fa-quote-left"> </i><span id="text">It's too time consuming to organize with online planners. It's time for syllabi to be automated.</span>
						  </div>

						  <div className="quote-author">

						    <span id="author"><b>Marc Pittinsky</b></span> via
						      &nbsp;<i className="fa fa-twitter"></i>

						  </div>
						</div>
				</MediaQuery>
					</div>
				</div>

				<div id="contact-us" className="grid-row-item-row section-header even">
					<div className="grid-item subtitle" style={{fontSize:"60px"}}>
					Contact Us
					</div>
					<div className="row" style={{fontSize:"20px",textAlign:"center"}}>
						Have any questions?  Any suggestions? Just want to say hello?
					</div>
					<div className="row" style={{margin:'20px'}}>
						<i className="fa fa-envelope"></i>
					</div>
					<div className="row" style={{fontSize:"20px"}}>
						Email us at goclasscal@gmail.com
					</div>
				</div>
				<div className="grid-row-item-col subfooter">
					<div className="grid-item"><a onClick={this.termsOpen}>Terms</a> and <a>Privacy</a></div>
				</div>
				<div className="grid-row-item-row footer">
					<div className="grid-item">All Rights Reserved ClassCal {new Date().getFullYear()}</div>
				</div>

			</div>
			</div>
		)
	}
}
