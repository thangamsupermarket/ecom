import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    padding: "0 1px",
  },
}))(Badge);

const Header = (props) => {
  const openSideNavBar = () => {
    props.openSideNavBar();
  };

  const moveToHome = () => {
    props.history.push("/login");
  };

  const moveToCart = () => {
    props.history.push("/cart");
  };

  return (
    <>
      <Grid container className={"mobile-header"}>
        <Grid item onClick={openSideNavBar}>
          <MenuIcon onClick={openSideNavBar} fontSize="small" />
        </Grid>
        <Grid item onClick={moveToHome}>
          <span className="item">Thangam Supermarket</span>
        </Grid>
        <Grid container className="social-icons">
          <NotificationsIcon className="icon-item" fontSize="small" />
          <StyledBadge onClick={moveToCart} badgeContent={props.cart.cart.length} color="secondary">
            <ShoppingCartIcon onClick={moveToCart} className="icon-item" fontSize="small" />
          </StyledBadge>
          <PersonIcon className="icon-item" fontSize="small" />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

// const mapActionsToProps = {
//   addToCart: addToCart,
// };

export default withRouter(connect(mapStateToProps, null)(Header));
