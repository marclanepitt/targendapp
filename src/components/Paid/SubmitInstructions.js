import React, { Component } from 'react';
import "./css/submit.css"

export default class SubmitInstructions extends Component {
  render() {
    return (
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
            Attach your submitted course syllabi to the email and send to goclasscal@gmail.com
          </div>
          <div className="submit-image">
          </div>
        </div>
      </div>
    );
  }
}
