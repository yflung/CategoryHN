import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import $ from 'jquery';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleTogglerLinkClick = this.handleTogglerLinkClick.bind(this);
  }

  handleTogglerLinkClick() {
    $('#menuToggler').collapse('hide');
  }

  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-lg bg-dark">
        <Link to="/topstories" className="navbar-brand">Hacker News</Link>

        <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#menuToggler" aria-controls="menuToggler" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>

        <div className="collapse navbar-collapse" id="menuToggler">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/topstories" className="nav-link" onClick={this.handleTogglerLinkClick}>Top</Link>
            </li>
            <li className="nav-item">
              <Link to="/newstories" className="nav-link" onClick={this.handleTogglerLinkClick}>New</Link>
            </li>
            <li className="nav-item">
              <Link to="/beststories" className="nav-link" onClick={this.handleTogglerLinkClick}>Best</Link>
            </li>
            <li className="nav-item">
              <Link to="/showstories" className="nav-link" onClick={this.handleTogglerLinkClick}>Show</Link>
            </li>
            <li className="nav-item">
              <Link to="/askstories" className="nav-link" onClick={this.handleTogglerLinkClick}>Ask</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Menu;
