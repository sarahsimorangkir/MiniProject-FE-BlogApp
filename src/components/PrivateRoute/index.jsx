import React from "react";
import { Route, Navigate } from "react-router-dom";
import { actionChangeGlobalRedux } from "../../config/redux/action";

const PrivateRoute = ({
  component: Component,
  path,
  children,
  isAdmin,
  ...props
}) => {
  if (props.isLogin) {
    if ((isAdmin && user.role === 1) || (!isAdmin && user.role === 0)) {
      return Component ? <Route path={path} element={<Component />} />: children;
    }

  }
  return <Navigate to="/" />;
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
  user: state.user,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
});

export default connect(reduxState, reduxDispatch)(PrivateRoute);
