import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import Movies from '../components/movies';

function Homepage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      {user ? (
        <>
          <h3>OUR LOVED MOVIE DATA</h3>
          <div> Here is a list of the awesome movies added by our users. </div>
          <Movies />
        </>
      ) : (
        <>
          <h3>Welcome to Full Stack Test Movie Data</h3>
          <p>Watched any movie lately? Let us know and browse our awesome catalogue of movies once you log in!</p>
          <Link to="/login" className="btn btn-dark me-2">Login</Link>
          <Link to="/register" className="btn btn-dark">Register</Link>
        </>
      )}
    </div>
  );
}

export default Homepage;
