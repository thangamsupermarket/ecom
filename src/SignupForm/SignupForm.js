import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SwipeableTemporaryDrawer from "../SideNavBar/SideNavBar";
import { connect } from "react-redux";
import firebase from "firebase";
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
import '../LoginForm/loginForm.css';
const useStylesBackDrop = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SignupForm = (props) => {

  const classesBackDrop = useStylesBackDrop();
  const [sideNavBarOpen, setSideNavBarOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [values, setValues] = React.useState({
    email: "",
    name: "",
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

  const handleSignup = () => {
    // console.log(values);
    setOpenBackDrop(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        alert("Account Created Successfully ! Please Login Now");
        props.history.push("/login");
      })
      .catch((err) => {
        // console.log(err);
        setOpenBackDrop(false);
        if(err.code === "auth/email-already-in-use"){
          setAuthMessage("Email already in use.");
        }
        else{
          setAuthMessage(err.message);
        }
      });
  };

  const closeBackDrop = (e) => {
    setOpenBackDrop(false);
  };

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
              label="Full Name"
              variant="outlined"
              value={values.name}
              onChange={handleChange("name")}
            /></div>
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
            <Button onClick={handleSignup} variant="contained" color="primary">
              Sign up
            </Button>
          </form>
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

export default withRouter(connect(mapStateToProps, null)(SignupForm));
