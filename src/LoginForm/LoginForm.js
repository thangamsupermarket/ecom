import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SwipeableTemporaryDrawer from "../SideNavBar/SideNavBar";
import { connect } from "react-redux";
import firebase from "firebase";
// import CartIterator from "../CartIterator/CartIterator";
import {
  Backdrop,
  Button,
  CircularProgress,
  FilledInput,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import './loginForm.css';

const useStylesBackDrop = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const LoginForm = (props) => {

  const classesBackDrop = useStylesBackDrop();
  const [sideNavBarOpen, setSideNavBarOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const openSideNavBar = () => {
    setSideNavBarOpen(true);
  };

  const closeSideNavBar = () => {
    setSideNavBarOpen(false);
  };

  const handleOnLogin = () => {
    // e.preventDefault();
    setOpenBackDrop(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        // console.log(res);
        props.history.push("/login");
      })
      .catch((err) => {
        setOpenBackDrop(false);
        // console.log(err);
        if (err.code === "auth/wrong-password") {
          setAuthMessage("The Email or Password is incorrect.");
        }
        else if(err.code === "auth/user-not-found"){
          setAuthMessage("No Account found. Please sign up.");
        }
      });
  };

  const closeBackDrop = (e) => {
    setOpenBackDrop(false);
  };

  const goToSignUp = () => {
    props.history.push('/signup');
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header openSideNavBar={openSideNavBar} {...props} />
          {/* <SearchBar /> */}
        </Grid>
        <div id="login-form">
          <form>
          <p style={{color: 'red'}}>{authMessage}</p>
              <div id="login-field">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={values.email}
              onChange={handleChange("email")}
            />
            </div>
            <div id="login-field">
            <FilledInput
              id="filled-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            </div>
            <Button onClick={handleOnLogin} variant="contained" color="primary">
              Login
            </Button>
          </form>

          <p>Don't have an Account? <span onClick={goToSignUp} style={{ textDecoration: 'underline', color: 'blue'}}>Create New Account</span></p>
        </div>
      </Grid>
      <SwipeableTemporaryDrawer
        open={sideNavBarOpen}
        onClickAway={closeSideNavBar}
      />
       <Backdrop
        className={classesBackDrop.backdrop}
        open={openBackDrop}
        onClick={closeBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

// const mapActionsToProps = {
//   addToCart: addToCart,
// };

export default withRouter(connect(mapStateToProps, null)(LoginForm));
