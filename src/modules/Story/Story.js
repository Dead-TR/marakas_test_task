import React, { useState, useEffect } from 'react';
import './Story.css';

export const Story = ({ story }) => {
console.log("Story -> story", story)

  const contentActivator = (option) => {
      const content = document.querySelector('.story__content');

      if (content) {
        content.classList.contains('story__content_active')
          ? content.classList.remove('story__content_active')
          : content.classList.add('story__content_active');
      }
  }

  return (
    <section className="story">
      <div className="story__content">
        {
          story.map((item) => (
            <div className="story__item" key={item.id}>
              <p>{item.title}</p>
              <p>{item.type}</p>
              <p>{item.year}</p>
            </div>
          ))
        }
      </div>
      <div
        className="story__btn"
        onClick={() => contentActivator('add')}
      />
    </section>
  )
}
