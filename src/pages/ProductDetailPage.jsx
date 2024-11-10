import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://192.168.1.10:5257/api/ControllerD/items/${id}`);
                const data = await response.json();
                if (data.message) {
                    setError(data.message);
                    return;
                }
                setProduct(data);
            } catch (error) {
                setError("Error al obtener los detalles de los productos:", error);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handlePurchase = async () => {
        if (purchaseQuantity > product.stock) {
            alert("No hay suficiente stock disponible.");
            return;
        }

        try {
            const response = await fetch("http://192.168.1.10:5257/api/ControllerD/addSale", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: purchaseQuantity,
                    unitPrice: product.price,
                    discountPercentage: product.discountPercentage,
                }),
            });

            const result = await response.json();
            if (result.status === true) {
                alert("Compra realizada con éxito.");
                setProduct(prevProduct => ({
                    ...prevProduct,
                    stock: prevProduct.stock - purchaseQuantity,
                }));
                setPurchaseQuantity(1);
            } else {
                alert("No se pudo realizar la compra.");
            }
        } catch (error) {
            console.error("Error en la compra:", error);
            alert("Hubo un problema al realizar la compra.");
        }
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };


    if (error) {
        return (
            <div className="not-found-container">
                <div className="not-found-content">
                    <h1 className="not-found-title">404</h1>
                    <p className="not-found-message">Oops! Producto no encontrado.</p>
                    <p className="not-found-description">
                        Es posible que el producto haya sido eliminado, que su nombre haya cambiado o que no esté disponible temporalmente.
                    </p>
                    <Link to="/" className="back-home-button">
                        Volver a la Página Principal
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {product ? (
                <div className="contenedor detalles">
                    <div className="carousel-container">
                        <button onClick={handlePrevImage} className="carousel-button prev-button">{"<"}</button>
                        <img
                            src={product.images[currentImageIndex]}
                            alt={`${product.title} ${currentImageIndex}`}
                            className="carousel-image"
                        />
                        <button onClick={handleNextImage} className="carousel-button next-button">{">"}</button>
                    </div>
                    <h2 className="titulo">{product.title}</h2>
                    <p className="categoria" style={{ marginBottom: '25px' }}>{product.category}</p>
                    <p className="descripcion">{product.description}</p>
                    <p className="disponibles"><span>Disponibles:</span> {product.stock}</p>
                    <div className="precio-rating" style={{ margin: '25px 0' }}>
                        <p className="precio">${product.price}</p>
                        <StarRating rating={product.rating} />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="quantity">Cantidad:</label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            max={product.stock}
                            value={purchaseQuantity}
                            onChange={(e) => setPurchaseQuantity(parseInt(e.target.value, 10))}
                            style={{ width: '50px', marginLeft: '10px' }}
                        />
                    </div>

                    <button className="btn-form" onClick={handlePurchase}>Comprar</button>
                </div>
            ) : (
                <p>Cargando detalles del producto...</p>
            )}
        </div>
    );
};

export default ProductDetailPage;
