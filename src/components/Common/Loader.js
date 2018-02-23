import React, { Component } from 'react';
import {PulseLoader} from 'react-spinners';

class Loader extends Component {

  render() {
    return (
      <div>
      {this.props.loading ? 
       <div id="overlay"> 
  		<div className="loader-center">
	        <PulseLoader
	          color={'white'} 
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

export default Loader;
