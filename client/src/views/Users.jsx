//react
import { useState, useEffect } from "react";

//react-router-dom
import { Link } from "react-router-dom";

//sweetalert2
import Swal from "sweetalert2";

//context
import { useStateContext } from "../context/ContextProvider";

//axios
import axiosClient from "../axios-client";

//assets
import loader from "../assets/icons/loader.svg";

const Users = () => {
  //state variables
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  //context
  const { setNotification } = useStateContext();

  //useEffect
  useEffect(() => {
    getUsers();
  }, []);

  //functions
  const onDelete = (user) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "You will not be able to undo this action",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/users/${user.id}`).then(() => {
          setNotification("User was successfully delete");
          getUsers();
        });
        Swal.fire("Deleted", "Item has been deleted", "success");
      }
    });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  <img
                    style={{ pointerEvents: "none" }}
                    src={loader}
                    alt="Loading..."
                  />
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={`/users/${u.id}`}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      // eslint-disable-next-line no-unused-vars
                      onClick={(ev) => onDelete(u)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Users;
