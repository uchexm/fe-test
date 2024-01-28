import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { gql } from 'graphql-tag';

export const LOAD_MOVIES = gql`
  query GetMovies {
    getMovies {
      name
      description
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
      {movies.map((val, index) => (

        <li key={index}>
          <strong>{val.name}</strong>: {val.description}
        </li>

      ))}

    </div>
  );
}

export default Movies;
