import React, { Component } from 'react';
import "./css/finished.css";
import icon from "../../img/classcalicon.jpg";
import ReactGA from 'react-ga';
import MediaQuery from 'react-responsive';
ReactGA.initialize('UA-115975493-1');


class Finished extends Component {

constructor(props){
	super(props);
	this.pushToHome = this.pushToHome.bind(this);
}

pushToHome(){
	this.props._history.push("/");
		ReactGA.event({
			category:"PAID",
			action:"Went to home page from paid finished",
		});
}

  render() {
    return (
    <div>	
		<MediaQuery query="(min-device-width: 1224px)">
		    <div>	
		      <div className="finished">
		        Back To ClassCal
		      </div>

		      <div className = "finished-image-wrapper" onClick={this.pushToHome}>
		        <img className="finished-image" src={icon} alt="Back to home page"/>
		      </div>

		    </div>
	    </MediaQuery>

	    <MediaQuery query="(max-device-width: 1224px)">
		    <div>	
		      <div className="finished">
		        Back To ClassCal
		      </div>

		      <div className = "finished-image-wrapper" onClick={this.pushToHome}>
		        <img className="finished-image-mobile" src={icon} alt="Back to home page"/>
		      </div>

		    </div>
	    </MediaQuery>
	</div>
    );
  }
}

export default Finished;
