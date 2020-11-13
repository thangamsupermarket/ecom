import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Header from './../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import ProductsIterator from './../ProductsIterator/ProductsIterator';
import { selectedProduct } from './../Redux/actions/selectedProduct';
import SwipeableTemporaryDrawer from "../SideNavBar/SideNavBar";

const SearchPage = (props) => {

  const [sideNavBarOpen, setSideNavBarOpen] = React.useState(false);
  const [searchRecords, setSearchRecords]= React.useState([]);

  React.useEffect(() => {
    console.log(props);
    search();
  }, []);

  const search = () => {
    // setSearchOn(true);
    const records = props.products;
    const searchBox = String(decodeURI(props.location.search.split("=")[1]));
    var records1 =  new Set(records.filter((item) => {
      return (
        String(item.prodName)
          .toLowerCase()
          .search(String(searchBox).toLowerCase()) !== -1
      );
    }));
    var records2 = new Set(records.filter((item)=>{
      return (
        String(item.prodDesc)
          .toLowerCase()
          .search(String(searchBox).toLowerCase()) !== -1
      )
    }));
    const resRecords =Array.from(new Set([...records1, ...records2]));
    setSearchRecords(resRecords);
  };

  const openSideNavBar = () => {
    setSideNavBarOpen(true);
  };

  const closeSideNavBar = () => {
    setSideNavBarOpen(false);
  };

  const onProductClick = (prodId) => {
    var selectedProduct = props.products.filter((item) => item.prodId === prodId);
    props.selectedProduct(selectedProduct[0]);
    props.history.push("/product/" + prodId);
  };

    return ( <>
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header openSideNavBar={openSideNavBar} {...props} />
          <SearchBar products={props.products}   />
          <SwipeableTemporaryDrawer
        open={sideNavBarOpen}
        onClickAway={closeSideNavBar}
      />
          <div>
    <h3>'{searchRecords.length}' result(s) for {decodeURI(props.location.search.split("=")[1])}</h3>
    {searchRecords.length !== 0 && <ProductsIterator onClick={onProductClick} products={searchRecords} /> }
    {searchRecords.length === 0 && <p>No Items found. Try a different search</p> }
          </div>
         
        </Grid>
        </Grid>
    </> );
}
 
const mapStateToProps = (state) => {
    return state;
};
  
const mapActionsToProps = {
  selectedProduct: selectedProduct,
};
  
  export default withRouter(
    connect(mapStateToProps, mapActionsToProps)(SearchPage)
  );
  