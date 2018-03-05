import React, { Component } from 'react';
import {FormGroup, FormControl,HelpBlock} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class RegisterFormSelect extends Component {

  render() {
  	let icon,valState
  	if(this.props.error) {
  		icon = "exclamation-circle ";
  		valState = "darkred";
  	}
    return (
			<FormGroup
	          controlId="formBasicText"
	          style={{marginTop:"1rem"}}
	        >
	       	<div className="row">
  				<div style={{display:"block",margin:"auto"}} className="col col-lg-10">
			          <FormControl
			          	componentClass="select"
			            placeholder={this.props.placeholder}
			            onChange={e=>this.props.handleInputChange(e,this.props.name)}
			          >
			            <option value="unknown">Major</option>
      					<option value="other">...</option>
			          </FormControl>
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
} export default RegisterFormSelect