//React
import React, { Component } from 'react';

//External Css
import './css/CourseCard.css';

//Images
import cs from './img/computer_science.jpeg';

//External Components
import FontAwesome from 'react-fontawesome';

class CourseCard extends Component {

  render() {
    return (
    <div className="col-sm-3">
        <div className="card-flip">
            <div className="flip">
                <div className="front">
                    <div className="card" style={{height:"250px"}}>
                      <img className="card-img-top" src={cs} alt="100%x180" style={{height: '180px', width: '100%', display: 'block'}} data-holder-rendered="true"/>
                      <div className="card-block">
                        <h4 className="card-title">COMP 550 001</h4>
                        <p className="card-text">Algorithms and Analysis</p>
                      </div>
                    </div>
                </div>
                <div className="back">
                    <div className="card" style={{height:"250px"}}>
                      <div className="card-block">
                       <h4 className="card-title" style={{marginTop:'14px'}}>Course Breakdown</h4>
                       <hr/>
                        <div className="row">
                            <div className = "col col-lg-4 text-center">
                                <FontAwesome style={{fontSize:'28px'}} name='file-text-o'/>
                            </div>
                            <div className = "col col-lg-6 text-center">
                                56 <b>Assignments</b>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className = "col col-lg-4 text-center">
                                <FontAwesome style={{fontSize:'28px'}} name='bullhorn'/>
                            </div>
                            <div className = "col col-lg-6 text-center">
                                40 <b>Lectures</b>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className = "col col-lg-4 text-center">
                                <FontAwesome style={{fontSize:'28px'}} name='edit'/>
                            </div>
                            <div className = "col col-lg-6 text-center">
                                3 <b>Tests</b>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )}
}

export default CourseCard;

