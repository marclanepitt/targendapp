//React
import React, { Component } from 'react';

//External Css
import './css/CourseCard.css';

//Images
import cs from './img/computer_science.jpeg';

//External Components
import FontAwesome from 'react-fontawesome';

import ApiInstance from '../../js/utils/Api.js';
const Api = ApiInstance.instance;

class CourseCard extends Component {
    constructor(props) {
        super(props);
        this.handleCourseAdd = this.handleCourseAdd.bind(this);
    }

    handleCourseAdd() {
        const onSuccess = response => {
            this.props.handleCourseAdd([response.data.user,this.props.course.department+ " " + this.props.course.number+"-"+this.props.course.section]);
        }

        const onError = err => {
            console.log("error in adding course");
        }

        Api.addCourse(this.props.course.id,onSuccess,onError);
    }

  render() {
    let course;
    if(this.props.course) {
        course = this.props.course;
    } else {
        course = "";
    }
    return (
    <div className="col-sm-3">
        <div className="card-flip">
            <div className="flip">
                <div className="front">
                    <div className="card" style={{height:"250px"}}>
                    {this.props.chosen ? 
                      <div className="image-container">
                          <img className="card-img-top" src={cs} alt="100%x180" style={{height: '180px', width: '100%', display: 'block'}} data-holder-rendered="true"/>
                          <div className="after">Already Added</div>
                      </div>
                      :
                          <img className="card-img-top" src={cs} alt="100%x180" style={{height: '180px', width: '100%', display: 'block'}} data-holder-rendered="true"/>
                        }
                      <div className="card-block">
                        <h4 className="card-title">{course.department} {course.number}-{course.section}</h4>
                        <p className="card-text">{course.description}</p>
                      </div>
                    </div>
                </div>
                <div className="back">
                    <div className="card" style={{height:"250px"}}>
                      <div className="card-block">
                        <div className="row" style={{marginTop:'14px'}}>
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
                        <hr/>
                        <h4 className="card-title" style={{marginTop:'14px'}}>
                        {this.props.chosen ? 
                            <button onClick={this.handleCourseAdd} disabled className="btn btn-sm btn-success">Add Course</button>
                        :
                            <button onClick={this.handleCourseAdd} className="btn btn-sm btn-success">Add Course</button>
                        }
                        </h4>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )}
}

export default CourseCard;

