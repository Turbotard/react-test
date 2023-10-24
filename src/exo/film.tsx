import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RechercheFilms: React.FC = () => {
    const [query, setQuery] = useState("");
    const [films, setFilms] = useState<any[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const fetchFilms = useCallback(async (q: string, page: number = 1) => {
        const response = await fetch(`http://localhost:5001/search?query=${q}&page=${page}`);
        const data = await response.json();
        const slicedData = data.results.slice((page - 1) * 10, page * 10);
        setFilms(slicedData);
        setTotalResults(data.total_results);
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('q');
        const page = Number(searchParams.get('page')) || 1;

        setQuery(q || "");
        fetchFilms(q || "", page);
        setCurrentPage(page);

    }, [location.search, fetchFilms]);

    useEffect(() => {
        // Cancel the previous timeout if the user types something
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Create a new 2 seconds delay to trigger the search
        const timeoutId = setTimeout(() => {
            if (query !== "") {
                navigate(`/film?q=${query}&page=1`);
            }
        }, 1000);  // Trigger after 2 seconds

        // Update the timeout state to be able to clear it on the next input
        setSearchTimeout(timeoutId);

        // Cleanup the timeout if the component is unmounted to prevent issues
        return () => {
            clearTimeout(timeoutId);
        };
    }, [query, navigate]);

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

    const [descriptionId, setDescriptionId] = useState<number | null>(null);
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
            <button onClick={() => navigate(`/film?q=${query}&page=1`)}>Rechercher</button>

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
