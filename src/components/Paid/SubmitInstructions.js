import React, { Component } from 'react';
import "./css/submit.css"
import MediaQuery from 'react-responsive';

export default class SubmitInstructions extends Component {
  render() {
    return (
    <div>  
      <MediaQuery query="(min-device-width: 1224px)">

        <div className="row">
          <div className="submit-line">
            <div className="submit-num">
             1
            </div>
            <div className="submit-instruction">
              Share course calendar(s) with goclasscal@gmail.com via settings and sharing in Google Calendar
            </div>
            <div className="submit-image">
            </div>
          </div>
          <div className="submit-line">
            <div className="submit-num">
             2
            </div>
            <div className="submit-instruction">
              Compose an email with subject line "Classcal &lt;First Name&gt; &lt;Last Name&gt; Submission"
            </div>
            <div className="submit-image">
            </div>
          </div>
          <div className="submit-line">
            <div className="submit-num">
             3
            </div>
            <div className="submit-instruction">
              Place your venmo username in the email body or write N/A and we will pay via check. 
            </div>
            <div className="submit-image">
            </div>
          </div>
          <div className="submit-line">
            <div className="submit-num">
             4
            </div>
            <div className="submit-instruction">
              Attach your submitted course syllabi to the email and send to goclasscal@gmail.com
            </div>
            <div className="submit-image">
            </div>
          </div>
        </div>
      </MediaQuery>

      <MediaQuery query="(max-device-width: 1224px)">

        <div className="row" style = {{overflowY: "scroll", height: "60vh"}}>
          <div className="submit-line">
            <div className="submit-num">
             1
            </div>
            <div className="submit-instruction">
              Share course calendar(s) with goclasscal@gmail.com via settings and sharing in Google Calendar
            </div>
            <div className="submit-image">
            </div>
          </div>
          <div className="submit-line">
            <div className="submit-num">
             2
            </div>
            <div className="submit-instruction">
              Compose an email with subject line "Classcal &lt;First Name&gt; &lt;Last Name&gt; Submission"
            </div>
            <div className="submit-image">
            </div>
          </div>
          <div className="submit-line">
            <div className="submit-num">
             3
            </div>
            <div className="submit-instruction">
              Place your venmo username in the email body or write N/A and we will pay via check. 
            </div>
            <div className="submit-image">
            </div>
          </div>
          <div className="submit-line">
            <div className="submit-num">
             4
            </div>
            <div className="submit-instruction">
              Attach your submitted course syllabi to the email and send to goclasscal@gmail.com
            </div>
            <div className="submit-image">
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
    );
  }
}
