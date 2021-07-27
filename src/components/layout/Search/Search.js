import React from "react";
import PropTypes from "prop-types";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({
        text: "",
      });
    }
  };
  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            className="m-2 form-control"
            onChange={this.handleChange}
            type="text"
            name="text"
            value={this.state.text}
            placeholder="Search users"
          />{" "}
          <button
            value="Submit"
            type="submit"
            className="w-100 btn btn-dark btn-block"
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
  }
}

export default Search;
