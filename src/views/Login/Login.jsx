import React, { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loginTrueRegisterFalse, setLoginTrueRegisterFalse] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [active, setActive] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);

  const toggleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const setUserNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const setUserPasswordHandler = (e) => {
    setUserPassword(e.target.value);
  };

  const setUserConfirmPasswordHandler = (e) => {
    setUserConfirmPassword(e.target.value);
  };

  const sendForm = () => {
    if (!validationError) {
      console.log("send to redux register or login");
    }
  };

  return (
    <div className="loginOrRegisterBox">
      {validationError && (
        <div className="validationError">{validationMessage}</div>
      )}
      <input
        className="inputUserName logAndRegInput"
        onChange={setUserNameHandler}
        value={userName}
      ></input>
      <input
        type={passwordShown ? "text" : "password"}
        className="inputPassword logAndRegInput"
        onChange={setUserPasswordHandler}
        value={userPassword}
      ></input>
      <div className="passwordShown" onClick={toggleShowPassword}>
        TODO eye icon
      </div>
      {!loginTrueRegisterFalse && (
        <input
          className="confirmPasswordInput logAndRegInput"
          type={passwordShown ? "text" : "password"}
          onChange={setUserConfirmPasswordHandler}
          value={userConfirmPassword}
        >
          {" "}
        </input>
      )}
      <div className="signInOrRegisterButton"></div>
      <div className={`sendFormButton ${active}`} onClick={sendForm}>
        {loginTrueRegisterFalse ? "Login" : "Register"}
      </div>
    </div>
  );
}
