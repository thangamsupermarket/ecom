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
import Snackbar  from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    padding: "0 1px",
  },
}))(Badge);

const Header = (props) => {

  const [openToast, setOpenToast] = React.useState(false);

  const handleToastClose = () => {
    setOpenToast(false);
  };

  const openSideNavBar = () => {
    props.openSideNavBar();
  };

  const moveToHome = () => {
    props.history.push("/login");
  };

  const moveToCart = () => {
    if(props.auth.loggedInUserUID !== ""){
      props.history.push("/cart");
    }
    else{
      setOpenToast(true);
    }
   
  };

  


  const moveToMyProfile = () => {
    if(props.auth.loggedInUserUID !== ""){
      props.history.push('/my-profile');
    }
    else{
      setOpenToast(true);
    }
    
  }

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
          <StyledBadge onClick={moveToCart} badgeContent={props.cart.cart && props.cart.cart.length} color="secondary">
            <ShoppingCartIcon onClick={moveToCart} className="icon-item" fontSize="small" />
          </StyledBadge>
          <PersonIcon onClick={moveToMyProfile} className="icon-item" fontSize="small" />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openToast}
        autoHideDuration={3000}
        onClose={handleToastClose}
      >
        <Alert variant="filled" onClose={handleToastClose} severity={"error"}>
          Please Login First
        </Alert>
      </Snackbar>
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
