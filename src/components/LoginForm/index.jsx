import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  actionChangeGlobalRedux,
  actionLogin,
} from "../../config/redux/action";
import "./index.css";
import Loading from "../../assets/img/icon/loading.gif";
library.add(faSearch);

const LoginForm = (props) => {
  const [field, setField] = useState({
    email: "",
    password: "",
  });
  const [error, setErrror] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOnChange = (event) => {
    let tmp = field;
    tmp[event.currentTarget.name] =  event.currentTarget.value;
    setField(tmp);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    props
      .loginProcess(field)
      .then((result) => {       
        setErrror("");
        setLoading(false);
        let modal = document.getElementById("modal-auth");
        modal.classList.add("hide")
      })
      .catch((err) => {
        setLoading(false);
        if (err === 401) {
          setErrror("Periksa kembali email atau password");
        } else {
          setErrror("Sedang ada masalah pada server, coba lagi");
        }
      });
  };
  return (
    <div className="auth-form">
      <form onSubmit={handleOnSubmit}>
        <div className="login-form-header">
          <h3>Sign In</h3>
          <span>Enter your Email and Password</span>
        </div>
        {error !== "" && <div className="error-message">{error}</div>}
        <div className="form-login-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Type your email"
            onChange={handleOnChange}
           
          />
        </div>
        <div className="form-login-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Type your password"
            onChange={handleOnChange}
            
          />
        </div>
        <button type="submit">
          {loading ? <img src={Loading} alt="" /> :  "Login"}           
        </button>
      </form>
      <span>
        No account? Let's{" "}
        <button onClick={props.onClickState}>create one</button>{" "}
      </span>
    </div>
  );
};

const reduxState = (state) => ({
  isLogin: state.isLogin,
});
const reduxDispatch = (dispatch) => ({
  changeGlobalRedux: (data) => dispatch(actionChangeGlobalRedux(data)),
  loginProcess: (data) => dispatch(actionLogin(data)),
});

export default connect(reduxState, reduxDispatch)(LoginForm);
