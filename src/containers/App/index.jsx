import React, { Component } from "react";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { actionChangeGlobalRedux } from "../../config/redux/action";
import { connect } from "react-redux";
import Home from "../Home";
import NavbarTop from "../../components/NavbarTop";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import FeedsDetail from "../FeedsDetail";
import CreateBlog from "../CreateBlog";
import OwnArticle from "../OwnArticle";
import EditBlog from "../EditBlog";
import PrivateRoute from "../../components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrap-content">
          <NavbarTop />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/feeds/detail/:type/:index" component={FeedsDetail} />
            <PrivateRoute path="/createblog" component={CreateBlog} />
            <PrivateRoute path="/yourarticle" component={OwnArticle} />
            <PrivateRoute path="/editblog/:index" component={EditBlog} />
          </Switch>
        </div>
        <Footer />
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
