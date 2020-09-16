import React, { useState } from 'react';
import './Result.css';
import { Pages } from './Pages/Pages';

export const Result = ({
  SetUpdate,
  movies,
  page,
  pageNumber,
  SetPage,
  getMovie,
  SetOpenedMovie
}) => {

  return (
    <section>
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <a
              href="/#"
              onClick={(event) => {
                event.preventDefault();
                SetOpenedMovie({...movie});
              }}
            >
              <h1>{movie.Title}</h1>
              <p>{movie.Year}</p>
              <p>{movie.Type}</p>
              <img src={movie.Poster} alt={movie.Title} />
            </a>
          </li>
        ))}
      </ul>

      <div>
        <Pages
          activePage={page}
          pagesNumber={pageNumber}
          SetPage={SetPage}
          getMovie={getMovie}
          SetUpdate={SetUpdate}
        />
      </div>
    </section>
  );
};
