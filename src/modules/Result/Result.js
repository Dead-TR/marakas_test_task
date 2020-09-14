import React, { useState } from 'react';
import './Result.css';
import { Pages } from './Pages/Pages';

export const Result = ({ SetUpdate, movies, page, pageNumber, SetPage, getMovie }) => {

  return (
    <section>
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
            <p>{movie.Type}</p>
            <img src={movie.Poster} alt={movie.Title} />
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
