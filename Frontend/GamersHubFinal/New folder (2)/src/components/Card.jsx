import '../styles/card.css'
import star from '/src/Icons/star.png';

export default function Card({image, name, rating, genre}) {
    return(
        <a href="">
        <div className="card">
            <img src={image} alt="" />
            <h2>{name}</h2>
            <div className="rating">
                <p  className='star'>{rating}
                    <img src={star} alt="" />
                </p>
                <p>{genre}</p>
            </div>
        </div>
        </a>
    )
}