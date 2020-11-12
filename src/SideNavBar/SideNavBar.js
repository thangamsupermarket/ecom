import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import "./sideNavBar.css";
import { createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import firebase from "firebase";

//Material UI Imports
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateLoggedInUser } from "./../Redux/actions/authActions";
import InfoIcon from "@material-ui/icons/Info";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

//For Avatar Display
const avatarStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  })
);

//For Card Avatar
const cardStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: "red",
    },
  })
);

const SwipeableTemporaryDrawer = (props) => {
  const classes = useStyles();
  const avatarClasses = avatarStyles();
  const cardClasses = cardStyles();
  
  const moveToProfile = () => {
    if (props.auth.loggedInUserUID !== "") {
      props.history.push("/my-profile");
    } else {
      // console.log('display toast here');
    }
  };

  const moveToCart = () => {
    if (props.auth.loggedInUserUID !== "") {
      props.history.push("/cart");
    } else {
      // console.log('display toast here');
    }
  };

  const moveToMyRequests = () => {};

  const moveToRaiseRequest = () => {};

  const moveToNotifications = () => {};

  const logoutUser = (e) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // localStorage.removeItem("uid");
        props.updateLoggedInUser("");
        props.history.push("/login"); //Move to Login Route on Logout
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loginUser = () => {
    props.history.push("/login-user");
  };

  const signUp = () => {
    props.history.push("/signup");
  }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => props.onClickAway()}
      onKeyDown={() => props.onClickAway()}
    >
      <List>
        {props.auth.loggedInUserUID !== "" ? (
          <>
            <ListItem onClick={moveToProfile}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </ListItem>
            <ListItem onClick={moveToCart}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText>My Cart</ListItemText>
            </ListItem>
            <ListItem onClick={moveToMyRequests}>
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText>My Orders</ListItemText>
            </ListItem>
            <ListItem onClick={moveToRaiseRequest}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText>My Wishlist</ListItemText>
            </ListItem>{" "}
          </>
        ) : null}
        <ListItem onClick={moveToNotifications}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText>Contact Shop Owner</ListItemText>
        </ListItem>
        {props.auth.loggedInUserUID !== "" ? (
          <ListItem onClick={logoutUser}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        ) : null}
        {props.auth.loggedInUserUID === "" ? (
          <>
          <ListItem onClick={loginUser}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </ListItem>
           <ListItem onClick={signUp}>
           <ListItemIcon>
             <PersonAddIcon />
           </ListItemIcon>
           <ListItemText>Signup</ListItemText>
         </ListItem>
         </>
        ) : null}
      </List>
      <Divider />
      <List></List>
    </div>
  );

  return (
    <div>
      <ErrorBoundary>
        <React.Fragment>
          <SwipeableDrawer
            anchor="left"
            className={avatarClasses.root}
            open={props.open}
            onClose={() => props.onClickAway()}
            onOpen={() => {
              // console.log();
            }}
          >
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <Card className={cardClasses.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={cardClasses.avatar}>
                    {props.profile.name && props.profile.name[0]}
                  </Avatar>
                }
                title={props.profile.name}
                subheader={
                  <span>
                    {" "}
                    {props.profile.name
                      ? "Verified Customer"
                      : "Unknown User"}{" "}
                  </span>
                }
              />
            </Card>
            {list()}
          </SwipeableDrawer>
        </React.Fragment>
      </ErrorBoundary>
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapActionsToProps = {
  updateLoggedInUser: updateLoggedInUser,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(SwipeableTemporaryDrawer)
);
