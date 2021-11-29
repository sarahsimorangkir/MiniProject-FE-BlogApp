import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
library.add(faSearch);
const NavbarTop = () => {
  return (
    <div className="navbar-custom">
      <div className="navbar-custom-brand">
        <h2>BLOGMARK</h2>
      </div>
      <div className="navbar-custom-items">
        <div className="seacrh-box">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" name="" id="" />
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
