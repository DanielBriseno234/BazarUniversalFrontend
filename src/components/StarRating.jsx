const StarRating = ({ rating }) => {
    const stars = [];

    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push('llena');
    }

    for (let i = Math.floor(rating); i < 5; i++) {
        stars.push('vacia');
    }

    return (
        <div>
            {stars.map((star, index) => (
                <span key={index} className={`estrella ${star}`}>
                    {star === 'llena' ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
