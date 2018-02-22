import React, { Component } from 'react';
import ApiInstance from '../../js/utils/Api.js';

const Api = ApiInstance.instance;

class CourseMain extends Component {

	constructor(props) {
		super(props);
		this.state= {

		}
	}

	componentDidMount() {
		console.log(Api);

	}

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default CourseMain;
