import React, { Component } from 'react';
import HttpsRedirect from 'react-https-redirect';

class App extends Component {
  render() {
    return (
  	<HttpsRedirect>
      <div className="App" id="app">
        {this.props.children}
      </div>
      </HttpsRedirect>
    );
  }
}

export default App;
