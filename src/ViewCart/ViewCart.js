import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SwipeableTemporaryDrawer from "../SideNavBar/SideNavBar";
import { connect } from "react-redux";
import firebase from "firebase";
import CartIterator from "../CartIterator/CartIterator";
// import './viewcart.css';
import { addToCart } from "./../Redux/actions/cartActions";

const ViewCart = (props) => {
  const [productsArr, setProductsArr] = React.useState([]);
  const [sideNavBarOpen, setSideNavBarOpen] = useState(false);
  // setDeleteFlag(!deleteFlag);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [emptyCartMsg, setEmptyCartMsg] = useState("");
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [dummyValue, setDummyValue] = useState(false);
  React.useEffect(() => {
    getData();
    console.log(props);
    setIsCartEmpty(props.cart.cart.length === 0 ? true : false);
    setEmptyCartMsg(props.auth.loggedInUserUID === "" ? "Please login to see your cart": "No Items in Your cart");
  }, []);

  // React.useEffect( ()=> {
  //   console.log("cart length", props.cart.cart.length);;
  //   setIsCartEmpty(true);
  //   setEmptyCartMsg(props.cart.cart.length === 0 ? "No Items in Your cart ": "" );
  //   setDummyValue(!dummyValue);
  // }, [props]);

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
      // console.log(recArr);
    });
  };

  const openSideNavBar = () => {
    setSideNavBarOpen(true);
  };

  const closeSideNavBar = () => {
    setSideNavBarOpen(false);
  };

  const deleteCartItem = (prodId) => {
    // console.log(prodId);
    const index = props.cart.cart.indexOf(prodId);
    const cart = props.cart.cart;
    // console.log(cart);
    // console.log(index);
    cart.splice(index, 1);
    productsArr.splice(index, 1);
    setDeleteFlag(!deleteFlag);
    props.addToCart(cart);
    addToFirebase(cart, props.auth.loggedInUserUID);
  };

  const addToFirebase = (cart, loggedInUserUID) => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(loggedInUserUID)
      .set({
        wishlist: cart,
      })
      .then((res) =>{})
      .catch((err) => {});
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
            onClick={() => {}}
            products={productsArr}
            deleteSelectedItem={deleteCartItem}
            emptyCart={isCartEmpty}
            emptyCartMessage={emptyCartMsg}
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

const mapActionsToProps = {
  addToCart: addToCart,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(ViewCart)
);
