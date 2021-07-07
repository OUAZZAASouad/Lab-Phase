import SwiftSlider from 'react-swift-slider'
import {connect} from 'react-redux'
import {setData} from '../../actions'
import {useEffect} from 'react'
import Card from '../template/Card'
import {dataTest} from '../../Vars'
import {Link} from 'react-router-dom'


const mapStateToProps = state => {
    return {
        data           : state.data
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        setData   : (data)    => dispatch(setData(data)),
    }
  }

const Accueil = ({data, setData}) =>{
    
    useEffect( () => { 
        localStorage.hasOwnProperty('data') ? setData(JSON.parse(localStorage.getItem('data'))) : setData(data) 
    }, [])

    const style = {
        fontSize: '0.95rem',
        letterSpacing: '2px',
        color: '#ecf0f1',
        fontWeight: 'bold'
    }

    return(
        <>
        <div style = {{gridColumnStart : '1', gridColumnEnd :'span 3', gridRowStart : '2', gridRowEnd : 'span 1' , zIndex : '-1'}}>
            <SwiftSlider data={dataTest}/>
        </div>
        <div style = {{gridColumnStart : '2', gridColumnEnd :'span 1', gridRowStart : '4', gridRowEnd : 'span 1' }}>  
            {[{ id : 205838503, name : 'iPhones'}, { id : 200214006, name : 'Men\'s Watches'}].map(item => {
                let arr = data.productsByCategory.find(element => element.id === item.id)
                return (
                <>
                <div style = {{display : 'flex', justifyContent : 'space-between', backgroundColor:' #80596D', opacity : '0.5'}}>
                    <p style = {style}>{item.name}</p>
                    <Link to={`categories/${item.id}`}><p style = {style}>See More</p></Link>
                </div>
                    <div style = {{display : 'flex', justifyContent : 'space-between'}} >{arr.value.slice(4, 8).map(article => <Link to={`/categories/product/${article.productId}`}><Card article = {article} ></Card></Link>)}</div>
                </>)
            })}
        </div>    
        </>
        
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Accueil)