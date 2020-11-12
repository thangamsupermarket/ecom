import { Grid } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Header from "./../Header/Header";
import SwipeableTemporaryDrawer from "../SideNavBar/SideNavBar";
import firebase from "firebase";
import { connect } from "react-redux";
import ProductsIterator from './../ProductsIterator/ProductsIterator';
import '../ProductsIterator/product.css';
import { selectedProduct } from './../Redux/actions/selectedProduct';

const SearchPage = (props) => {
  const [sideNavBarOpen, setSideNavBarOpen] = React.useState(false);
  const [allProductsArr, setAllProductsArr] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isPropsAvailable, setIsPropsAvailable] = React.useState(false);
  const [searchOn, setSearchOn] = React.useState(false);
  const [searchRecords, setSearchRecords] =  React.useState([]);
  const getProductsData = () => {

    if (props.products !== undefined && props.products.length !== 0) {
        setIsPropsAvailable(true);
      return;
    }

    var db = firebase.firestore();
    var recArr = [];
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const idObj = { id: doc.id };
          const obj = { ...idObj, ...doc.data() };
          recArr.push(obj);
          updateProducts(recArr);
        });
      });
  };

  React.useEffect(() => {
    setSearchQuery(decodeURI(props.location.search.split("=")[1]));
    getProductsData();
    search();
  }, [props]);

  const updateProducts = (products) => {
    setAllProductsArr(products);
    props.updateProducts(products);
  };

  const search = () => {
    const records = props.products.length !== 0 ? props.products : allProductsArr;
    console.log('54,', records, ",",decodeURI(props.location.search.split("=")[1]));
    var records1 = new Set(records.filter((item) => {
      return (
        String(item.prodName)
          .toLowerCase()
          .search(String(decodeURI(props.location.search.split("=")[1])).toLowerCase()) !== -1
      );
    }));
    console.log('62', records1);
    var records2 = new Set(records.filter((item)=>{
      return (
        String(item.prodDesc)
          .toLowerCase()
          .search(String(decodeURI(props.location.search.split("=")[1])).toLowerCase()) !== -1
      )
    }));
    console.log('70', records2);
    // if(this.items.indexOf(item) === -1) {
    //     this.items.push(item);
    //     console.log(this.items);
    // }
    // var resRecords = records1.concat(records2);
    var resRecords = Array.from(new Set([...records1, ...records2]));

    setSearchRecords(resRecords);
    setSearchOn(true);
    console.log('74',resRecords);
  };

  const openSideNavBar = () => {
    setSideNavBarOpen(true);
  };

  const closeSideNavBar = () => {
    setSideNavBarOpen(false);
  };

  const onProductClick = (prodId) => {
    var selectedProduct = searchRecords.filter((item) => item.prodId === prodId);
    props.selectedProduct(selectedProduct[0]);
    props.history.push("/product/" + prodId);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header openSideNavBar={openSideNavBar} {...props} />
          <SearchBar
            products={
              props.products.length !== 0 ? props.products : allProductsArr
            }
          />
          <h3>'{searchRecords.length}' Results for {searchQuery}</h3>
          {
              searchOn && <ProductsIterator onClick={onProductClick} products={searchRecords} />
          }

        </Grid>
      </Grid>

      <SwipeableTemporaryDrawer
        open={sideNavBarOpen}
        onClickAway={closeSideNavBar}
      />

      
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapActionsToProps = {
    selectedProduct: selectedProduct,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(SearchPage));
