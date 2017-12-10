import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom';
import * as moment from 'moment';

class StoriesItem extends Component {
  render() {
    return (
      <div>
        <h6 className="my-1"><span className="badge badge-primary">{this.props.story.category}</span><a className="text-dark" href={this.props.story.url} target="_blank"> {this.props.story.title}</a></h6>
        <Link to={{ pathname: `/comments/${this.props.story.id}`, state: this.props.story }}>
          <small className="text-muted"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {this.props.story.score} | {moment.unix(this.props.story.time).fromNow()} | {this.props.story.by} | <i className="fa fa-comments-o" aria-hidden="true"></i> {this.props.story.descendants}</small>
        </Link>
        <hr className="my-2"/>
      </div>
    );
  }
}

export default StoriesItem;
