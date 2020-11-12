import * as React from "react";
import {HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "../Login/Login";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProductCard from "../ProductCard/ProductCard";
import  ViewCart from '../ViewCart/ViewCart';
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from './../SignupForm/SignupForm';
import MyProfile from './../MyProfile/MyProfile';
import SearchPage from "../SearchPage/SearchPage";

const Routing = (props) => {

  return (
    <React.Fragment>
      <HashRouter basename="/">
        <Switch>
          <Route
            exact
            path="/tsm/"
            render={() => <Redirect to="/login" />}
          />
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/product/:id" render={() => <ProductCard />} />
          <Route exact path="/cart" render={() => <ViewCart />} />
          <Route exact path="/login-user" render={() => <LoginForm />} />
          <Route exact path="/signup" render={() => <SignupForm />} />
          <Route exact path="/my-profile" render={() => <MyProfile />} />
          <Route exact path="/search" render={() => <SearchPage />} />
          <Route
            render={() => (
              <React.Fragment>
                <ErrorBoundary>
                  <PageNotFound />
                </ErrorBoundary>
              </React.Fragment>
            )}
          />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
};

export default Routing;
