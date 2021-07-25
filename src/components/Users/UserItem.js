import React from "react";

const UserItem = ({ user }) => {
  console.log(user);
  return (
    <div>
      {user.login}
      <img src={user.avatar_url} />
    </div>
  );
};

export default UserItem;
