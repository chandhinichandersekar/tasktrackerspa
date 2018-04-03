import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function TaskForm(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    //data[tgt.attr('name')] = tgt.val();
    // in update function
    data[tgt.attr('name')] = tgt.val();
    if (tgt.attr('name') == "completed") {
      console.log(tgt.val());
      if(tgt.val()=="In Progress") {
      data['completed'] = false;
      }
      else{
        data['completed'] = true;
      }
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

  function edit(ev) {
    console.log("Should create post.");
    console.log(params.form);
    var task_id = params.form.id;
    api.edit_task(params.form, task_id);
  }

  function clear(ev) {
      params.dispatch({
        type: 'CLEAR_FORM',
      });
    }
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  let users_name = _.map(params.users, (uu) => <option key={uu.id} value={uu.name}>{uu.name}</option>);

  return (
    <div style={ {padding: "4ex"} }>
    <h2>New Task</h2>
    <FormGroup>
      <Label for="user_id">Your User ID </Label>
      <Input type="textarea" name="user_id" value={params.form.user_id} onChange={update} placeholder="Enter your user id as on the nav bar">
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
          { users_name }
        </Input>
    </FormGroup>
    <FormGroup>
      <Label for="body">Description</Label>
      <Input type="textarea" name="body" value={params.form.body} onChange={update} placeholder="Enter a description" />
    </FormGroup>
    <FormGroup>
      <Label for="time">Time spent</Label>
      <Input type="number" name="time" step="15" min="0" value={params.form.time} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="completed" className="completedLabel">Task status</Label>
      <Input className="completedInput" type="select" name="completed" value={params.form.completed ? "Completed" : "In Progress" } onChange={update} >
        <option>In Progress</option>
          <option>Completed</option>
      </Input>
    </FormGroup> <br /> <br />
    <Link className="btn btn-primary" to={"/"} onClick={submit}>Create Task</Link>
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
