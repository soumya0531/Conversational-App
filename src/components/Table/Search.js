import React, { useRef } from "react";
import PropTypes from "prop-types";
import { FormGroup, Input, Form, Button } from "reactstrap";

const Search = ({ onClear, onSearch }) => {
  const inputRef = useRef();
  const handleChange = () => {
    onSearch(inputRef.current.value);
  };

  const handleEnterKey = (event) => {
    // Currently enter key submits the form and causes
    // an issue in search. So disabling it.
    if (event.which === 13) event.preventDefault();
  };
  return (
    <Form onKeyDown={(e) => handleEnterKey(e)}>
      <FormGroup className="d-flex w-100">
        <Input
          innerRef={inputRef}
          type="text"
          placeholder="Search..."
          onChange={() => handleChange()}
        />
        <Button
          color="danger"
          className="ml-3 px-4"
          onClick={() => {
            onClear();
            inputRef.current.value = "";
          }}
        >
          Clear
        </Button>
      </FormGroup>
    </Form>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
};

export default Search;
