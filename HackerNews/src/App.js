import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Menu from './Menu/Menu';
import StoriesList from './StoriesList/StoriesList';
import CommentsList from './CommentsList/CommentsList';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />

          <div className="container py-2">
            <div className="row bg-white pt-3">
              <div className="col">
                <Switch>
                  <Route exact path="/topstories" render={(props) => (<StoriesList {...props} key="1"/>)}/>
                  <Route exact path="/newstories" render={(props) => (<StoriesList {...props} key="2"/>)}/>
                  <Route exact path="/beststories" render={(props) => (<StoriesList {...props} key="3"/>)}/>
                  <Route exact path="/showstories" render={(props) => (<StoriesList {...props} key="4"/>)}/>
                  <Route exact path="/askstories" render={(props) => (<StoriesList {...props} key="5"/>)}/>
                  <Route exact path="/comments/:id" component={CommentsList}/>
                  <Redirect to="/topstories"/>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
