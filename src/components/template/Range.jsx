import { useState, useEffect } from 'react';
import './Range.css'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const Range = ({handle}) => {

    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    
    useEffect( () => {
        if (handle !== undefined) handle([parseInt(minValue), parseInt(maxValue)])
    }, [minValue, maxValue])

    const [value, setValue] = useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        // <div style = {{display : 'flex', position : 'static'}}>
        //         <input className = 'left' type = 'range'  min = '0' max = '1000' step = '100' onChange = { (e) => setMinValue(e.target.value)} />
        //         <input className = 'right' type = 'range'  min = '1000' max = '2000' step = '100' onChange = { (e) => setMaxValue(e.target.value)}/>
        // </div>
        <>
            <Typography id="range-slider" gutterBottom>
                Temperature range
            </Typography>
            <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            />
        </>
        
    )
}

export default Range;