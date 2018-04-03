import React, { Component } from 'react';
import "./css/paid.css";
import Introduction from "./Introduction";
import CalInstructions from "./CalInstructions";
import SubmitInstructions from "./SubmitInstructions";
import $ from "jquery";

class Paid extends Component {

	constructor(props) {
		super(props);
		this.state = {
			step:1,
		}
		this.nextStep = this.nextStep.bind(this);
		this.backStep = this.backStep.bind(this);
	}

	componentDidMount() {
		document.body.style.backgroundColor = "#2B73AD";
	}

	nextStep() {
		this.setState({
			step: this.state.step + 1,
		})
	}

	backStep() {
		this.setState({
			step: this.state.step - 1,
		})
	}

	getStepContent() {
		let {step} = this.state;
		if(step === 1) {
			$("#step2,#step3,#step4").removeClass("selected");
			return <Introduction/>;
		} else if(step === 2) {
			$("#step3,#step4").removeClass("selected");
			$("#step"+step).addClass("selected");
			return <CalInstructions/>;
		} else if(step === 3) {
			$("#step4").removeClass("selected");
			$("#step"+step).addClass("selected");
			return <SubmitInstructions/>;
		} else if(step === 4) {
			$("#step"+step).addClass("selected");
		}
	}

	getStepTitle() {
		let {step} = this.state;
		if(step === 1) {
			return "Get paid organizing yourself";
		} else if(step === 2) {
			return "Follow these instructions"
		} else if(step === 3) {
			return "Submit your calendars!"
		} else if(step === 4) {
			return "All finished!"
		}
	}

	getStepSubtitle() {
		let {step} = this.state;
		if(step === 1) {
			return "It's easy and simple"
		} else if(step === 2) {
			return "For every class you wish to submit, use the process outlined below"
		} else if(step === 3) {
		} else if(step === 4) {
			return "You will be paid once your calendar has been confirmed (1-2 business days)"
		}
	}

  render() {
  	let {step} = this.state;
    return (
      <div className="container">
  	     <div className="paid-stepper col-sm-6">
        	<div id="step1" className="step selected" step-des="Introduction">1</div>
        	<div id="step2" className="step" step-des="Calendar Instructions">2</div>
        	<div id="step3" className="step" step-des="Submission Instructions">3</div>
        	<div id="step4" className="step end" step-des="Done!">4</div>

        </div>
	      <div className="row">
	        <div className="paid-title">
	        	{this.getStepTitle()}
	        </div>
	      </div>
	      <div className="row">
	        <div className="paid-subtitle">
	        	{this.getStepSubtitle()}
	        </div>
	      </div>
	        <div className="paid-step-container col col-lg-12">
	        	{this.getStepContent()}
	        </div>
	        <div className="row btn-row">
	        	{step !== 1 ? 
	        	<button onClick={this.backStep} className="btn btn-lg btn-success">
	        		Previous
	        	</button>
	        	:
	        	<div/>
	        	}
	        	{step !== 4 ? 
	        	<button onClick={this.nextStep} className="btn btn-lg btn-success">
	        		Next
	        	</button>
	        	:
	        	<div/>
	        	}

	        </div>
      </div>
    );
  }
}

export default Paid;
