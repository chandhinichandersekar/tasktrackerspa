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
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    params.dispatch(action);
  }

  function submit(ev) {
    console.log("Should create post.");
    console.log(params.form);
    api.submit_user(params.form);
    location.reload(true);
  }

  function clear(ev) {
      params.dispatch({
        type: 'CLEAR_FORM',
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
  </div>
);
}

function state2props(state) {
  console.log("rerender", state);
  return { form: state.userform,
  users: state.users,
 };
}

// Export the result of a curried function call.
export default connect(state2props)(UserForm);
