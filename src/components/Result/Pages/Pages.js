import React from 'react';
import './Pages.css';
import { page as setPage } from '../../../redux-modules/Reducer';

export const Pages = ({ store, pagesNumber, SetUpdate }) => {
  const pages = [];
  const activePage = store.getState().page;

  for (let i = 0; i < pagesNumber; i++) {
    pages.push(i + 1);
  }

  const keys = [...pages];
  const pagesSplicer = (page) => {
    pages.splice(page, 1);

    if (pages[page - 1] !== '...') {
      pages.splice(page, 0, '...');
      page++;
    }

    return page - 1;
  };

  for (let page = 0; page < pages[page]; page++) {
    if (page > 0 && pages[page] < Number(pagesNumber)) {

      if (pages[page] < Number(activePage) - 2) {
        page = pagesSplicer(page);
      }
      else if (pages[page] > Number(activePage) + 2) {
        page = pagesSplicer(page);
      }
    }
  }

  const activePageClass = "pages__item pages__disable pages__active";
  const threeDotClass = "pages__item pages__disable";

  return (
    <section className="pages">
      <ul className="pages__list">
        {
          pages.map((page, i) => {

            if ((page === '...') || (page === Number(activePage))) {
              let assignedClass;

              (page === Number(activePage))
                ? assignedClass = activePageClass
                : assignedClass = threeDotClass;

              return (
                <li
                  className={assignedClass}
                  key={keys[i]}
                >
                  {page}
                </li>
              );
            }

            else {
              return (
                <li
                  className="pages__item"
                  key={keys[i]}
                  onClick={(event) => {
                    store.dispatch(setPage({'page': event.target.innerText}));
                    SetUpdate(true)
                  }}
                >
                  {page}
                </li>
              )
            };
          })
        }
      </ul>
    </section>
  );
};
