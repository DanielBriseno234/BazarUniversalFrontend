import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconbazar from '../assets/bolsa-de-la-compra.png'

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/items?search=${searchQuery}`);
        }
    };

    return (
        <div className="contenedor">
            <div className="principal">
                <img src={iconbazar} alt="Icono bazar" className="icono-bazar" style={{ marginBottom: '20px' }} />
                <h1 className="titulo">Bazar Online</h1>
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <div className="input-container">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="search-input"
                        />
                    </div>
                    <button type="submit" className="btn-form">Search</button>
                </form>
            </div>
        </div>

    );
};

export default HomePage;
