import {detailProduct} from '../../Vars'
import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ReactStars from "react-rating-stars-component";
import {connect} from 'react-redux'
import {addToPanier} from '../../actions'


const mapStateToProps = state => {
    return {
        panierStore                : state.panierStore
        
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        addToPanier   : (data)    => dispatch(addToPanier(data)),
    }
  }



const Product = ({addToPanier, panierStore}) => {
    const images = detailProduct.imageModule.imagePathList.map(function(item, index) {
        return {original : item, thumbnail : detailProduct.imageModule.summImagePathList[index] };
      });
    return(
        
        <div style = {{display : 'flex', gridColumnStart : '2', gridColumnEnd :'span 1', gridRowStart : '5', gridRowEnd : 'span 1'}}>
            <div style = {{zIndex : '0', maxWidth : '600px'}}>
                <ImageGallery items={images} infinite = {false} thumbnailPosition = {'left'} showFullscreenButton = {false} useBrowserFullscreen = {false} showPlayButton = {false} useTranslate3D = {false} />
            </div>

            <div>
                <p>{detailProduct.titleModule.subject}</p>
                <p>{detailProduct.priceModule.maxActivityAmount.formatedAmount}</p>
                <ReactStars
                    count={5}
                    value = {detailProduct.titleModule.feedbackRating.averageStar}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"/>
                <button onClick = {() => addToPanier({id : detailProduct.actionModule.productId,image : detailProduct.imageModule.summImagePathList[0], price : detailProduct.priceModule.maxActivityAmount})}>Buy Now </button>
            </div>
        
        </div> 
    // skuModule.hasSizeInfo
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)