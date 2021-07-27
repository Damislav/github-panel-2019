import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ setAlert, searchUsers, showClear, clearUsers }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      searchUsers(text);

      //text to empty
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          onChange={handleChange}
          type="text"
          name="text"
          value={text}
          placeholder="Search users"
        />{" "}
        <button
          value="Submit"
          type="submit"
          style={{ marginBottom: ".5rem" }}
          className="w-100 btn btn-dark btn-block  "
        >
          Submit
        </button>
      </form>

      {showClear && (
        <button
          onClick={clearUsers}
          className="w-100 btn btn-dark btn-block mt-2 mb-2"
        >
          Clear
        </button>
      )}
    </div>
  );
};
// static propTypes = {
//   searchUsers: PropTypes.func.isRequired,
//   clearUsers: PropTypes.func.isRequired,
//   showClear: PropTypes.bool.isRequired,
//   setAlert: PropTypes.func.isRequired,
// };
export default Search;
