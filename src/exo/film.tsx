import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const RechercheFilms: React.FC = () => {
    const [query, setQuery] = useState("");
    const [films, setFilms] = useState<any[]>([]);
    const [allFetchedFilms, setAllFetchedFilms] = useState<any[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [descriptionId, setDescriptionId] = useState<number | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const fetchFilms = useCallback(async (q: string, page: number = 1) => {
        const apiPage = Math.ceil(page / 2);
        if (allFetchedFilms.length < apiPage * 20) {
            const response = await fetch(`http://localhost:5001/search?query=${q}&page=${apiPage}`);
            const data = await response.json();
            setAllFetchedFilms(prev => [...prev, ...data.results]);
            setTotalResults(data.total_results);
        }
    }, [allFetchedFilms]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('q');
        const page = Number(searchParams.get('page')) || 1;
        if (q) {
            setQuery(q);
            fetchFilms(q, page);
        }
        setCurrentPage(page);
    }, [location.search, fetchFilms]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('q');
        const page = Number(searchParams.get('page')) || 1;
        setCurrentPage(page);
    
        const fetchAndSetMovies = async () => {
            if (q) {
                const apiPage = Math.ceil(page / 2); // Determine which API page to fetch based on current user page.
                const response = await fetch(`http://localhost:5001/search?query=${q}&page=${apiPage}`);
                const data = await response.json();
                setTotalResults(data.total_results);
    
                if (page % 2 === 1) { 
                    // If user's current page is odd, show first 10 films from the API results.
                    setFilms(data.results.slice(0, 10));
                } else {
                    // If user's current page is even, show last 10 films from the API results.
                    setFilms(data.results.slice(10, 20));
                }
            }
        };
    
        fetchAndSetMovies();
    }, [location.search, fetchFilms]);
    

    const handleSearch = () => {
        navigate(`/film?q=${query}&page=1`); // Reset to page 1 for a new search
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        fetchFilms(query, nextPage);
        navigate(`/film?q=${query}&page=${nextPage}`);
        setCurrentPage(nextPage);
    };

    const handlePrevPage = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 1) {
            fetchFilms(query, prevPage);
            navigate(`/film?q=${query}&page=${prevPage}`);
            setCurrentPage(prevPage);
        }
    };

    const handleDescriptionClick = (movieid: number) => {
        if (descriptionId === movieid) {
            setDescriptionId(null);
        } else {
            setDescriptionId(movieid);
        }
    }

    const totalPages = Math.ceil(totalResults / 10);
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
                                    <td>
                                        <button onClick={() => handleDescriptionClick(movie.id)}>Description</button>
                                    </td>
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
                <span>Page {currentPage} de {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={handleNextPage}>Suivant</button>
            </div>
        </div>
    );
};

export default RechercheFilms;
