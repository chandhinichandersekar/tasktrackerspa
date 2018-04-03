// referred from prof Nat Tuck's lecture on Redux http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
//referred the usage of Link from https://knowbody.github.io/react-router-docs/api/Link.html
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

 function Task(params) {
  let task = params.task;
  function submit(ev) {
    api.delete_task(params.task.id);
  }

  function edit_task(ev) {
    let action = {
      type: 'UPDATE_EDIT_FORM',
      data: params.task,
    };
    params.dispatch(action);
    //api.edit_task(params.task, params.task.id);
  }

  return (
    <Card>
    <CardBody>
      <div>
        <p> Created by: <b>{ task.user.name }</b></p>
        <p> Title: { task.title } </p>
        <p> Description: { task.body } </p>
        <p> Assigned to: { task.assigned } </p>
        <p className= "text-danger"> Time spent: { task.time } minutes </p>
        <div>{ task.completed ? <p className="text-success"> Task status: Complete </p>
                : <p className="text-info">Task status: In progress </p> }
        </div>
  <Button onClick={submit} color="danger">delete task</Button>
  <div className="divider"/>
  <Link className="btn btn-primary" to={"/edit"} onClick={edit_task}>edit task</Link>
      </div>
    </CardBody>
  </Card>
);
}

function state2props(state) {
  return { form: state.form,
  users: state.users,
 };
}

// Export the result of a curried function call.
export default connect(state2props)(Task);
