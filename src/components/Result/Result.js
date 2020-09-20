import React from 'react';
import './Result.css';
import { Pages } from './Pages/Pages';

export const Result = ({
  store,
  SetUpdate,
  movies,
  pageNumber,
  SetPage,
  SetOpenedMovie
}) => {

  return (
    <section className="result">
      <ul className="result__list">
        {movies.map(movie => (
          <li key={movie.imdbID} className="result__item">
            <a
              href="/#"
              onClick={(event) => {
                event.preventDefault();
                SetOpenedMovie({...movie});
              }}
            >
              <div className="result__item-data">
                <h1 className="result__item-title">{movie.Title}</h1>
                <p className="result__item-year">{movie.Year}</p>
              </div>
              {
                movie.Poster === 'N/A'
                  ? (
                    <img
                      src="/img/no-img.png"
                      alt={movie.Title}
                      className="result__item-poster"
                    />
                  )
                  : (
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="result__item-poster"
                    />
                  )
              }
            </a>
          </li>
        ))}
      </ul>

      <div>
        <Pages
          store={store}
          pagesNumber={pageNumber}
          SetPage={SetPage}
          SetUpdate={SetUpdate}
        />
      </div>
    </section>
  );
};
