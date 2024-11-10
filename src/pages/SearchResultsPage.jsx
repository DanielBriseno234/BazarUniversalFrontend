import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import iconbazar from '../assets/bolsa-de-la-compra.png'

const SearchResultsPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentSearch = searchParams.get("search") || "";

    useEffect(() => {
        setQuery(currentSearch);
    }, [currentSearch]);

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        if (query.trim()) {
            navigate(`/items?search=${query.trim()}`);
        }
    };

    useEffect(() => {
        if (currentSearch) {
            const fetchSearchResults = async () => {
                try {
                    const response = await fetch(`http://192.168.1.10:5257/api/ControllerD/items?q=${currentSearch}`);
                    const data = await response.json();
                    if (data.message) {
                        setSearchResults([])
                        setIsLoading(false)
                        return
                    }
                    setSearchResults(data);
                    setIsLoading(false)
                } catch (error) {
                    console.error("Error al obtener los productos:", error);
                }
            };
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [currentSearch]);

    const handleProductClick = (id) => {
        navigate(`/item/${id}`);
    };


    return (
        <div className="contenedor">
            <div style={{ marginBottom: '20px' }}>
                <form onSubmit={handleSearchSubmit} className="form-search">
                    <img src={iconbazar} alt="Icono bazar" className="icono-bazar" />
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        placeholder="Buscar productos..."
                        className="search-input"
                    />
                </form>
            </div>

            <h2>Resultados de búsqueda para: "{currentSearch || 'ninguna búsqueda'}"</h2>

            <p className="total-resultados">{searchResults.length} resultados encontrados</p>

            {
                !isLoading ? (
                    searchResults.length > 0 ? (
                        searchResults.map((item) => (
                            <div className="carta-producto" key={item.id} onClick={() => handleProductClick(item.id)}>
                                <div className="imagen-producto">
                                    <img src={item.thumbnail} alt={item.title} style={{ width: '100px', height: 'auto' }} />
                                </div>

                                <div className="informacion-producto">
                                    <div className="titulo-producto">
                                        <h3>{item.title}</h3>
                                        <p className="categoria">{item.category}</p>
                                    </div>
                                    <p>{item.description}</p>
                                    <div className="precio-rating">
                                        <p className="precio">${item.price}</p>
                                        <StarRating rating={item.rating} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="sin-resultados">No se encontraron resultados.</p>
                    )
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando resultados...</p>
                )
            }
        </div>
    );
};

export default SearchResultsPage;