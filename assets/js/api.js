// referred from prof Nat Tuck's lecture on Redux http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
// referred from prof Nat Tuck's lecture on Associations and AJAX http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/14-assoc-and-ajax/notes.html
//referred from my previous assignment https://github.com/chandhinichandersekar/tasktracker2
import store from './store';

class TheServer {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_task(data) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
       data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
      },
    });
  }

  delete_task(task_id) {
    $.ajax("/api/v1/tasks"+ "/" + task_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
       data: "",
      success: (resp) => {
      this.request_tasks();
      },
    });
  }

  edit_task(data,task_id) {
    $.ajax("/api/v1/tasks"+ "/" + task_id, {
      method: "patch",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
       data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {
        this.request_tasks();
      },
    });
  }

submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
    });
  }

  submit_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
       data: JSON.stringify({user: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
      },
    });
  }


}


export default new TheServer();
