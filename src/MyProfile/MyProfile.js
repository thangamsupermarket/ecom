import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Header from "./../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SwipeableTemporaryDrawer from "../SideNavBar/SideNavBar";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './myprofile.css';

// import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const MyProfile = (props) => {
  const [sideNavBarOpen, setSideNavBarOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    contactPhone: "",
    addressType: "",
    doorNo: "",
    street: "",
    city: "",
    landmark: "",
    state: "",
    instructions: "",
  });

  const [openToast, setOpenToast] = React.useState(false);

  const handleToastClose = () => {
    setOpenToast(false);
  };

  React.useEffect(() => {
      setValues({
        name: props.profile.name,
        email: props.profile.email,
        contactPhone: props.profile.contactPhone,
        addressType: props.profile.addressType,
        doorNo: props.profile.doorNo,
        street: props.profile.street,
        city: props.profile.city,
        landmark: props.profile.landmark,
        state: props.profile.state,
        instructions: props.profile.instructions,
      });
  }, [props])

  const openSideNavBar = () => {
    setSideNavBarOpen(true);
  };

  const closeSideNavBar = () => {
    setSideNavBarOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const updateProfile = () => {
    const db = firebase.firestore();
    if (props.auth.loggedInUserUID !== "") {
      db.collection("users")
        .doc(props.auth.loggedInUserUID)
        .set({
          profile: values,
        }, { merge: true })
        .then((res) =>{
          setOpenToast(true);
        })
        .catch((err) => {});
    }
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

     
      <div id="login-form">
      <div id="login-field">
      <h3>My Profile</h3>
      <TextField
        variant="outlined"
        className="form-field"
        name="name"
        label="Name"
        value={values.name}
        onChange={handleChange("name")}
      /></div>
      <div id="login-field">
      <TextField
        variant="outlined"
        label="Email"
        className="form-field"
        name="email"
        value={values.email}
        // disabled
        onChange={handleChange("email")}
      />
      </div>
      <div id="login-field">
      <TextField
        variant="outlined"
        className="form-field"
        label="Contact Phone"
        name="contactPhone"
        value={values.contactPhone}
        onChange={handleChange("contactPhone")}
      />
      </div>
      <h4>Address</h4>
      <div id="login-field">
      <TextField
        variant="outlined"
        className="form-field"
        name="addressType"
        label="Address Type"
        value={values.addressType}
        onChange={handleChange("addressType")}
      />
      </div>
      <div id="login-field">
      <TextField
        variant="outlined"
        className="form-field"
        label="Door No"
        name="doorNo"
        value={values.doorNo}
        onChange={handleChange("doorNo")}
      />
      </div>
      <div id="login-field">
      <TextField
        variant="outlined"
        label="Street/Block"
        className="form-field"
        name="street"
        value={values.street}
        onChange={handleChange("street")}
      />
      </div>
      <div id="login-field">
      <TextField
        variant="outlined"
        label="City"
        className="form-field"
        value={values.city}
        name="city"
        onChange={handleChange("city")}
      />
      </div>
      <div id="login-field">
      <TextField
        variant="outlined"
        className="form-field"
        label="Landmark"
        name="landmark"
        value={values.landmark}
        onChange={handleChange("landmark")}
      />
      </div>
      <div id="login-field">
      <TextField
        variant="outlined"
        className="form-field"
        name="state"
        label="State"
        value={values.state}
        onChange={handleChange("state")}
      />
      </div>
      <div id="login-field">
      <TextField
        variant="outlined"
        className="form-field"
        name="instructions"
        label="Delivery Instructions"
        value={values.instructions}
        onChange={handleChange("instructions")}
      />
      </div>
      <div id="login-field">
      <Button onClick={updateProfile} style={{padding: '10px 83px'}} variant="contained" color="primary">
        Update 
      </Button>
      </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openToast}
        autoHideDuration={3000}
        onClose={handleToastClose}
      >
        <Alert variant="filled" onClose={handleToastClose} severity={"success"}>
          Profile Updated Successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

// const mapActionsToProps = {
//   updateLoggedInUser: updateLoggedInUser,
// };

export default withRouter(
  connect(mapStateToProps, null)(MyProfile)
);
