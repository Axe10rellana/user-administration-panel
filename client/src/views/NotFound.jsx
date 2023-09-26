//react-router-dom
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="title-not-found">404 - Página no encontrada</h1>
      <p className="message-not-found">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link className="btn-not-found" to="/dashboard">
        Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
