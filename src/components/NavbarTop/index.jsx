import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./index.css";
import { connect } from "react-redux";
import { actionChangeGlobalRedux } from "../../config/redux/action";
import Dummy from "../../assets/img/dummy/dummyProfile.png";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
library.add(faSearch);


const NavbarTop = (props) => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(1)
  const [searchKey, setSearchKey] = useState("")
  const handleOnClickDropdown = (event) => {
    let target = document.getElementById("dropdown-profile");
    if (target.classList.contains("hide")) {
      target.classList.remove("hide");
    } else {
      target.classList.add("hide");
    }
  };
  const handleOnClickYourArticle = (event) => {
    navigate("/");
  };
  const handleOnClickLogout = (event) => {
    localStorage.clear();
    props.changeGlobalRedux({ type: "CHANGE_LOGIN", value: false });
    props.changeGlobalRedux({ type: "CHANGE_USER", value: null });
  };
  const handleOnClickSign = (event) => {
    let target = document.getElementById("modal-auth");
    if (target.classList.contains("hide")) {
      target.classList.remove("hide");
    } else {
      target.classList.add("hide");
    }
  };
  const handleWindowOnClick = (event) => {
    let modal = document.getElementById("modal-auth");
    if (modal !== null) {
      if (
        !event.path.includes(modal) &&
        !event.path.includes(document.getElementById("sign-btn"))
      ) {
        modal.classList.add("hide");
      }
    }
    let btnDropdown = document.getElementById("dropdown-profile");
    if (btnDropdown !== null) {
      if (
        !event.path.includes(btnDropdown) &&
        !event.path.includes(document.getElementById("dropdown-login"))
      ) {
        btnDropdown.classList.add("hide");
      }
      console.log(btnDropdown);
    }
  };

  const handleOnChangeSearch = (event) =>{
      setSearchKey(event.currentTarget.value)
  }

  const handleOnClickSearch = (event) =>{
      event.preventDefault()
      console.log(searchKey)
      
  }

  useEffect(() => {
    window.addEventListener("click", handleWindowOnClick, false);
  });
  return (
    <div className="navbar-custom">
      <div className="navbar-custom-brand">
        <h2>BLOGMARK</h2>
      </div>
      <div className="navbar-custom-items">
        <div className="search-box">
          <form onSubmit={handleOnClickSearch}>
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input type="text" name="key" id="key" placeholder="Search Here..." onChange= {handleOnChangeSearch} value={searchKey} />
          </form>
        </div>
        <button>Create Blog</button>
        {!props.isLogin && (
          <span onClick={handleOnClickSign} id="sign-btn">
            Sign In
          </span>
        )}
        {props.isLogin && (
          <div className="navbar-profile">
            <img
              src={Dummy}
              alt=""
              className="shadow-sm"
              id="dropdown-login"
              onClick={handleOnClickDropdown}
            />
            <div
              className="dropdown-item-custom shadow hide"
              id="dropdown-profile"
            >
              <span onClick={handleOnClickYourArticle}>Your Article </span>
              <span onClick={handleOnClickLogout}>Log out</span>
            </div>
          </div>
        )}
      </div>
      <div className="modal-auth hide shadow" id="modal-auth">
        {loginForm === 1 && <LoginForm  onClickState  = {()=>{
            setLoginForm(0)
        }}/>}
        {loginForm === 0 && <RegisterForm onClickState  = {()=>{
            setLoginForm(1)
        }} />}
      </div>
    </div>
  );
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
});

export default connect(reduxState, reduxDispatch)(NavbarTop);
