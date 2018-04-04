// referred from prof Nat Tuck's lecture on Redux http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
//referred the usage of Link from https://knowbody.github.io/react-router-docs/api/Link.html
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
  }

  return (
    <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
               value={props.login.name} onChange={update} />
      </FormGroup>

      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
        <Link className="btn btn-secondary" to={"/"} onClick={create_token}>Log in</Link>
    </Form>
  </div>
 );
});

let Session = connect(({token}) => {return {token};})((props) => {
  return (
    <div className="navbar-text">
    Your User id = { props.token.user_id }
  </div>
 );
});

function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }

  if(props.token){
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <span className="navbar-brand">
          Task Tracker
        </span>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/"  exact={true} activeClassName="active" className="nav-link">Task Feed</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/task" href="#"  className="nav-link">Create Task</NavLink>
          </NavItem>

        </ul>
        { session_info }
      </nav>
    );
  }
else {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Task Tracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/user" href="#" activeClassName="active" className="nav-link">New User</NavLink>
        </NavItem>
      </ul>
      { session_info }
    </nav>

  );

}

}

function state2props(state) {
  return {
    token: state.token,
  };
}
// referred from https://github.com/react-bootstrap/react-router-bootstrap/issues/152
//referred from https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md
export default connect(state2props,null,null,{
  pure: false
})(Nav);
