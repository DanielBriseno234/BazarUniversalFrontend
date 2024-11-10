import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Oops! La página que estás buscando no existe.</p>
                <p className="not-found-description">
                    Es posible que la página haya sido eliminada, que su nombre haya cambiado o que no esté disponible temporalmente.
                </p>
                <Link to="/" className="back-home-button">
                    Volver a la Página Principal
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
