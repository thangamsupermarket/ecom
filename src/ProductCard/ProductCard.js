import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SwipeableTemporaryDrawer from "../SideNavBar/SideNavBar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Button, CardActions, CardHeader } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { addToCart } from "./../Redux/actions/cartActions";
import { connect } from "react-redux";
// import { selectedProduct } from './../Redux/actions/selectedProduct';
import firebase from "firebase";

function Alert(props) {
  return (
    <MuiAlert
      style={{ marginTop: "2px" }}
      elevation={6}
      variant="filled"
      {...props}
    />
  );
}

const ProductCard = (props) => {
  const [sideNavBarOpen, setSideNavBarOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [addToCartText, setAddToCartText] = useState("Add To Cart");
  const addToCartBtnRef = React.useRef(null);
  // console.log(props);
  const { selectedProduct } = props;

  const addToFirebase = (cart, loggedInUserUID) => {
    const db = firebase.firestore();
    if (loggedInUserUID !== "") {
      db.collection("users")
        .doc(loggedInUserUID)
        .set({
          wishlist: cart,
        })
        .then((res) => {})
        .catch((err) => {});
    }
  };

  const addToCart = () => {
    // console.log(props);
    if (props.auth.loggedInUserUID === "") {
      setOpenToast(true);
      setToastMsg("Please Login First");
      // props.history.push("/login-user");
    } else {
      const cartArr = props.cart.cart;
      cartArr.push(selectedProduct.product.prodId);
      props.addToCart(cartArr, props.auth.loggedInUserUID);
      addToFirebase(cartArr, props.auth.loggedInUserUID);
      setOpenToast(true);
      setToastMsg("Added to Cart successfully");
      setAddToCartText("Add To Cart");
      addToCartBtnRef.current.disabled = true;
    }
  };

  const handleToastClose = () => {
    setOpenToast(false);
  };

  const openSideNavBar = () => {
    setSideNavBarOpen(true);
  };

  const closeSideNavBar = () => {
    setSideNavBarOpen(false);
  };

  const handleBuyNow = () => {
    props.history.push("/cart");
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header openSideNavBar={openSideNavBar} {...props} />
          <SearchBar />
        </Grid>
      </Grid>

      <SwipeableTemporaryDrawer
        open={sideNavBarOpen}
        onClickAway={closeSideNavBar}
      />

      <Card raised={false}>
        <CardActionArea>
          <h3>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {selectedProduct.product.prodCategory}
          </h3>
          <CardContent>
            <img
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
              }}
              src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
              width="300"
              height="300"
              alt="product"
            />

            <CardHeader
              title={selectedProduct.product.prodName}
              subheader={selectedProduct.product.prodDesc}
            />

            <CardActions>
              <h2>₹{selectedProduct.product.prodPrice}</h2>
            </CardActions>

            <div>
              <Button
                size={"large"}
                style={{ width: "49.5%" }}
                variant="contained"
                color="primary"
                disableElevation
                onClick={addToCart}
                ref={addToCartBtnRef}
                endIcon={<ShoppingCartIcon />}
              >
                {addToCartText}
              </Button>
              &nbsp;
              <Button
                size={"large"}
                style={{ width: "49.5%", margin: "auto" }}
                variant="contained"
                color="secondary"
                disableElevation
                onClick={handleBuyNow}
                endIcon={<ShoppingBasketIcon />}
              >
                Buy Now
              </Button>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openToast}
        autoHideDuration={3000}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity={toastMsg === "Please Login First" ? "error" : "success"}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapActionsToProps = {
  addToCart: addToCart,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(ProductCard)
);
