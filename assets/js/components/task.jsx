import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

export default function Task(params) {
  let task = params.task;
  function submit(ev) {
    console.log("Should delete post.");
    console.log(params.task.id);
    api.delete_task(params.task.id);
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
        { task.completed ? <p className="text-success"> Task status: Complete </p>
 : <p className="text-info">Task status: In progress </p> }
  <Button onClick={submit} color="primary">Delete Task</Button>
  
      </div>
    </CardBody>
  </Card>
);
}
