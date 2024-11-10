import { useEffect, useState } from "react";

const SalesPage = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch("http://192.168.1.10:5257/api/ControllerD/sales");
                const data = await response.json();
                setSales(data);
            } catch (error) {
                console.error("Error fetching sales:", error);
            }
        };
        fetchSales();
    }, []);

    return (
        <div className="contenedor">
            <h2>Compras Registradas</h2>
            {sales.length > 0 ? (
                sales.map((sale) => (
                    <div className="sale-card" key={sale.id}>
                        <img src={sale.productThumbnail} alt={sale.productTitle} className="product-thumbnail" />
                        <div className="sale-info">
                            <h3 className="product-title">{sale.productTitle}</h3>
                            <p className="product-description">{sale.productDescription}</p>
                            <div className="sale-details">
                                <p><span>Categoría:</span> {sale.category}</p>
                                <p><span>Marca:</span> {sale.brand}</p>
                                <p><span>Cantidad:</span> {sale.quantity}</p>
                                <p><span>Precio unitario:</span> ${sale.unitPrice.toFixed(2)}</p>
                                <p><span>Total sin descuento:</span> ${sale.total.toFixed(2)}</p>
                                <p><span>Descuento:</span> {sale.discountPercentage}%</p>
                                <p><span>Total con descuento:</span> ${sale.totalWithDiscount.toFixed(2)}</p>
                                <p><span>Fecha de compra:</span> {new Date(sale.purchaseDate).toLocaleString()}</p>

                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="sin-resultados">No hay compras registradas.</p>
            )}
        </div>
    );
};

export default SalesPage;
