import React from 'react';
import { Card } from 'react-bootstrap';
import './CraftsmanCardPresentingComponent.scss';

export default function CraftsmanCardPresentingComponent ({ craftsman }) {
  const { photo, name, averageRating, skills } = craftsman;

  return (
    <div className="craftsman-card-grid">
      <img className="craftsman-card-photo" src={photo} alt={name} />
          <strong><div className="craftsman-card-rating">Среден рейтинг: {averageRating.toFixed(2)}</div></strong>
          <strong><div className="craftsman-card-name">Извършена от:
          <div>{name}</div></div></strong>
          <strong> <div className="craftsman-card-skills">{skills.map(skill => <div>{skill}</div>)}</div></strong>
    </div>
  );
}