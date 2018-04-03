// referred from prof Nat Tuck's lecture on Redux http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
import React from 'react';

function User(params) {
  return <p>{params.user.name} - <Link to={"/users/" + params.user.id}>posts</Link></p>;
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return (
    <div>
    { users }
  </div>
);
}
