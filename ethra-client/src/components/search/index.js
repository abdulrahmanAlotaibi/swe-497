import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import "./index.scss";


function Search() {

  return (
    <TextField
      className="search"
      label="What you want to learn?"
      variant="filled"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton>
              <SearchIcon className="search__icon" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default Search;
