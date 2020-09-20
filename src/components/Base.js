import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import './Base.css';

import { Search } from './Search/Search';
import { Result } from './Result/Result';
import { ActiveMovie } from './ActiveMovie/ActiveMovie';
import { Loader } from './Loader/Loader';

import { reducer } from '../redux-modules/Reducer';

const initialState = {
  title: '',
  type: '',
  year: '',
  page: '1',
};

const store = createStore(
  reducer,
  JSON.parse(localStorage.getItem('imdbMovieList_savedState')) || initialState,
);
let baceURL;

const Base = () => {
  store.subscribe(() => {
    localStorage
      .setItem('imdbMovieList_savedState', JSON.stringify(store.getState()));

    baceURL = `http://www.omdbapi.com/?s=${
      store.getState().title
    }&type=${
      store.getState().type
    }&y=${
      store.getState().year
    }&page=${
      store.getState().page
    }&apikey=925bbb84`;
  });

  (store.getState().title === '')
      && localStorage.removeItem('imdbMovieList_savedMovie');

  const [openedMovie, SetOpenedMovie] = useState(null);
  const [story, SetStory] = useState([]);

  const [update, SetUpdate] = useState(false);
  const [movieList, SetMovieList] = useState(
    JSON.parse(localStorage.getItem('imdbMovieList_savedMovie')) || [],
  );

  const getMovie = async() => {
    await (await fetch(baceURL)).json()
      .then((data) => {
        SetMovieList(data);
        localStorage.setItem('imdbMovieList_savedMovie', JSON.stringify(data));
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      })
      .catch(() => {
        document.location.reload();
      });

    SetUpdate(false);
  };

  useEffect(() => () => getMovie(), [update]);

  return (
    <section className="base">
      <Search
        SetUpdate={SetUpdate}
        store={store}
        story={story}
        SetStory={SetStory}
      />

      {
        (update === true)
          && <Loader />
      }

      {
        (openedMovie !== null)
          && (
            <ActiveMovie
              openedMovie={openedMovie}
              SetOpenedMovie={SetOpenedMovie}
            />
          )
      }

      {
        (movieList.Response === 'True')
          ? (
            <Result
              store={store}
              movies={movieList.Search}
              SetUpdate={SetUpdate}
              SetOpenedMovie={SetOpenedMovie}
              pageNumber={Math.ceil((movieList.totalResults / 10))}
            />
          )
          : (
            <div className="bace__error">
              <p className="bace__error-message">
                {movieList.Error}
              </p>
            </div>
          )
      }
    </section>
  );
};

export default Base;
