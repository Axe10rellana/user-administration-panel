//react
import { useRef, useState } from "react";

//react-router-dom
import { Link } from "react-router-dom";

//axios
import axiosClient from "../axios-client";

//context
import { useStateContext } from "../context/ContextProvider";

const Signup = () => {
  //state variables
  const [errors, setErrors] = useState(null);

  //useRef variables
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  //context
  const { setUser, setToken } = useStateContext();

  //functions
  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit} autoComplete="off">
          <h1 className="title">Signup for free</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input
            className=""
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
          />
          <input
            className=""
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
          />
          <input
            className=""
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <input
            className=""
            ref={passwordConfirmationRef}
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Password Confirmation"
          />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already Registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
