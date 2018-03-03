import React, { Component } from 'react';
import "./css/NotFound.css";
import Loader from "./Loader"

class NotFound extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading:true,
		}

		this.handlePush = this.handlePush.bind(this);
	}

  	componentDidMount() {
  		let link = document.createElement("link");
  		link.rel = "stylesheet";
  		link.href = "https://afeld.github.io/emoji-css/emoji.css";
  		document.getElementsByTagName('head')[0].appendChild(link);

  		this.setState({
  			loading:false,
  		})
  	}
  	handlePush() {
  		this.props.history.push("/courses");
  	}
  render() {
  	const {loading} = this.state;
    return (
    	<div>
    	      <Loader loading = {loading} />
      <div className = "not-outer">
  		<div className = "not-wrapper">
  	      	<div className = "four-o-four">
	      		404
	      	</div>			
	      	<div className = "not-title">
	      		This Page Doesn't Exist
	      	</div>
	      	<div className = "not-text">
	      		We see you snooping around <i class="em em-wink "></i>  Luckily, we found a way <i class="em em-back "></i>
	      	</div>
	      	<div className="not-btn" >
		      	<button onClick={this.handlePush} className = "btn btn-lg btn-primary not-btn-btn" style={{margin:"auto",display:"block"}}>
		      		Back to Courses
		      	</button>
	      	</div>
	    </div>
      </div>
      </div>
    );
  }
}

export default NotFound;