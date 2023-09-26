//react
import { useRef, useState } from "react";

//react-router-dom
import { Link } from "react-router-dom";

//axios
import axiosClient from "../axios-client";

//context
import { useStateContext } from "../context/ContextProvider";

const Login = () => {
  //state variables
  const [errors, setErrors] = useState(null);

  //useRef variables
  const emailRef = useRef();
  const passwordRef = useRef();

  //context
  const { setUser, setToken } = useStateContext();

  //functions
  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setErrors(null);

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit} autoComplete="off">
          <h1 className="title">Login into your account</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
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
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
