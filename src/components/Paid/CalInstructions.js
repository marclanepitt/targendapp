import React, { Component } from 'react';
import "./css/calinstructions.css"

export default class CalInstructions extends Component {
  render() {
    return (
      <div className="row">
            <div className="instructions-box">
                  <ol style={{marginTop:"2vh", fontWeight:"bold"}}>
                    <li>Login into your Gmail account and go to <a href="https://www.google.com/calendar">https://www.google.com/calendar</a> </li>
                    <li>Create a new calendar
                        <ul>
                              <li>Click the + next to "Add friend's calendar" </li>
                              <li>Select new calendar</li>
                              <li>Fill in information like so:
                                     <ul>
                                          <li>Name
                                          <ul>
                                                <li>DEPT NUM-SECT (SEM)</li>
                                                <li>COMP 110-001 (S18) </li>
                                          </ul>
                                          </li>
                                          <li>Description
                                          <ul>
                                                <li>Professor Name</li>
                                          </ul>
                                          </li>
                                    </ul>
                              </li>
                        </ul>
                      </li>
                    <li>Add Events
                        <ul>
                              <li>
                              Make sure to include:
                                     <ul>
                                          <li>
                                          Exams
                                          </li>
                                          <li>
                                          Homeworks
                                          </li>
                                          <li>
                                          Readings
                                          </li>
                                          <li>
                                          Essays
                                          </li>
                                          <li>
                                          Presentations
                                          </li>
                                          <li>
                                          Etc.
                                          </li>
                                    </ul>
                              </li>
                              <li>
                                    Event Format
                                     <ul>
                                          <li>
                                          COURSE (type) Assignment Name
                                          </li>
                                          <li>
                                          COMP 110 (HW) Assignment 2 Due
                                          </li>
                                    </ul>
                              </li>
                        </ul>
                    </li>
                    <li>Repeat For Each Class</li>
                  </ol>              
            </div>
      </div>
    );
  }
}
