import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 *  state layout:
 *  {
 *   tasks: [... Tasks ...],
 *   users: [... Users ...],
 *   form: {
 *     user_id: null,
 *     body: "",
 *     title: "",
 *     completed: false,
 *     time: null
 *   }
 * }
 *
 * */

 function tasks(state = [], action) {
   switch (action.type) {
   case 'TASKS_LIST':
     return [...action.tasks];
   case 'ADD_TASK':
     return [action.task, ...state];
   default:
     return state;
   }
 }

 function users(state = [], action) {
   switch (action.type) {
   case 'USERS_LIST':
     return [...action.users];
     case 'ADD_USER':
       return [action.user, ...state];
   default:
     return state;
   }
 }

let empty_form = {
  user_id: "",
  body: "",
  title: "",
  time: 0,
  assigned: "",
  completed: false,
  token: "",
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
      case 'CLEAR_FORM':
        return empty_form;
      case 'SET_TOKEN':
        return Object.assign({}, state, action.token);
      default:
        return state;
  }
}


function editform(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_EDIT_FORM':
      return Object.assign({}, state, action.data);
      case 'CLEAR_FORM':
        return empty_form;
      case 'SET_TOKEN':
        return Object.assign({}, state, action.token);
      default:
        return state;
  }
}

let empty_user= {
  name: "",
  pass: "",
};

function userform(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_USER_FORM':
      return Object.assign({}, state, action.data);
      case 'CLEAR_USER_FORM':
        return empty_user;
      default:
        return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, token, login, userform, editform});
  //let reducer = combineReducers({tasks, users, form});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
