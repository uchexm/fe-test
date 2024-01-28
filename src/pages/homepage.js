
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

function Homepage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <>
        <h3>Welcome to Full Stack Test Movie Data</h3>
        <p>Watched any movie lately? Let us know and browse our awesome catalogue of movies once you log in!</p>
        {
          user ?
            <>
              <div> Here is a list of awesom movies added by users. </div>
            </>

            :
            <>
              <Link to="/login" className="btn btn-primary me-2">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
        }

      </>
    </div>
  );
}

export default Homepage;
