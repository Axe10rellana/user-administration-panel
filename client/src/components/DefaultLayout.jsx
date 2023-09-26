//react
import { useEffect } from "react";

//react-router-dom
import { Link, Navigate, Outlet } from "react-router-dom";

//context
import { useStateContext } from "../context/ContextProvider";

//axios
import axiosClient from "../axios-client";

const DefaultLayout = () => {
  //context
  const { user, token, notification, setUser, setToken } = useStateContext();

  //validations
  if (!token) {
    return <Navigate to="/login" />;
  }

  //functions
  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  //useEffect
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="defaultLayout">
      <aside className="aside-responsive">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "0.5rem",
            }}
          >
            <p>{user.name}</p>
            <a href="#" onClick={onLogout} className="btn-logout">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default DefaultLayout;
