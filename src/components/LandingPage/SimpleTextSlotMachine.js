import React, { Component } from 'react';
import "./css/slot.css";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SimpleTextSlotMachine extends Component {

	constructor(props) {
		super(props)
		this.state = {
			timer:0,
			text:"You"
		}
		this.tickAndPick = this.tickAndPick.bind(this);
		this.slowAndStop = this.slowAndStop.bind(this);
		this.setInterval = this.setInterval.bind(this);

	}

	tickAndPick() {
		this.setState({
			timer: this.state.timer + 1,
			text: this.props.textList[this.state.timer % this.props.textList.length],
		});
		if(this.state.timer %20  === 0) {
			this.slowAndStop();
		}
	}
	componentDidMount() {
		this.interval = setInterval(this.tickAndPick, 250);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	slowAndStop() {
		clearInterval(this.interval);
		setTimeout(function() { this.setInterval()}.bind(this), 2000);
	}

	setInterval() {
		this.interval = setInterval(this.tickAndPick, 250);
	}
  


  render() {
  	let {text} = this.state;
    return (
      <div style={{display:"inline-block", position:"absolute"}}>
      <ReactCSSTransitionGroup
          transitionName="example"
          transitionLeaveTimeout={80}>
	      <div style={{display:"inline-block"}} key={text}>
	      	<div>
	           &nbsp;{text}
	         </div>
	      </div>
       </ReactCSSTransitionGroup>

      </div>
    );
  }
}

export default SimpleTextSlotMachine;
