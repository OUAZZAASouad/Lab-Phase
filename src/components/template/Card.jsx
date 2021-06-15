import './Card.css'
import ReactStars from "react-rating-stars-component";

const Card = ({article}) => {
    return(
        <div className = 'card'>
            <img src = {article.image.imageUrl} width = '100%' height = '60%'/>
            <p   className = 'title'>{article.title.displayTitle}</p>
            <div className = 'price'>{article.umpPrices.sale_price.formattedPrice}</div>
            <ReactStars
                    count={5}
                    value = {"evaluation" in article ? article.evaluation.starRating : 4}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
            />

        </div>
    )

}

export default Card