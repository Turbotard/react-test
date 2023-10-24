import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const RechercheFilms: React.FC = () => {
    const [query, setQuery] = useState("");
    const [films, setFilms] = useState([]);
    const [descriptionId, setDescriptionId] = useState<number | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchFilms = useCallback(async (q: string, page: number = 1) => {
        const response = await fetch(`http://localhost:5001/search?query=${q}&page=${page}`);
        const data = await response.json();
        setFilms(data.results.slice(0, itemsPerPage)); // Taking only the first 10 results for the current page.
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
            fetchFilms(q, currentPage);
        }
    }, [location.search, fetchFilms, currentPage]);

    const handleSearch = () => {
        navigate(`/film?q=${query}`);
    };

    const handleDescriptionClick = (movieid: number) => {
        if (descriptionId === movieid) {
            setDescriptionId(null);
        } else {
            setDescriptionId(movieid);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher un film..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Rechercher</button>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Date de publication</th>
                            <th>Acteurs</th>
                            <th>Revenu généré</th>
                            <th>Top vente</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map((movie: any) => (
                            <React.Fragment key={movie.id}>
                                <tr>
                                    <td>{movie.title}</td>
                                    <td>{movie.original_language}</td>
                                    <td>{movie.release_date}</td>
                                    <td>{movie.vote_average}</td>
                                    <td>{movie.vote_count}</td>
                                    <td><button onClick={() => handleDescriptionClick(movie.id)}>Description</button></td>
                                </tr>
                                {descriptionId === movie.id && (
                                    <tr>
                                        <td colSpan={7}>{movie.overview}</td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button disabled={currentPage === 1} onClick={handlePrevPage}>Précédent</button>
                <span>Page {currentPage}</span>
                <button disabled={films.length < itemsPerPage} onClick={handleNextPage}>Suivant</button>
            </div>
        </div>
    );
};

export default RechercheFilms;
