import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
library.add(faSearch);
const RegisterForm = (props) => {
  const [field, setField] = useState({
    fname : "",
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
      <form onSubmit={handleOnSubmit}>
        <div className="login-form-header">
          <h3>Create Account</h3>
          <span>Enter your username and password to create an account</span>
        </div>
        <div className="form-login-group">
          <label htmlFor="fname">Full Name</label>
          <input
            type="text"
            name="fname"
            id="fname"
            placeholder="Type your fullname"
            onChange={handleOnChange}
          />
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
            onChange= {handleOnChange}
          />
        </div>
        <button>Create</button>
      </form>
      <span>
        Already have an account?{" "}
        <button onClick={props.onClickState}>sign in here</button>{" "}
      </span>
    </div>
  );
};

export default RegisterForm;
