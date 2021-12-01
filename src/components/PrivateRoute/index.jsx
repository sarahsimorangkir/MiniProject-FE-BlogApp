import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { actionChangeGlobalRedux } from "../../config/redux/action";

const PrivateRoute = ({
  component: Component,
  path,
  children,
  isAdmin,
  ...props
}) => {
  if (props.isLogin) {
    if (
      (isAdmin && props.user.role === 0) ||
      (!isAdmin && props.user.role === 1)
    ) {
      return Component ? <Route path={path} component={Component} /> : children;
    }
  }
  return <Redirect to="/" />;
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
  user: state.user,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
});

export default connect(reduxState, reduxDispatch)(PrivateRoute);
