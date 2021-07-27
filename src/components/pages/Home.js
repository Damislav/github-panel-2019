import React, { Fragment } from "react";
import Search from "../layout/Search";
import Users from "../Users/Users";

const Home = () => {
  return (
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
};

export default Home;
