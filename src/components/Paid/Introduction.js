import React, { Component } from 'react';
import "./css/introduction.css"

export default class Introduction extends Component {
  render() {
    return (
      <div className="row">
      	<div className="pay-card col col-lg-3">
                  <div className="pay-card-type">
                        Class<span className="colored-type">BASIC</span>
                  </div>
                  <hr/>
      		<div className="pay-card-amount">
      		$5
      		</div>
      		<div className="pay-card-description">
      			Per Class
      		</div>
      		<br/>
      		<div className="pay-card-description-2">
      			Any Class Size
      		</div>
      		<div className="pay-card-description-small">
      			*Total Class Size
      		</div>   
      	</div>

      </div>
    );
  }
}
