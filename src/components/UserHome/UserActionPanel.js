import React, { Component } from 'react';
import './css/UserActionPanel.css';
import FontAwesome from 'react-fontawesome';


class UserActionPanel extends Component {

  render() {

  	let title,icon,iconSize, message,marginFix,cursor,calRequest,clickAction;

  	if(this.props.panelType === "calendar") {
  		title = "Request Calendar";
      icon = "calendar-o"
      iconSize = '82px';
      message = "Recieve a calendar with all of your course due dates";
      cursor = "pointer";
      if(this.props.calRequest === null) {
        calRequest = {pending:false};
      } else {
        calRequest = this.props.calRequest;
      }

      if(calRequest.pending) {
        clickAction = ""
      } else {
        clickAction = this.props.clickAction
      }

  	} else {
  		title = "Set Notifications";
      icon = "mobile";
      iconSize = '130px';
      message = "Set up text notifications for weekly course updates";
      marginFix = '-1px';
      calRequest = {};
    }

    return (
      <div className = "panel-wrapper" onClick={clickAction}>
     {this.props.panelType !== "calendar" ?
      <div className="corner-ribbon bottom-left red">COMING SOON</div>
      :
      <div/>
      }

      	<div className = "panel">
            <div className="card panel-card" style={{height:"250px",cursor:cursor}}>
              <div className="card-block" style={{textAlign:"center"}}>
              <br/>
              {calRequest.pending && this.props.panelType === "calendar"  ?
              <div id="calendar-overlay">
                <p style={{height:"20px"}}>You have a pending request </p>
                <button className="btn btn-sm btn-danger" onClick={this.props.handleCancelRequest}>Cancel Request</button>
              </div>
              :
              <div/>
              }
                <div style={{textAlign:"center"}}>
                  <FontAwesome style={{fontSize:iconSize}} name={icon}/>
                </div>

                <h2 className="card-title panel-title" style={{marginTop:marginFix}}>{title}</h2>

                <p style={{textAlign:"center"}}>
                  <FontAwesome name={"info-circle"}/>
                  &nbsp;
                   {message}

                </p>

              </div>
            </div>
      	</div>
	  	
       </div>
    );
  }
}

export default UserActionPanel;
