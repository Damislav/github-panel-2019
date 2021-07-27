import React from "react";
import spinner from "./../../_resources/html_css_theme/img/spinner.gif";
const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        alt="loading"
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </>
  );
};

export default Spinner;
