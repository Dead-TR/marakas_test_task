import React, { useState } from 'react';
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
  const [inputTitle, SetInputTitle] = useState(store.getState().title);
  const [inputYear, SetInputYear] = useState(store.getState().year);
  const [inputType, SetInputType] = useState(store.getState().type);

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
          value={inputTitle}
          onChange={(event) => {
            SetInputTitle(event.target.value);
            store.dispatch(title({'title': event.target.value}));
          }}
        />
        <select
          className="search__type"
          value={inputType}
          onChange={(event) => {
            SetInputType(event.target.value || '');
            store.dispatch(type({'type': event.target.value}));
          }}
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
          <option value="game">Game</option>
        </select>
        <input
          type="number"
          placeholder="Year"
          className="search__year"
          value={inputYear}
          onChange={(event) => {
            SetInputYear(event.target.value);
            (event.target.value.length === 0 || event.target.value.length === 4)
              && store.dispatch(year({'year': event.target.value}));
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
