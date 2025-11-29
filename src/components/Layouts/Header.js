import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import "./header.css";

const Header = (props) => {

  return (
    <Fragment>
      <header className="header">
        <h3>T-shirts</h3>
        <HeaderCartButton className="cart" onCartClick={props.onCartClick} />
      </header>
    </Fragment>
  )
}

export default Header;