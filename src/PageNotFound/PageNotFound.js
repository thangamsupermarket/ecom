import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function PageNotFound(props) {
  return (
    <Fragment>
      <div className="pagenotfound">
        <h1> 404 Error. Page Not Found </h1>
        <Link className="link" to={"/dashboard"}>
          Click Here to go to Dashboard
        </Link>
      </div>
    </Fragment>
  );
}

export default PageNotFound;
