//React
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

//External Css
import './css/CourseCard.css';

//External Components
import FontAwesome from 'react-fontawesome';
import $ from "jquery";

import ApiInstance from '../../js/utils/Api.js';
const Api = ApiInstance.instance;

class CourseCard extends Component {
    constructor(props) {
        super(props);
        this.handleCourseAdd = this.handleCourseAdd.bind(this);
        this.handleCourseRemove = this.handleCourseRemove.bind(this);
        this.hoverHack = this.hoverHack.bind(this);
    }

    handleCourseAdd() {
        this.props.setCourseLoading();
        const onSuccess = response => {
            this.props.handleCourseAdd([response.data.user,this.props.course.department+ " " + this.props.course.number+"-"+this.props.course.section]);
        }

        const onError = err => {
            console.log("error in adding course");
        }

        Api.addCourse(this.props.course.id,onSuccess,onError);
    }

    handleCourseRemove() {
        this.props.setCourseLoading();
        const onSuccess = response => {
            this.props.handleCourseRemove([response.data.user,this.props.course.department+ " " + this.props.course.number+"-"+this.props.course.section]);
        }

        const onError = err => {
            console.log(err);
        }

        Api.removeCourse(this.props.course.id,onSuccess,onError);
    }
    hoverHack() {
        $("#card-flip"+this.props.course.id).focus()
    }

  render() {
    let course;
    if(this.props.course) {
        course = this.props.course;
    } else {
        course = "";
    }
    return (
    <div className="col-sm-3" style={{maxWidth: '350px'}}>
        <div id={"card-flip"+course.id}className="card-flip">
            <div className="flip">
                <div className="front">
                    <div className="card" style={{height:"250px"}}>
                    {this.props.chosen ? 
                      <div className="image-container" onClick={this.hoverHack}>
                          <img className="card-img-top" src={course.image.image} alt={course.image.name} style={{height: '180px', width: '100%', display: 'block'}} data-holder-rendered="true"/>
                          <div className="after">Selected</div>
                      </div>
                      :
                          <img className="card-img-top" src={course.image.image} alt={course.image.name} style={{height: '180px', width: '100%', display: 'block'}} data-holder-rendered="true"/>
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
                        <MediaQuery query="(min-device-width: 1224px)">
                            <div className = "col col-lg-6 text-center">
                                {course.assignment_total} <b>Assignments</b>
                            </div>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 1224px)">
                            <div className = "col col-lg-6 " style={{float:"left", marginLeft:"-40px"}}>
                                {course.assignment_total} <b>Assignments</b>
                            </div>
                        </MediaQuery>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className = "col col-lg-4 text-center">
                                <FontAwesome style={{fontSize:'28px'}} name='bullhorn'/>
                            </div>
                        <MediaQuery query="(min-device-width: 1224px)">
                            <div className = "col col-lg-6 text-center">
                                {course.lecture_total} <b>Lectures</b>
                            </div>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 1224px)">
                            <div className = "col col-lg-6 " style={{float:"left", marginLeft:"-40px"}}>
                                {course.lecture_total} <b>Lectures</b>
                            </div>
                        </MediaQuery>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className = "col col-lg-4 text-center">
                                <FontAwesome style={{fontSize:'28px'}} name='edit'/>
                            </div>
                        <MediaQuery query="(min-device-width: 1224px)">
                            <div className = "col col-lg-6 text-center">
                                {course.test_total} <b>Tests</b>
                            </div>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 1224px)">
                            <div className = "col col-lg-6 " style={{float:"left", marginLeft:"-40px"}}>
                                {course.test_total} <b>Tests</b>
                            </div>
                        </MediaQuery>
                        </div>
                        <hr/>
                        <h4 className="card-title" style={{marginTop:'14px'}}>
                        {this.props.chosen ? 
                            <button onClick={this.handleCourseRemove} className="btn btn-sm btn-danger">Remove Course</button>
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

