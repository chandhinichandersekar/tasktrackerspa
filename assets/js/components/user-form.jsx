// referred from prof Nat Tuck's lecture on Redux http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function UserForm(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();

    let action = {
      type: 'UPDATE_USER_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function submit(ev) {
    var user_struct = {name: params.form.name, password: params.form.pass}
    api.submit_user(user_struct);
    location.reload(true);
  }

  function clear(ev) {
      params.dispatch({
        type: 'CLEAR_USER_FORM',
      });
    }
  return (
    <div style={ {padding: "4ex"} }>
    <h2>New user</h2>

    <FormGroup>
      <Label for="name">Name</Label>
      <Input type="textarea" name="name" value={params.form.name} onChange={update} />

    </FormGroup>

    <FormGroup>
      <Label for="pass">Password</Label>
      <Input type="password" name="pass" value={params.form.pass} onChange={update} />
    </FormGroup>

    <Button onClick={submit} color="primary">Create User</Button>
    <div className="divider"/>
    <Button onClick={clear}>Clear</Button>
  </div>
);
}

function state2props(state) {
  return { form: state.userform,
  users: state.users,
 };
}

// Export the result of a curried function call.
export default connect(state2props)(UserForm);
