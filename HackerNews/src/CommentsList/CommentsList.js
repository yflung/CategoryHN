import React, { Component } from 'react';
import axios from 'axios';
import HackerNewsAPI from '../HackerNewsAPI';
import CategoryAPI from '../CategoryAPI';
import StoriesItem from '../StoriesItem/StoriesItem';
import CommentsItem from '../CommentsItem/CommentsItem';
import Loading from '../Loading/Loading';

class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
    };

    this.item = this.props.location.state;
    this.source = axios.CancelToken.source();
  }

  async componentDidMount() {
    try {
      await this.startLoadComments();
    } catch (error) { return; }
  }

  componentWillUnmount () {
    this.source.cancel();
  }

  async startLoadComments() {
    if (this.props.location.state === undefined) {
      let story = null;
      
      try {
        story = (await axios.get(`${HackerNewsAPI.domain}item/${this.props.match.params.id}.json`, { cancelToken: this.source.token })).data;
      } catch (error) { throw error; }

      if (story !== null && story.type === 'story') {
        let category = [];

        try {
          category = (await axios.post(`${CategoryAPI.domain}/category`, [story.title], { cancelToken: this.source.token })).data;
        } catch (error) { throw error; }

        story.category = category[0];

        this.item = story;
      } else {
        this.setState({
          item: undefined,
        });
      }
    }

    if (this.item !== undefined) {
      await this.loadComments(this.item);

      this.setState({
        item: this.item,
      });
    }
  }

  async loadComments(item) {
    if (item !== null && item.hasOwnProperty('kids') && Array.isArray(item.kids)) {
      let kidsResponse = [];
      
      for (const kidID of item.kids) {
        try {
          kidsResponse.push(axios.get(`${HackerNewsAPI.domain}item/${kidID}.json`, { cancelToken: this.source.token }));
        } catch (error) { throw error; }
      }
      
      kidsResponse = await Promise.all(kidsResponse);

      for (const kidsResponseIndex in kidsResponse) {
        item.kids[kidsResponseIndex] = kidsResponse[kidsResponseIndex].data;
        
        //await this.loadComments(kidsResponse[kidsResponseIndex].data);
      }
    }
  }

  render() {
    if (this.state.item === undefined) {
      return (
        <div className="text-center">
          <i className="fa fa-exclamation fa-2x" aria-hidden="true"></i>
          <h5>Cannot find comments</h5>
        </div>
      );
    }

    if (this.state.item === null) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <StoriesItem story={this.state.item} />
        {
          this.state.item.hasOwnProperty('kids') && Array.isArray(this.state.item.kids) ?
            this.state.item.kids.map((kid, index) =>
              kid === null || (kid.hasOwnProperty('deleted') && kid.deleted)
              || (kid.hasOwnProperty('dead') && kid.dead) ?
                <div key={index}></div>
              :
                <CommentsItem key={index} item={kid} />
            )
          :
            <div></div>
        }
      </div>
    );
  }
}

export default CommentsList;
