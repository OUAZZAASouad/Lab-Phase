import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ReactStars from "react-rating-stars-component";
import {connect} from 'react-redux'
import {addToPanier, serviceProducts} from '../../actions'
import {product} from '../../services/Api'
import {useParams} from 'react-router-dom'
import {setData, getResApi} from '../../actions'
import { useRef, useEffect, useState } from 'react';
import './Product.css'
import ReactLoading from 'react-loading';


const mapStateToProps = state => {
    return {
        panierStore : state.panierStore,
        data        : state.data,
        res         : state.resApi
        
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        addToPanier   : (data)    => dispatch(addToPanier(data)),
        setData   : (data)    => dispatch(setData(data)),
        serviceProducts : (data) => dispatch(serviceProducts(data)),
        getResApi : (data) => dispatch(getResApi(data))
    }
  }

const Product = ({addToPanier, serviceProducts, data, getResApi}) => {
    const productId           = useParams()
    const quantite            = useRef(0)
    const [res, setRes]       = useState({})
    const [images, setImages] = useState([])
    

    useEffect( () => { 
        var elt = data.Detailsproduct.find(element => element.id === parseInt(productId.productId) );
        
        
        if ( elt === undefined) {
            product(parseInt(productId.productId)).then(item =>{
                serviceProducts({id : parseInt(productId.productId), value : item})
                console.log('-------------- test')
                // setRes(item.data)
                // console.log('after api', res)
              });
            
        }
        else { 
              console.log('before',elt.value.data)
              setRes({data: elt.value.data})
              console.log(res)
        }
        // const res = elt === undefined ? item.data : elt.value.data
        setImages(res.data.imageModule.imagePathList.map(function(item, index) {
            return {original : item, thumbnail : res.imageModule.summImagePathList[index] };
          }))        
          
        
    },[res])
    
    console.log('images', images)
    return(
        <div className = 'product'>
            {/* {images.length === 0 ?  <ReactLoading type='spin' color='#2c3e50' height={'20%'} width={'20%'}/> : 
            
            <>
                <div className = 'gallery'>
                   <ImageGallery items={images} infinite = {false} thumbnailPosition = {'left'} showFullscreenButton = {false} useBrowserFullscreen = {false} showPlayButton = {false} useTranslate3D = {false} />
                </div>

                <div style = {{display: 'flex', flexDirection:'column', justifyContent : 'space-around', height : '70%'}}>
                    <p className = 'title'>{res.titleModule.subject}</p>
                
                    <div><label className = 'title'>Quantity : </label><input className = 'quantity' type="number" min = '0' placeholder="0" ref = {quantite}/></div>
                   <div className = 'prix title'>Prix : {res.priceModule.maxActivityAmount.formatedAmount}</div>
                   <ReactStars
                    count={5}
                    value = {res.titleModule.feedbackRating.averageStar}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"/>
                    <button className = 'buy' onClick = {() => addToPanier({id : res.actionModule.productId,image : res.imageModule.summImagePathList[0], price : res.priceModule.maxActivityAmount, quantite : quantite.current.value})}>Buy Now </button>
                </div>
            </>
            } */}
        </div>
        
        // <div className = 'product'>
        //     <div className = 'gallery'>
        //         <ImageGallery items={images} infinite = {false} thumbnailPosition = {'left'} showFullscreenButton = {false} useBrowserFullscreen = {false} showPlayButton = {false} useTranslate3D = {false} />
        //     </div>

        //     <div style = {{display: 'flex', flexDirection:'column', justifyContent : 'space-around', height : '70%'}}>
        //         <p className = 'title'>{res.titleModule.subject}</p>
                
        //         <div><label className = 'title'>Quantity : </label><input className = 'quantity' type="number" min = '0' placeholder="0" ref = {quantite}/></div>
        //         <div className = 'prix title'>Prix : {res.priceModule.maxActivityAmount.formatedAmount}</div>
        //         <ReactStars
        //             count={5}
        //             value = {res.titleModule.feedbackRating.averageStar}
        //             size={24}
        //             isHalf={true}
        //             emptyIcon={<i className="far fa-star"></i>}
        //             halfIcon={<i className="fa fa-star-half-alt"></i>}
        //             fullIcon={<i className="fa fa-star"></i>}
        //             activeColor="#ffd700"/>
        //         <button className = 'buy' onClick = {() => addToPanier({id : res.actionModule.productId,image : res.imageModule.summImagePathList[0], price : res.priceModule.maxActivityAmount, quantite : quantite.current.value})}>Buy Now </button>
        //     </div>
        
        // </div> 
    // skuModule.hasSizeInfo
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)