import { useState, useRef } from "react";
import {useParams} from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { addFeedback } from "../../actions";
import {connect} from 'react-redux'


const mapStateToProps = state => {
    return {
        data            : state.data
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        addFeedback         : (data)    => dispatch( addFeedback(data))
    }
  }

const AddComponent = ({addFeedback}) => {
    const [value, setValue] = useState(5)
    const name      = useRef('')
    const comment   = useRef('')
    const productId = useParams()
    console.log('productId', productId)
    return(
        <div style = {{display: 'flex', flexDirection : 'column', justifyContent:'space-between', height : '100%'}}>
            <input type = 'text' placeholder = 'name' ref = {name}/>
            <textarea rows="4" ref = {comment}></textarea>
            <ReactStars
                count={5}
                value = {value}
                onChange = {setValue}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"/>
            <button className = 'button' onClick = { () => addFeedback({name: name.current.value[0] + '*'.repeat(name.current.value.length - 2) + name.current.value.slice(-1), feedback: comment.current.value, rate : value, product : parseInt(productId.productId)})}>add </button>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComponent)