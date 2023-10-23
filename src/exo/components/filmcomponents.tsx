import React from 'react';
import Film from './filmtype';

interface FilmComponentProps {
  film: Film;
  isOpen: boolean;
  onTitleClick: () => void;
}

const FilmComponent: React.FC<FilmComponentProps> = ({ film, isOpen, onTitleClick }) => {
  return (
    <div>
      <h2 onClick={onTitleClick}>{film.name}</h2>
      {isOpen && <p>{film.description}</p>}
    </div>
  );
}

export default FilmComponent;
