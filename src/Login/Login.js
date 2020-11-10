import * as React from "react";
import "./login.css";
import Grid from "@material-ui/core/Grid";
import SwipeableTemporaryDrawer from "../SideNavBar/SideNavBar";
import ProductsIterator from "../ProductsIterator/ProductsIterator";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import firebase from "firebase";
import { connect } from "react-redux";
import { selectedProduct } from "./../Redux/actions/selectedProduct";
import { updateLoggedInUser } from "../Redux/actions/authActions";
import { addToCart } from "./../Redux/actions/cartActions";

const Login = (props) => {
  const [sideNavBarOpen, setSideNavBarOpen] = React.useState(false);
  const [productsArr, setProductsArr] = React.useState([]);

  React.useEffect(() => {
    getCurrentUser();
    getData();
  }, []);

  React.useEffect(() => {
    console.log(props);
  }, [props]);

  const getCurrentUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null && user !== undefined) {
        localStorage.setItem("uid", user.uid);
        console.log("user", user);
        props.updateLoggedInUser(user.uid);
        fetchCartInfo(user.uid);
      }
      if (user === null || user === undefined) {
        props.addToCart([]);
        // props.history.push("/login");
        console.log("no user");
      }
    });
  };

  const fetchCartInfo = (uid) => {
    console.log(uid);
    const db = firebase.firestore();
    var recArr = [];
    db.collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        var rec = doc.data();
        recArr = rec.wishlist;
        props.addToCart(doc.data().wishlist);
      } else {
        console.log("No such document!");
      }
    })
    .catch( (err)=> console.log(err));
  }

  const getData = () => {
    var db = firebase.firestore();
    var recArr = [];
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const idObj = { id: doc.id };
          const obj = { ...idObj, ...doc.data() };
          recArr.push(obj);
          setProductsArr(recArr);
          console.log(recArr);
        });
      });
  };

  const openSideNavBar = () => {
    setSideNavBarOpen(true);
  };

  const closeSideNavBar = () => {
    setSideNavBarOpen(false);
  };

  const onProductClick = (prodId) => {
    var selectedProduct = productsArr.filter((item) => item.prodId === prodId);
    console.log(selectedProduct);
    props.selectedProduct(selectedProduct[0]);
    props.history.push("/product/" + prodId);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header openSideNavBar={openSideNavBar} {...props} />
          <SearchBar />
          <ProductsIterator onClick={onProductClick} products={productsArr} />
        </Grid>
      </Grid>
      <SwipeableTemporaryDrawer
        open={sideNavBarOpen}
        onClickAway={closeSideNavBar}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapActionsToProps = {
  addToCart: addToCart,
  selectedProduct: selectedProduct,
  updateLoggedInUser: updateLoggedInUser,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login));
