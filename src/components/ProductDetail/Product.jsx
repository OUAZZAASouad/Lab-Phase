import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ReactStars from "react-rating-stars-component";
import {connect} from 'react-redux'
import {addToPanier, serviceProducts, setQuantity} from '../../actions'
import {product, feedback} from '../../services/Api'
import {useParams} from 'react-router-dom'
import {useEffect, useState } from 'react';
import './Product.css'
import ReactLoading from 'react-loading';
import Counter from '../../components/template/Counter'
import TabsComments from '../template/TabsComments';

const mapStateToProps = state => {
    return {
        panierStore : state.panierStore,
        data        : state.data,  
        quantity    : state.quantity
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        addToPanier   : (data)    => dispatch(addToPanier(data)),
        serviceProducts : (data) => dispatch(serviceProducts(data)),
        setQuantity   : (data)    => dispatch(setQuantity(data))  
    }
  }

const Product = ({addToPanier, serviceProducts, data, quantity, setQuantity}) => {
    const productId           = useParams()
    const [res, setRes]       = useState({})
    const [images, setImages] = useState([])
    
    useEffect( () => { 
        setQuantity(-quantity)
        var elt = data.Detailsproduct.find(element => element.id === parseInt(productId.productId) );
        
        elt === undefined ? product(parseInt(productId.productId)).then(item =>{

                feedback(parseInt(productId.productId)).then(result => {
                    serviceProducts({id : parseInt(productId.productId), value : {...item.data, ...result.data.data}})
                    setRes({...item.data, ...result.data.data})
                })
            }):setRes({data: elt.value})  
    
        res.data !== undefined ? setImages(res.data.imageModule.imagePathList.map(function(item, index) {
            return {original : item, thumbnail : res.data.imageModule.summImagePathList[index], thumbnailClass : 'sliderImage', originalClass : 'sliderImage', bulletClass: 'sliderImage'  };
          })) :  setImages([]) 
    },[JSON.stringify(res), data.Detailsproduct])
    console.log(res.data)
    return(
        <div className = 'product'>
            
            {res.data === undefined ?  <ReactLoading type='spinningBubbles' color='#2c3e50' height={'20%'} width={'20%'}/> : 
            <>
                    <div className = 'gallery'>
                    <ImageGallery additionalClass = 'slider' items={images} infinite = {false} thumbnailPosition = {'left'} showFullscreenButton = {false} useBrowserFullscreen = {false} showPlayButton = {false} useTranslate3D = {false} />
                    </div>
                    <div className = 'details'>
                        <div style = {{display: 'flex', flexDirection:'column', justifyContent : 'space-around'}}>
                            <p className = 'title'>{res.data.titleModule.subject}</p>                
                        <div style = {{display : 'flex',alignItems : 'center', justifyContent : 'space-between', width : '20%'}}>
                            <Counter/>
                            </div> 
                        <div className = 'prix title'>{res.data.priceModule.maxActivityAmount.formatedAmount}</div>
                        <ReactStars
                            count={5}
                            value = {res.data.titleModule.feedbackRating.averageStar}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"/>
                            <button className = 'button' onClick = {() => addToPanier({id : res.data.actionModule.productId,image : res.data.imageModule.summImagePathList[0], price : res.data.priceModule.maxActivityAmount, quantite : quantity})}>Buy Now </button>
                            <TabsComments props ={ [{tab : 'Comments', data : res.data.evaViewList}, {tab : 'add comment', data : {}}]}/>
                        </div>

                    </div>
                    
            </>
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)