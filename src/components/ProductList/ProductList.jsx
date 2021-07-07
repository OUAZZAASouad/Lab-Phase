import Card from '../template/Card'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {loadProduct, serviceCategories} from '../../actions'
import {category} from '../../services/Api'
import {Link} from 'react-router-dom'
import './ProductList.css'
import Filter from '../template/Filter'
import Pagination from '../template/Pagination'


const mapStateToProps = state => {
    return {
        data            : state.data,
        filtredProducts : state.filtredProducts,
        productList     : state.productList,
        
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        serviceCategories   : (item)    => dispatch(serviceCategories(item)),
        loadProduct         : (data)    => dispatch(loadProduct(data))
    }
  }

const ProductList = ({data, serviceCategories, loadProduct, filtredProducts}) => {

    const categorieId = useParams()
    const [offset, setOffset] = useState(0)
    const [list, setList] = useState([])
    let perPage = 10
    
    const handlePagination = (items) =>{
        setOffset(items)
    }
    useEffect( () => {
        var elt = data.productsByCategory.find(element => element.id === parseInt(categorieId.categorieId));
        elt === undefined ? category(parseInt(categorieId.categorieId)).then(res =>{
            serviceCategories({id : parseInt(categorieId.categorieId), value : res.data.data.searchResult.mods.itemList.content})
            loadProduct(res.data.data.searchResult.mods.itemList.content)
            // setItem(res.data.data.searchResult.mods.itemList.content)
          }): loadProduct(elt.value)
        // pagination
        
        setList(filtredProducts.slice(offset, offset + perPage))
    }, [offset, categorieId, filtredProducts])
    // console.log(productList)
    return(
        <div className = 'wrapper'>
            <Filter/>
            <div className = 'products'> 
                {list.map(item =>{ 
                    return(<Link to={`product/${item.productId}`}><Card article = {item}></Card></Link>)}
                    )}
            </div>
            <Pagination perPage = {perPage} data = {filtredProducts} handle = {handlePagination} />
        </div>
    )
    

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)