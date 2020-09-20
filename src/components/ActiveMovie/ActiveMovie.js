import React from 'react';
import PropTypes from 'prop-types';
import './ActiveMovie.css';

export const ActiveMovie = ({ openedMovie, SetOpenedMovie }) => {
  const close = () => {
    SetOpenedMovie(null);
  };

  return (
    <section
      className="active-movie"
      onClick={(event) => {
        if (event.target.className === 'active-movie') {
          close();
        }
      }}
    >
      <div className="active-movie__item">
        <div className="active-movie__data">
          <h1 className="active-movie__title">{openedMovie.Title}</h1>
          <p className="active-movie__text">Year: {openedMovie.Year}</p>
          <p className="active-movie__text">Type: {openedMovie.Type}</p>
          <a
            className="active-movie__link"
            target="blank"
            href={`https://www.imdb.com/title/${openedMovie.imdbID}/`}
          >
            IMDB
          </a>
          <div
            className="active-movie__close"
            onClick={(event) => close()}
          />
        </div>
        {
          openedMovie.Poster === 'N/A'
            ? (
              <img
                src="/img/no-img.png"
                alt={openedMovie.Title}
                className="active-movie__img"
              />
            )
            : (
              <img
                src={openedMovie.Poster}
                alt={openedMovie.Title}
                className="active-movie__img"
              />
            )
        }
      </div>
    </section>
  );
};

ActiveMovie.propTypes = {
  openedMovie: PropTypes.objectOf(PropTypes.string).isRequired,
  SetOpenedMovie: PropTypes.func.isRequired,
};
