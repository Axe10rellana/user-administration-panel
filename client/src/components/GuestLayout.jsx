//react-router-dom
import { Navigate, Outlet } from "react-router-dom";

//context
import { useStateContext } from "../context/ContextProvider";

const GuestLayout = () => {
  //context
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/users" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default GuestLayout;
