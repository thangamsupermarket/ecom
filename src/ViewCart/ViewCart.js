import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SwipeableTemporaryDrawer from "../SideNavBar/SideNavBar";
import { connect } from "react-redux";
import firebase from "firebase";
import CartIterator from "../CartIterator/CartIterator";

const ViewCart = (props) => {
    const [productsArr, setProductsArr] = React.useState([]);
    const [sideNavBarOpen, setSideNavBarOpen] = useState(false);
  
  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    var db = firebase.firestore();
    var recArr = [];
    props.cart.cart.forEach((item) => {
      db.collection("products")
        .where("prodId", "==", item)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const idObj = { id: doc.id };
            const obj = { ...idObj, ...doc.data() };
            recArr.push(obj);
            setProductsArr(recArr);
          });
        });
    });
  };

  const openSideNavBar = () => {
    setSideNavBarOpen(true);
  };

  const closeSideNavBar = () => {
    setSideNavBarOpen(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header openSideNavBar={openSideNavBar} {...props} />
          <SearchBar />
        </Grid>
        <div>
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Cart:</h3>

          <CartIterator
            onClick={()=> {}}
            products={productsArr}
          />
        </div>
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

// const mapActionsToProps = {
//   addToCart: addToCart,
// };

export default withRouter(connect(mapStateToProps, null)(ViewCart));
