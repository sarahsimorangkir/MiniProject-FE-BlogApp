import React, { Component } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { actionChangeGlobalRedux } from "../../config/redux/action";
import { connect } from "react-redux";
import Home from "../Home";
import NavbarTop from "../../components/NavbarTop";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrap-content">
          <NavbarTop />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
const reduxState = (state) => ({
  isLogin: state.isLogin,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
});

export default connect(reduxState, reduxDispatch)(App);
