import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation } from "@apollo/client";
import { gql } from 'graphql-tag';
import { useNavigate } from "react-router-dom";
import { LOAD_MOVIES } from "./movies";

const ADD_MOVIE = gql`
  mutation CreateMovie($movieInput: MovieInput) {
    createMovie(movieInput: $movieInput) {
      name
      description
    }
  }
`;

function AddMovie() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [addNewMovie] = useMutation(ADD_MOVIE, {
    update(cache, { data: { createMovie } }) {
      const { getMovies } = cache.readQuery({
        query: LOAD_MOVIES
      });
      cache.writeQuery({
        query: LOAD_MOVIES,
        data: { getMovies: [createMovie, ...getMovies] }
      });
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!context.user) {
      navigate('/login');
      return;
    }
    if (name !== '' && description !== '') {
      addNewMovie({
        variables: {
          movieInput: {
            name: name,
            description: description
          }
        }
      });
      setName('');
      setDescription('');
    } else {

    }
  }

  return (
    <div className="container mt-5">
      <h3>Add Movie</h3>
      <p>Add a new movie below!</p>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Movie Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Movie name" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <input type="text" className="form-control" id="description" name="description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Movie description" />
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
  );
}

export default AddMovie;
