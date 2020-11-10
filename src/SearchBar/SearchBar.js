import React from 'react';
import Grid from "@material-ui/core/Grid";

const SearchBar = (props) => {

    return ( <>
      <Grid container className={"search-header"}>
            <Grid item className="div">
              <input
                placeholder="Search from 1000+ products"
                type="text"
                className="search-box"
              />
            </Grid>
          </Grid>
    </> );
}
 
export default SearchBar;