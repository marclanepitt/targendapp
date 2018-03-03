import React, { Component } from 'react';
import {PulseLoader} from 'react-spinners';

class CourseLoader extends Component {

  render() {
    return (
      <div>
      {this.props.loading ? 
       <div id="course-overlay"> 
  		<div className="loader-center">
	        <PulseLoader
	          color={'#4B9CD3'} 
	          loading={this.props.loading} 
	        />
        </div>
       </div>
       :
       <div>
        </div>
    	}
      </div>
    );
  }
}

export default CourseLoader;
