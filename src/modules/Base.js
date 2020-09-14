import React, {useState, useEffect} from 'react';
import './Base.css';
import { Search } from './Search/Search';
import { Result } from './Result/Result';

const Base = () => {
  const [title, SetTitle] = useState('');
  const [type, SetType] = useState('');
  const [year, SetYear] = useState('');
  const [page, SetPage] = useState('1');
  const [update, SetUpdate] = useState(false);
  const [story, SetStory] = useState([]);
  const [movieList, SetMovieList] = useState([]);

  const baceURL = `http://www.omdbapi.com/?s=${title}&type=${type}&y=${year}&page=${page}&apikey=925bbb84`;

  const getMovie = async(event) => {
    if (event) {event.preventDefault()}

    await (await fetch(baceURL)).json()
      .then((data) => {
        SetMovieList([data]);
      })
      .catch((data) => {
        SetMovieList([]);
      });

    SetUpdate(false);
  };

  useEffect(() => {
    return () => {
      getMovie()
    }
  }, [update])

  return (
    <div>
      <section>
        <Search
          getMovie={getMovie}
          SetTitle={SetTitle}
          SetType={SetType}
          SetYear={SetYear}
        />

        {
          (movieList.length > 0 && movieList[0].Response === 'True')
            && (
              <Result
                movies={movieList[0].Search}
                page={page}
                SetUpdate={SetUpdate}
                SetPage={SetPage}
                getMovie={getMovie}
                pageNumber={Math.ceil((movieList[0].totalResults / 10))}
              />
            )
        }
      </section>
    </div>
  );
};

export default Base;
