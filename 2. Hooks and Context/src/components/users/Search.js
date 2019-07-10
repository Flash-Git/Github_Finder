import React, { useState } from 'react';
import PropTypes from "prop-types";

const Search= ({ searchUsers, setAlert, showClear, clearUsers }) => {
  const [text, setText] = useState("");
  
  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if(text === ""){
      setAlert("Please enter something", "light");
    }else{
      searchUsers(text);
      setText("");
    }
  };

  return <div>
    <form className="form" onSubmit={ onSubmit }>
      <input
        type="text"
        name="text"
        placeholder="Search Users..."
        value={ text }
        onChange={ onChange }
      />
      <input
        type="submit"
        value="Search"
        className="btn btn-dark btn-block"
      />
    </form>
    { showClear &&(
      <button className="btn btn-light btn-block" onClick={ clearUsers }>
        Clear
      </button>
    ) }
  </div>;
};

Search.propTypes = {
  showClear: PropTypes.bool.isRequired,
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;