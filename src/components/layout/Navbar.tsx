import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/fbConfig";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar: FC<any> = ({auth, data}) => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Plan
        </Link>
        {auth ? <SignedInLinks data={data}/> : <SignedOutLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
