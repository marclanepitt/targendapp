import React, { Component } from 'react';
import './css/UserActionPanel.css';
import cal from './img/calendar.jpeg';
import phone from './img/notifications.jpeg';

class UserActionPanel extends Component {

  render() {

  	let image, title;

  	if(this.props.panelType === "calendar") {
  		image = cal;
  		title = "My Calendar";
  	} else {
  		image = phone;
  		title = "Set Notifications";
  	}

    return (
      <div className = "panel-wrapper col col-lg-6" onClick={this.props.clickAction}>
      	<div className = "panel">
            <div className="card" style={{height:"250px",cursor:"pointer"}}>
              <div className="card-block">
                <h4 className="card-title">{title}</h4>

                <p className="card-text"></p>
              </div>
            </div>
      	</div>
	  	
       </div>
    );
  }
}

export default UserActionPanel;
