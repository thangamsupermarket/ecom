import React from "react";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';

import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import { connect } from 'react-redux';
import { addToCart } from './../Redux/actions/cartActions';

const CartProductStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 100,
    height: 100,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const CartProduct = (props) => {
  const [quantity, setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState(props.cartItem.prodPrice);
  const classes = CartProductStyles();
  const SubtractBtnRef = React.useRef(null);
  // console.log(props);

  const addQuantity = () => {
    if (quantity < props.cartItem.prodQuantity) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      setPrice(props.cartItem.prodPrice * newQty);
    }
  };

  const minusQuantity = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      setPrice(props.cartItem.prodPrice * newQty);
    }
  };

  const deleteItem = () => {
    props.deleteItem(props.cartItem.prodId);
  }

  return (
    <>
      <div style={{ marginLeft: "15px" }}>
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {props.cartItem.prodName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.cartItem.prodDesc}
              </Typography>
              <Typography variant="h6" component="h6">
                ₹{price}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton ref={SubtractBtnRef} onClick={minusQuantity} aria-label="previous">
                <IndeterminateCheckBoxRoundedIcon />
              </IconButton>
              <IconButton aria-label="quantity">
                <p>Qty:{quantity}</p>
              </IconButton>
              <IconButton onClick={addQuantity} aria-label="next">
                <AddBoxRoundedIcon />
              </IconButton> 
              <IconButton onClick={deleteItem} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
            title="Live from space album cover"
          />
        </Card>
      </div>
      <br />
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionsToProps = {
  addToCart: addToCart,
};

export default connect(mapStateToProps, mapActionsToProps)(CartProduct);