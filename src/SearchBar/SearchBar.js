import React from "react";
import "./searchbar.css";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import { withRouter } from "react-router-dom";

const SearchBar = (props) => {

  const [searchTerm, setSearchTerm] = React.useState('');
  const searchInputRef = React.useRef(null);

  const onSearchOptionClick = (e) => {
    setSearchTerm(e.target.value);
  }

  const onSearchClick = () => {
    if(searchTerm !== ''){
      // props.onSearchClick(searchTerm);
      props.history.push('/search?q='+searchTerm);
    }
    else{
      searchInputRef.current.focus();
    }
   
  }

  return (
    <>
      {/* <Grid container className={"search-header"}>
            <Grid item className="div">
              <input
                placeholder="Search from 1000+ products"
                type="text"
                className="search-box"
              />
            </Grid>
          </Grid> */}
         
      <div className="wrap">
        <div className="search">
          <input
            required
            ref={searchInputRef}
            type="text"
            list="browsers"
            className="searchTerm"
            placeholder="Search from 1000+ products"
            title="Please search your need here"
            onChange={onSearchOptionClick}
          />

          <button onClick={onSearchClick} type="submit" className="searchButton">
            <SearchTwoToneIcon fontSize="small" />
          </button>
          {props.products.length !== 0 && (
            <datalist id="browsers">
              <option key={'123'} value={null} />
              {props.products.map((item, index)=> <option key={index} value={item.prodName}/>)}
            </datalist>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(SearchBar);

