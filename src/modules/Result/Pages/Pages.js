import React, { useState, useEffect } from 'react';
import './Pages.css';
/* eslint-disable */
export const Pages = ({ activePage, pagesNumber, SetPage, SetUpdate }) => {
const pages = [];

for (let i = 0; i < pagesNumber; i++) {
  pages.push(i+1);
}
const keys = [...pages];
const pagesSplicer = (page) => {
  pages.splice(page, 1);

  if(pages[page-1] !== '...') {
    pages.splice(page, 0, '...');
    page++;
  }

  return page -1;
}

for (let page = 0; page < pages[page]; page++) {
  if (page > 0 && pages[page] < Number(pagesNumber)) {

    if (pages[page] < Number(activePage)-2) {
      page = pagesSplicer(page);
    }
    else if (pages[page] > Number(activePage)+2) {
      page = pagesSplicer(page);
    }
  }

}

  return (
    <ul>
      {
        pages.map((page, i) => {
            return (
              <li
                key={keys[i]}
                onClick={(event) => {
                  SetPage(event.target.innerText)
                  SetUpdate(true)
                }}
              >
                {page}
              </li>
            );

          return null;
        })
      }
    </ul>
  );
};
