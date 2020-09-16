import React, { useState, useEffect } from 'react';
import './Search.css';

export const Search = ({ SetTitle, SetType, SetYear, getMovie }) => {
  const [inputYear, SetInputYear] = useState('');
  console.log("Search -> inputYear", inputYear)

  const yearSearch = (inputText) => {
    SetInputYear(inputText
      .split('')
      .filter((symbol) => {
        if (symbol.match(/[0-9]/g)) {
          return symbol;
        }

        return '';
      })
      .join(''),
    );
  };

  useEffect(() => {
    if (inputYear.length === 4 || inputYear.length === 0) {
      return SetYear(inputYear);
    }
  }, [inputYear]);

  return (
    <section className="search">
      <form onSubmit={(event) => { getMovie(event) }}>
        <input
          type="text"
          placeholder="Title"
          className="search__title"
          onChange={(event) => {
            SetTitle(event.target.value);
          }}
        />
        <select
          className="search__type"
          onChange={(event) => { SetType(event.target.value) }}
          defaultValue="empty"
        >
          <option value="empty" disabled>Type</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <input
          type="text"
          placeholder="Year"
          className="search__year"
          value={inputYear}
          onChange={(event) => {
            yearSearch(event.target.value);
          }}
        />
        <button
          className="search__btn"
          type="submit"
        >
          Search
        </button>
      </form>
    </section>
  );
};
