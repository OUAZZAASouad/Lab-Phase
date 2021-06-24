import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons' 
import { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {connect} from 'react-redux'
import {filterProduct} from '../../actions/index'
import { useEffect } from 'react';

const mapStateToProps = state => {
    return {
        filter           : state.filter,
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        filterProduct   : (item)    => dispatch(filterProduct(item)),
    }
  }


const Filter = ({filterProduct}) => {
    const [show, setShow] = useState(false)
    const [priceRange, setpriceRange] = useState([0, 0])
    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState('')

    const handleChange = (event, newValue) => {
        setpriceRange(newValue);
    };

    const handleRating = (event, newValue) =>{
        setRating(newValue)
    }

    useEffect(() => {
        filterProduct({price : priceRange, rate: rating, title:title})
    },[priceRange, rating, title])
    
    return(
        <>
            <div style = {{borderBottom : '1px solid #80596D', borderTop : '1px solid #80596D', width : '100%', cursor : 'pointer'}}>
                <div style = {{display : 'flex', width : '10%', justifyContent : 'space-around'}} onClick = {() => setShow(!show)}>
                    <p style = {{color : '#80596D'}}><FontAwesomeIcon icon = {faFilter}/></p>
                    <p style = {{color : '#80596D'}}>FILTER</p>
                </div>
            </div>
            {show ? <div style = {{width : '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display : 'flex', justifyContent : 'space-around', height : '90px', alignItems : 'center', flexWrap : 'wrap'}}>
                        <div style = {{width : '50px'}}>
                            <label>Title </label>
                            <input type = 'text'  onChange = { (e) => setTitle(e.target.value)}/>
                        </div>
                        <div style = {{width : '200px'}}>
                        <Typography id="range-slider" gutterBottom> Price range </Typography>
                        <Slider
                        value={priceRange}
                        onChange={handleChange}
                        max = {2000}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        />
                        </div>
                        <div style = {{width : '150px'}}> 
                        <Typography id="non-linear-slider" gutterBottom>Rating range </Typography>
                        <Slider
                        value={rating}
                        min={0}
                        step={0.5}
                        max={5}
                        onChange={handleRating}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                        />
                        </div>
                    </div> : <></>}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)