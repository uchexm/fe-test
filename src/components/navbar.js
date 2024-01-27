import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('./');
  }

  console.log(user);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Full Stack Test</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {
              user ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={onLogout} to="/logout">Logout</Link>
                  </li>
                </>

                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
            }


          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;