import React, { Component } from 'react';
import axios from 'axios';
import * as moment from 'moment';
import HackerNewsAPI from '../HackerNewsAPI';
import Loading from '../Loading/Loading';
import CommentsItemReply from '../CommentsItemReply/CommentsItemReply';
import '../CommentsItem/CommentsItem.css';

class CommentsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showReplyStatus: 'NO',
    };

    this.item = this.props.item;
    this.source = axios.CancelToken.source();

    this.handleReplyClick = this.handleReplyClick.bind(this);
  }

  componentWillUnmount () {
    this.source.cancel();
  }

  async handleReplyClick() {
    this.setState({
      showReplyStatus: 'LOADING',
    });

    try {
      await this.loadComments(this.item);
    } catch (error) { return; }

    this.setState({
      showReplyStatus: 'SHOW',
    });
  }

  async loadComments(item) {
    if (item.hasOwnProperty('kids') && Array.isArray(item.kids)) {
      let kidsResponse = [];
      
      for (const kidID of item.kids) {
        try {
          kidsResponse.push(axios.get(`${HackerNewsAPI.domain}item/${kidID}.json`, { cancelToken: this.source.token }));
        } catch (error) { throw error; }
      }
      
      kidsResponse = await Promise.all(kidsResponse);

      for (const kidsResponseIndex in kidsResponse) {
        item.kids[kidsResponseIndex] = kidsResponse[kidsResponseIndex].data;
        
        await this.loadComments(kidsResponse[kidsResponseIndex].data);
      }
    }
  }

  render() {
    return (
      <div className="pl-2">
        <small className="text-muted">{this.props.item.by} | {moment.unix(this.props.item.time).fromNow()}</small><br/>
        <small><div id="text" dangerouslySetInnerHTML={{__html: this.props.item.text}}/></small>
        {
          this.props.item.hasOwnProperty('kids') ?
            this.state.showReplyStatus === 'NO' ?
              <button type="button" className="btn btn-outline-primary btn-sm my-1" onClick={this.handleReplyClick}>Show Reply</button>
            :
              this.state.showReplyStatus === 'LOADING' ?
                <Loading />
              :
                <CommentsItemReply item={this.item} />
          :
            <div></div>
        }
        <hr className="my-2"/>
      </div>
    );
  }
}

export default CommentsItem;
