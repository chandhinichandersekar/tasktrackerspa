// referred from prof Nat Tuck's lecture on Redux http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import { NavLink, Link } from 'react-router-dom';

function EditForm(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    if (tgt.attr('name') == "completed") {
      if(tgt.val()=="In Progress") {
      data['completed'] = false;
      }
      else{
        data['completed'] = true;
      }
    }
    let action = {
      type: 'UPDATE_EDIT_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function submit(ev) {
    api.submit_task(params.form);
  }

  function edit(ev) {
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
    <h2>Edit Task</h2>
    <FormGroup>
      <Label for="user_id">Your User ID</Label>
      <Input type="textarea" name="user_id" value={params.form.user_id} onChange={update}>
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
      <Input type="number" name="time" step="15" min="0" value={params.form.time} onChange={update} required/>
    </FormGroup>
    <FormGroup>
      <Label for="completed" className="completedLabel">Task status</Label>
      <Input className="completedInput" type="select" name="completed" value={params.form.completed ? "Completed" : "In Progress" } onChange={update} >
        <option>In Progress</option>
          <option>Completed</option>
      </Input>
    </FormGroup> <br /> <br /> <br /> <br />
    <Button onClick={clear}>Clear</Button>
     <div className="divider"/>
      <Link className="btn btn-primary" to={"/"} onClick={edit}>Save edited Task</Link>
  </div>
);
}

function state2props(state) {
  return { form: state.editform,
  users: state.users,
 };
}

// Export the result of a curried function call.
export default connect(state2props)(EditForm);
