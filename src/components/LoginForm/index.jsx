import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./index.css";
library.add(faSearch);

const LoginForm = (props) => {
    const [field, setField] = useState({
      email : "",
      password : ""
    })
    const handleOnChange = (event) =>{
      let tmp = field
      tmp[event.currentTarget.name] = event.currentTarget.value
      setField(tmp)
    }
    const handleOnSubmit = (event)=>{
      event.preventDefault()
      console.log(field)
    }
  return (
    <div className="auth-form">
      <form onSubmit = {handleOnSubmit}>
        <div className="login-form-header">
          <h3>Sign In</h3>
          <span>Enter your Email and Password</span>
        </div>
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
        <button type="submit">Login</button>
      </form>
      <span>
        No account? Let's{" "}
        <button onClick={props.onClickState}>create one</button>{" "}
      </span>
    </div>
  );
};

export default LoginForm;
