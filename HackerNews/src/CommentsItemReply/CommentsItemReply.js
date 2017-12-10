import React, { Component } from 'react';
import * as moment from 'moment';

class CommentsItemReply extends Component {
  render() {
    return (
      this.props.item.hasOwnProperty('kids') && Array.isArray(this.props.item.kids) ?
        this.props.item.kids.map((kid, index) =>
          kid === null || (kid.hasOwnProperty('deleted') && kid.deleted)
          || (kid.hasOwnProperty('dead') && kid.dead) ?
            <div key={index}></div>
          :
            <div className="pl-2" key={index}>
              <small className="text-muted">{kid.by} | {moment.unix(kid.time).fromNow()}</small><br/>
              <small><div id="text" dangerouslySetInnerHTML={{__html: kid.text}}/></small>
              
              <CommentsItemReply item={kid} />
            </div>
        )
      :
        <div></div>
    );
  }
}

export default CommentsItemReply;
