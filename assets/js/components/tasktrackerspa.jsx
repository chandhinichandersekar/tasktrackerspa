import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';
import UserForm from './user-form';
import EditForm from './edit-form';

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
              <Feed tasks={props.tasks} />
            </div>
          } />
        <Route path="/task" exact={true} render={() =>
            <div>
              <TaskForm users={props.users} root={this} />
            </div>
          } />
        <Route path="/edit" exact={true} render={() =>
              <div>
                <EditForm users={props.users} root={this} />
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
          <br />
          <br />
            <div className="text-center">
              <h1> Welcome to Task Tracker </h1>
                <p className="text-primary"> If you are a registered user enter your username, password and click Login </p>
                <p className="text-primary"> If you are a new user click on new user to register and then Login</p>
              </div>
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
