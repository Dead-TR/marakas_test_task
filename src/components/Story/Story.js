import React, { useState, useEffect } from 'react';
import './Story.css';
import {
  title,
  year,
  page,
  type,
} from '../../redux-modules/Reducer';
export const Story = ({ story, store, SetUpdate }) => {

  const contentActivator = (event) => {
    if (event.target.closest('.story__btn')) {
      const btn = document.querySelector('.story__btn');

      btn.classList.contains('story__btn_active')
        ? btn.classList.remove('story__btn_active')
        : btn.classList.add('story__btn_active')
    }

    const content = document.querySelector('.story__content');

    if (content) {
      content.classList.contains('story__content_active')
        ? content.classList.remove('story__content_active')
        : content.classList.add('story__content_active');
    }
  };

  const storyGoto = (target) => {
    for (const i of story) {
      if (target.attributes['data-item-id'].value === String(i.id)) {
        store.dispatch(title({'title': i.title}))
        store.dispatch(year({'year': i.year  || ''}))
        store.dispatch(page({'page': 1}))
        SetUpdate()
      }
    }
  }

  return (
    <section className="story">
      <div
        className="story__btn"
        onClick={(event) => contentActivator(event)}
      >
        <div />
        <div />
        <div />
      </div>

      <div className="story__content">
        {
          story.map((item) => (
            <div
              className="story__item"
              key={item.id}
              data-item-id={item.id}
              onClick={(event) => {
                if (event.target.classList.contains('story__item')) {
                  storyGoto(event.target)
                } else if (event.target.parentElement.classList.contains('story__item')) {
                  storyGoto(event.target.parentElement)
                }
              }}
            >
              <p className="story__text">{item.title}</p>
              <p className="story__text">{item.year}</p>
            </div>
          ))
        }
      </div>
    </section>
  )
}
