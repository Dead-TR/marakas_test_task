import React, {useState, useEffect} from 'react';
import './Base.css';
import { Search } from './Search/Search';
import { Result } from './Result/Result';
import { Story } from './Story/Story';
import { ActiveMovie } from './ActiveMovie/ActiveMovie';

const Base = () => {
  const [title, SetTitle] = useState('');
  const [openedMovie, SetOpenedMovie] = useState(null);
  const [type, SetType] = useState('');
  const [year, SetYear] = useState('');
  const [page, SetPage] = useState('1');
  const [update, SetUpdate] = useState(false);
  const [story, SetStory] = useState([]);
  const [movieList, SetMovieList] = useState(JSON.parse(localStorage.getItem('savedMovie')) || []);

  console.log("Base -> story", story)
  const baceURL = `http://www.omdbapi.com/?s=${title}&type=${type}&y=${year}&page=${page}&apikey=925bbb84`;

  const getMovie = async(event) => {
    if (event) event.preventDefault();

    SetStory([
      ...story,
      {
        title,
        year,
        type,
        id: Date.now(),
      },
    ]);

    await (await fetch(baceURL)).json()
      .then((data) => {
        SetMovieList(data);
        localStorage.setItem('savedMovie', JSON.stringify(data));
      })
      .catch((data) => {
        SetMovieList([]);
      });

    SetUpdate(false);
  };

  useEffect(() => () => getMovie(), [update]);

  return (
    <div>
      <section>
        <Search
          getMovie={getMovie}
          SetTitle={SetTitle}
          SetType={SetType}
          SetYear={SetYear}
        />

        <Story
          story={story}
        />

        {
          (openedMovie !== null)
            && (
              <ActiveMovie
                openedMovie={openedMovie}
              />
            )
        }

        {
          (Object.keys(movieList).length > 0 && movieList.Response === 'True')
            && (
              <Result
                movies={movieList.Search}
                page={page}
                SetUpdate={SetUpdate}
                SetPage={SetPage}
                getMovie={getMovie}
                SetOpenedMovie={SetOpenedMovie}
                pageNumber={Math.ceil((movieList.totalResults / 10))}
              />
            )
        }
      </section>
    </div>
  );
};

export default Base;
