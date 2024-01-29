import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { gql } from 'graphql-tag';

export const LOAD_MOVIES = gql`
  query GetMovies {
    getMovies {
      name
      description
      createdBy
    }
  }
`;

function Movies() {
  const { error, loading, data } = useQuery(LOAD_MOVIES);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data && data.getMovies) {
      setMovies(data.getMovies);
    }
  }, [data]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <strong>Movie Name: </strong><span>{movie.name}</span><br />
            <strong>Description: </strong><span>{movie.description}</span><br />
            <strong>Created By: </strong><span>{movie.createdBy}</span>
          </li>

        ))}
      </ul>
    </div>
  );
}

export default Movies;
