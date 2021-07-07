import { useState, useEffect } from 'react';
import {setQuantity} from '../../actions'
import {connect} from 'react-redux'


const mapStateToProps = state => {
    return {
        quantity        : state.quantity,  
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        setQuantity   : (data)    => dispatch(setQuantity(data))
    }
  }
const Counter = ({quantity, setQuantity}) => {


    
    // useEffect( () => {
    //     if (handle !== undefined) handle([parseInt(minValue), parseInt(maxValue)])
    // }, [minValue, maxValue])

    

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    return(
        <>
            <button style = {{borderRadius : '30px', height : '30px', width :'30px', border : 'none'}} onClick = {() => setQuantity(-1)}>-</button>
            <p>{quantity}</p>
            <button style = {{borderRadius : '30px', width :'30px', height : '30px', border : 'none'}} onClick = {() => setQuantity(1)}>+</button>
           
        </>
        
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);