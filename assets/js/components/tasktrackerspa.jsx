import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';
import UserForm from './user-form';

export default function tasktrackerspa_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasktrackerspa />
    </Provider>,
    document.getElementById('root'),
  );
}

let Tasktrackerspa = connect((state) => state)((props) => {
  if(props.token) {
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/" exact={true} render={() =>
            <div>
              <TaskForm users={props.users} root={this} />
              <Feed tasks={props.tasks} />
            </div>
          } />
        <Route path="/task" exact={true} render={() =>
            <div>
              <TaskForm users={props.users} root={this} />
            </div>
          } />
          <Route path="/users" exact={true} render={() =>
            <Users users={props.users} />
          } />
          <Route path="/users/:user_id" render={({match}) =>
            <Feed tasks={_.filter(props.tasks, (pp) =>
              match.params.user_id == pp.user.id )
            } />
          } />
        </div>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <div>
          <Nav />
        <Route path="/user" exact={true} render={() =>
              <div>
                <UserForm users={props.users} root={this} />
              </div>
            } />
        </div>
      </Router>
    );
  }

});
