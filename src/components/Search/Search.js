import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import {
  title,
  type,
  year,
  page,
} from '../../redux-modules/Reducer';
import { Story } from '../Story/Story';

export const Search = ({ store, SetUpdate, story, SetStory }) => {
  const [inputYear, SetInputYear] = useState('');

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
      store.dispatch(year({'year': inputYear}));
    }
  }, [inputYear]);

  return (
    <section className="search" id="search-bar">
      <form
        className="search__form"
        onSubmit={(event) => {
          event.preventDefault();
          store.dispatch(page({'page': 1}));
          SetUpdate(true);

          SetStory([
            ...story,
            {
              ...store.getState(),
              id: Date.now(),
            },
          ]);
        }}
      >
        <input
          type="text"
          placeholder="Title"
          className="search__title"
          onChange={(event) => {
            store.dispatch(title({'title': event.target.value}));
          }}
        />
        <select
          className="search__type"
          onChange={(event) => {
            store.dispatch(type({'type': event.target.value}));
          }}
          defaultValue=""
        >
          <option value="" disabled>Type</option>
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
          <option value="game">Game</option>
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

      <Story
        SetUpdate={SetUpdate}
        store={store}
        story={story}
      />
    </section>
  );
};

Search.propTypes = {
  story: PropTypes.arrayOf(PropTypes.object).isRequired,
  store: PropTypes.objectOf(PropTypes.func).isRequired,
  SetUpdate: PropTypes.func.isRequired,
  SetStory: PropTypes.func.isRequired,
};
