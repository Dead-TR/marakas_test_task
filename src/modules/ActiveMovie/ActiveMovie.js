import React, {useState, useEffect} from 'react';
import './ActiveMovie.css';

export const ActiveMovie = ({ openedMovie }) => {
console.log("ActiveMovie -> openedMovie", openedMovie)

  return (
    <div>
      <h1>{openedMovie.Title}</h1>
      <p>{openedMovie.Year}</p>
      <p>{openedMovie.Type}</p>
      <a href={`https://www.imdb.com/title/${openedMovie.imdbID}/`}>IMDB</a>
      <img src={openedMovie.Poster} alt={openedMovie.Title} />
    </div>
  );
};
