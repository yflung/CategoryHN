import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw"></i>
      </div>
    );
  }
}

export default Loading;
