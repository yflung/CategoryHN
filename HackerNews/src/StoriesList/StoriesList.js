import React, { Component } from 'react';
import axios from 'axios';
import HackerNewsAPI from '../HackerNewsAPI';
import CategoryAPI from '../CategoryAPI';
import Loading from '../Loading/Loading';
import StoriesItem from '../StoriesItem/StoriesItem';

class StoriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: null,
      isLoadingMore: false,
    };

    this.source = axios.CancelToken.source();
    this.storiesID = null;
    this.showedStories = 0;

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    try {
      await this.loadStories();
    } catch (error) { return; }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);

    this.source.cancel();
  }
  
  async handleScroll(event) {
    if (window.innerHeight + window.pageYOffset === document.body.offsetHeight) {
      if (this.showedStories < this.storiesID.length && !this.state.isLoadingMore) {
        this.setState({
          isLoadingMore: true,
        });

        try {
          await this.loadMoreStories();
        } catch (error) { return; }

        this.setState({
          isLoadingMore: false,
        });
      }
    }
  }

  async loadStories() {
    let storiesID = [];

    //let storiesIDResponse = await fetch(`${HackerNewsAPI.domain}${this.props.location.pathname}.json`, {method: 'get'});
    //let storiesID = await storiesIDResponse.json();
    try {
      storiesID = (await axios.get(`${HackerNewsAPI.domain}${this.props.location.pathname}.json`, { cancelToken: this.source.token })).data;
    } catch (error) { throw error; }

    this.storiesID = storiesID;

    await this.loadMoreStories();
  }

  async loadMoreStories() {
    let stories = [];
    let count = 0;
    
    for (let storiesIndex = this.showedStories; storiesIndex < this.storiesID.length; storiesIndex++) {
      //let story = fetch(`${API.domain}item/${this.storiesID[storiesIndex]}.json`, {method: 'get'});
      let story = {};

      try {
        story = axios.get(`${HackerNewsAPI.domain}item/${this.storiesID[storiesIndex]}.json`, { cancelToken: this.source.token });
      } catch (error) { throw error; }

      stories.push(story);
      count++;

      if (count === 30) {
        break;
      }
    }

    stories = await Promise.all(stories);

    for (let storiesIndex = 0; storiesIndex < stories.length; storiesIndex++) {
      //stories[storiesIndex] = stories[storiesIndex].json();
      stories[storiesIndex] = stories[storiesIndex].data;
    }

    //stories = await Promise.all(stories);

    let titles = [];

    for (const story of stories) {
      titles.push(story.title);
    }

    //const categoryResponse = await fetch('https://us-central1-classapidemo.cloudfunctions.net/v1/category', {method: 'post', headers: {'content-type': 'application/json'}, body: JSON.stringify(titles)});
    //let categories = await categoryResponse.json();
    let categories = [];

    try {
      categories = (await axios.post(`${CategoryAPI.domain}/category`, titles, { cancelToken: this.source.token })).data;
    } catch (error) { throw error; }

    for (let storiesIndex = 0; storiesIndex < stories.length; storiesIndex++) {
      stories[storiesIndex].category = categories[storiesIndex];
    }

    this.showedStories += count;

    if (this.state.stories == null) {
      this.setState({
        stories: stories,
      });
    } else {
      this.setState({
        stories: this.state.stories.concat(stories),
      });
    }
  }

  render() {
    if (this.state.stories === null) {
      window.scrollTo(0, 0);

      return (
        <Loading />
      );
    }

    return (
      <div>
        {
          this.state.stories.map((story, index) =>
            <div key={index}>
              <StoriesItem story={story}/>
            </div>
          )
        }
        {
          this.state.isLoadingMore ? <Loading /> : <div></div>
        }
      </div>
    );
  }
}

export default StoriesList;
