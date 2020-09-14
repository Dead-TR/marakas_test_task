import React, { useState, useEffect } from 'react';
import './Pages.css';
/* eslint-disable */
export const Pages = ({ activePage, pagesNumber, SetPage, SetUpdate }) => {

  const pages = [
    {
      num: 1,
      data: '1',
      hide: false,
      active: false,
    },
    {
      num: 2,
      data: '2',
      hide: false,
      active: false,
    },
    {
      num: 3,
      data: '3',
      hide: false,
      active: false,
    },
    {
      num: 4,
      data: '4',
      hide: false,
      active: false,
    },
    {
      num: 5,
      data: '5',
      hide: false,
      active: false,
    },
    {
      num: 6,
      data: '6',
      hide: false,
      active: false,
    },
    {
      num: 7,
      data: '7',
      hide: false,
      active: false,
    },
    {
      num: 8,
      data: '8',
      hide: false,
      active: false,
    },
    {
      num: 9,
      data: '9',
      hide: false,
      active: false,
    },
  ];

  for (const page of pages) {
    if (Number(activePage) <= 4 ) {

      activePage === page.data
        ? page.active = true
        : page.active = false

        if (Number(page.num) < 9) {
          Number(page.data) > (Number(activePage) + 3)
            ? page.hide = true
            : page.hide = false

          Number(page.data) > (Number(activePage) + 2)
            ? page.data = '...'
            : page.data = page.data
        } else {
            page.active = false;
            page.data = pagesNumber;
        }

    }

    if (Number(activePage) > 4 ) {

      switch (page.num) {
        case 5:
          page.active = true;
          page.data = activePage;
          break;

        case 4:
          page.active = false;
          page.data = activePage - 1;
          break;

        case 3:
          page.active = false;
          page.data = activePage - 2;
          break;

        case 2:
          page.active = false;
          page.data = '...';
          break;

        case 1:
          page.active = false;
          page.data = 1;
          break;

        case 6:
        page.active = false;
        page.data = Number(activePage) + 1;
        break;

        case 7:
          page.active = false;
          page.data = Number(activePage) + 2;
          break;

        case 8:
          page.active = false;
          page.data = '...';
          break;

        case 9:
          page.active = false;
          page.data = pagesNumber;
          break;

        default:
          break;
      }

    }

    if (Number(activePage) + 2 >= pagesNumber) {
      if (page.num === 9 || page.num === 8) {
        page.hide = true;
      }
    }

    if (Number(activePage) + 1 >= pagesNumber) {
      if (page.num === 7) {
        page.hide = true;
      }
    }

    if (Number(activePage) >= pagesNumber) {
      if (page.num === 6) {
        page.hide = true;
      }
    }
  }

  return (
    <ul>
      {
        pages.map((page) => {
          if (page.hide === false) {
            return (
              <li
                key={page.num}
                onClick={(event) => {
                  SetPage(event.target.innerText)
                  SetUpdate(true)
                }}
              >
                {page.data}
              </li>
            );
          }

          return null;
        })
      }
    </ul>
  );
};
