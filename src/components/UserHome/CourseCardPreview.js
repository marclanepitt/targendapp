//React
import React, { Component } from 'react';

//External Css
import './css/CourseCardPreview.css';


class CourseCardPreview extends Component {

  render() {
    let course;
    if(this.props.course) {
        course = this.props.course;
    } else {
        course = "";
    }
    return (
        <div className="card-no-flip">
            <div className="no-flip">
                <div className="front">
                    <div className="card" style={{height:"150px"}}>
                          <img className="card-img-top" src={course.image.image} alt="100%x180" style={{height: '100px', width: '100%', display: 'block'}} data-holder-rendered="true"/>
                      <div className="card-block">
                        <h4 className="card-title-preview">{course.department} {course.number}-{course.section}</h4>
                        <p className="card-text-preview">{course.description}</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
  )}
}

export default CourseCardPreview;

