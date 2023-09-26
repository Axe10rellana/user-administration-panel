//react
import { useState, useEffect } from "react";

//react-router-dom
import { useNavigate, useParams } from "react-router-dom";

//context
import { useStateContext } from "../context/ContextProvider";

//axios
import axiosClient from "../axios-client";

//assets
import loader from "../assets/icons/loader.svg";

const UserForm = () => {
  //router variables
  const { id } = useParams();
  const navigate = useNavigate();

  //state variables
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  //context variables
  const { setNotification } = useStateContext();

  //validations
  if (id) {
    //useEffect
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  //functions
  const onSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post(`/users`, user)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New user</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            <img
              style={{ pointerEvents: "none" }}
              src={loader}
              alt="Loading..."
            />
          </div>
        )}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} autoComplete="off">
            <input
              className=""
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              className=""
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              className=""
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              className=""
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Password Confirmation"
              onChange={(e) =>
                setUser({ ...user, password_confirmation: e.target.value })
              }
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
};

export default UserForm;
