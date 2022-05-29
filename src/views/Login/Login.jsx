import axios from "axios";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//TODO add loader

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loginTrueRegisterFalse, setLoginTrueRegisterFalse] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [active, setActive] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentPassword = useRef("");
  const currentUserName = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const token = useSelector((state) => state.userToken);
  // if (token) {
  //   useNavigate("/home");
  // }

  const apiLoginOrRegister = async (user, password, loginTrueRegisterFalse) => {
    console.log(user, password);
    errorModal(false, true, "");
    setIsLoading(true);
    const axiosPath = { path: "" };

    if (loginTrueRegisterFalse) {
      axiosPath.path = "login";
    } else {
      axiosPath.path = "register";
    }
    // const tokenAndUserInfo = axios.get("/login",{headers:{"Authorization":`bearer ${}`}});
    try {
      const tokenAndUserInfo = await axios.post(
        // `http://localhost:5000/user/${axiosPath.path}`,
        `http://localhost:5000/user/${axiosPath.path}`,

        {
          username: user,
          password: password,
        }
      );

      console.log(tokenAndUserInfo);
      dispatch({
        type: "userToken",
        userToken: tokenAndUserInfo.data.accessToken,
      });
      dispatch({
        type: "userName",
        userToken: tokenAndUserInfo.data.user.userName,
      });
      dispatch({ type: "userId", userToken: tokenAndUserInfo.data.user._id });
      navigate("/home");
    } catch (error) {
      errorModal(true, true, "invalid credentials");
      console.log(error);
    }
  };

  const errorModal = (valError, active, errorMessage) => {
    setValidationError(valError);
    setActive(active);
    setValidationMessage(errorMessage);
  };

  const loginOrRegister = () => {
    setLoginTrueRegisterFalse(!loginTrueRegisterFalse);
  };

  const toggleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const setUserNameHandler = (e) => {
    console.log(currentUserName.current.value);
    setUserName(e.target.value);
  };

  const setUserPasswordHandler = (e) => {
    errorModal(true, false, "password must be at least 6 characters");
    setUserPassword(e.target.value);
    if (e.target.value.length > 5) {
      errorModal(false, true, "");
    }
  };

  const setUserConfirmPasswordHandler = (e) => {
    errorModal(true, false, "passwords do not match");
    setUserConfirmPassword(e.target.value);
    if (e.target.value === currentPassword.current.value) {
      errorModal(false, true, "");
    }
  };

  const sendForm = () => {
    if (!validationError) {
      apiLoginOrRegister(
        currentUserName.current.value,
        currentPassword.current.value,
        loginTrueRegisterFalse
      );
    }
  };

  return (
    <div className="loginOrRegisterBox">
      {validationError && (
        <div className="validationError">{validationMessage}</div>
      )}
      <input
        className="inputUserName logAndRegInput"
        ref={currentUserName}
        onChange={setUserNameHandler}
        // value={userName}
      ></input>
      <input
        type={passwordShown ? "text" : "password"}
        className="inputPassword logAndRegInput"
        ref={currentPassword}
        onChange={setUserPasswordHandler}
        // value={userPassword}
      ></input>
      <div className="passwordShown" onClick={toggleShowPassword}>
        TODO eye icon
      </div>
      {!loginTrueRegisterFalse && (
        <input
          className="confirmPasswordInput logAndRegInput"
          type={passwordShown ? "text" : "password"}
          onChange={setUserConfirmPasswordHandler}
          // value={userConfirmPassword}
        ></input>
      )}
      (
      <div className="signInOrRegisterButton" onClick={loginOrRegister}>
        {loginTrueRegisterFalse
          ? "not a member? register now"
          : "already registered? sign in"}
      </div>
      )
      <div className={`sendFormButton ${active}`} onClick={sendForm}>
        {loginTrueRegisterFalse ? "Login" : "Register"}
      </div>
    </div>
  );
}
