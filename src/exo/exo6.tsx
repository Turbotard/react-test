import React, { useState, useEffect } from 'react';
import filmsData from './films.json';
import Film from './components/filmtype';
import FilmComponent from './components/filmcomponents';

const Exo6: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [query, setQuery] = useState<string>("");
  const [openFilmId, setOpenFilmId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const filmsPerPage = 5;

  useEffect(() => {
    setFilms(filmsData);
  }, []);

  const filteredFilms = films.filter(film => film.name.toLowerCase().includes(query.toLowerCase()));
  const lastIndex = currentPage * filmsPerPage;
  const firstIndex = lastIndex - filmsPerPage;
  const currentFilms = filteredFilms.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredFilms.length / filmsPerPage);

  return (
    <div>
      <input
        type="text"
        placeholder="Recherche..."
        value={query}
        onChange={(e) => {
          setCurrentPage(1); // Reset to first page when search query changes
          setQuery(e.target.value);
        }}
        className="search-bar"
      />
      {currentFilms.map(film => (
        <FilmComponent
          key={film.id}
          film={film}
          isOpen={film.id === openFilmId}
          onTitleClick={() => setOpenFilmId(film.id === openFilmId ? null : film.id)}
        />
      ))}
      <div>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>{`Page ${currentPage} sur ${totalPages}`}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Exo6;
