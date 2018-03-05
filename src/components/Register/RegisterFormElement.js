import React, { Component } from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './css/RegisterFormElement.css';

class RegisterFormElement extends Component {

  render() {
  	let icon,valState
  	if(this.props.error) {
  		icon = "exclamation-circle ";
  		valState = "darkred";
  	}
    return (
			<FormGroup
	          controlId="formBasicText"
	          style={{marginBottom:"-1rem"}}
	        >
	       	<div className="row">
  				<div style={{display:"block",margin:"auto"}} className="col col-lg-10">
			          <FormControl
			            type={this.props.type}
			            placeholder={this.props.placeholder}
			            onChange={e=>this.props.handleInputChange(e,this.props.name)}
			            onFocus={this.props.onFocus}
			            onBlur = {this.props.onBlur}
			          />
	         	</div>
	         {this.props.error ? 
	         <div>
	          <FontAwesome title={this.props.error} style={{lineHeight:'70px',color:valState,cursor:"pointer",fontSize:"25px"}} name={icon}/>
	          </div>
	          :
	          <div/>
	      		}
	          </div>
	        </FormGroup>
	)}
} export default RegisterFormElement