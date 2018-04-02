import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function TaskForm(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    //data[tgt.attr('name')] = tgt.val();
    // in update function
if (tgt.attr('name') == "completed") {
  data["completed"] = $(tgt).is(':checked') ? 'true' : 'false';
}
else {
  data[tgt.attr('name')] = tgt.val();
}
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
    api.submit_task(params.form);
  }

  function clear(ev) {
      params.dispatch({
        type: 'CLEAR_FORM',
      });
    }
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return (
    <div style={ {padding: "4ex"} }>
    <h2>New Post</h2>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="textarea" name="user_id" value={params.form.user_id} onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="textarea" name="title" value={params.form.title} onChange={update} placeholder="Enter a title"/>
    </FormGroup>
    <FormGroup>
      <Label for="assigned">Assigned to</Label>
        <Input type="select" name="assigned" value={params.form.assigned} onChange={update} >
          <option default>Select an assignee</option>
          { users }
        </Input>
    </FormGroup>
    <FormGroup>
      <Label for="body">Description</Label>
      <Input type="textarea" name="body" value={params.form.body} onChange={update} placeholder="Enter a description" />
    </FormGroup>
    <FormGroup>
      <Label for="time">Time spent</Label>
      <Input type="number" name="time" step="15" min="0" value={params.form.time} onChange={update} default="0"/>
    </FormGroup>
    <FormGroup>
      <Label for="completed" className="completedLabel">Task status</Label>
      <Input className="completedInput" type="checkbox" name="completed" checked={params.form.completed} onChange={update}  />
    </FormGroup> <br /> <br />
  <Button onClick={submit} color="primary">Create Task</Button>
   <div className="divider"/>
    <Button onClick={clear}>Clear</Button>
  </div>
);
}

function state2props(state) {
  console.log("rerender", state);
  return { form: state.form,
  users: state.users,
 };
}

// Export the result of a curried function call.
export default connect(state2props)(TaskForm);
