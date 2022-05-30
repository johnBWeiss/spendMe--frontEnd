import axios from "axios";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Container from "../../UI_Helpers/customFlexContainer";
import backgroundImage from "../../Assets/images/bannerImage1.jpg";
//TODO add loader

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loginTrueRegisterFalse, setLoginTrueRegisterFalse] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [active, setActive] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentPassword = useRef("");
  const currentUserName = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userToken);
  // if (token) {
  //   window.location.href = "http://localhost:3000/home";
  // }
  //TODO

  const apiLoginOrRegister = async (
    username,
    password,
    loginTrueRegisterFalse
  ) => {
    errorModal(false);
    setIsLoading(true);

    const axiosPath = { path: "" };

    if (loginTrueRegisterFalse) {
      axiosPath.path = "login";
    } else {
      axiosPath.path = "register";
    }
    try {
      errorModal(false);

      const tokenAndUserInfo = await axios.post(
        `http://localhost:5000/user/${axiosPath.path}`,
        {
          username,
          password,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(tokenAndUserInfo.data));

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
      errorModal(true, "inactive", "invalid credentials");
      setTimeout(() => {
        errorModal(false);
      }, 2000);
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
    //TODO is this necessary?
    setUserName(e.target.value);
  };

  const setUserPasswordHandler = (e) => {
    errorModal(true, "inactive", "password must be at least 6 characters");
    setUserPassword(e.target.value); //TODO is this necessary?

    if (e.target.value.length > 5) {
      errorModal(false);
    }
  };

  const setUserConfirmPasswordHandler = (e) => {
    errorModal(true, "inactive", "passwords do not match");
    setUserConfirmPassword(e.target.value);
    if (e.target.value === currentPassword.current.value) {
      errorModal(false);
    }
  };

  const sendForm = () => {
    console.log("sendForm");
    if (!validationError) {
      apiLoginOrRegister(
        currentUserName.current.value,
        currentPassword.current.value,
        loginTrueRegisterFalse
      );
    }
  };

  return (
    <Container
      backgroundImage={backgroundImage}
      height="90vh"
      margin-bottom="0%"
    >
      <div className="loginOrRegisterBox">
        <label htmlFor="userName">user name</label>
        <input
          name="userName"
          className="inputUserName logAndRegInput"
          ref={currentUserName}
          onChange={setUserNameHandler}
          // value={userName}
        ></input>
        <label htmlFor="password">password</label>
        <input
          type={passwordShown ? "text" : "password"}
          className="inputPassword logAndRegInput"
          ref={currentPassword}
          onChange={setUserPasswordHandler}
          // value={userPassword}
        ></input>

        {!loginTrueRegisterFalse && (
          <input
            className="confirmPasswordInput logAndRegInput"
            type={passwordShown ? "text" : "password"}
            onChange={setUserConfirmPasswordHandler}
            // value={userConfirmPassword}
          ></input>
        )}
        {validationError && (
          <div className="validationError">{validationMessage}</div>
        )}

        <div
          className={`sendFormButton logAndRegInput ${active}`}
          onClick={sendForm}
        >
          <span> {loginTrueRegisterFalse ? "Login" : "Register"}</span>
        </div>
        <div className="smallTextContainer">
          <div className="passwordShown" onClick={toggleShowPassword}>
            {!passwordShown ? "show password" : "hide password"}
          </div>
          <div className="signInOrRegisterButton" onClick={loginOrRegister}>
            {loginTrueRegisterFalse
              ? "not a member? register now"
              : "already registered? sign in"}
          </div>
        </div>
      </div>
    </Container>
  );
}
