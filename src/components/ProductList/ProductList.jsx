import Card from '../template/Card'
import {useParams} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {loadProduct, serviceCategories} from '../../actions'
import {category} from '../../services/Api'
import {Link} from 'react-router-dom'
import './ProductList.css'
import Filter from '../template/Filter'


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
    let pageCount = Math.ceil(filtredProducts.length / perPage)


    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };
    
    useEffect( () => {
        var elt = data.productsByCategory.find(element => element.id === parseInt(categorieId.categorieId));
        elt === undefined ? category(parseInt(categorieId.categorieId)).then(res =>{
            serviceCategories({id : parseInt(categorieId.categorieId), value : res})
            loadProduct(res.data.data.searchResult.mods.itemList.content)
            // setItem(res.data.data.searchResult.mods.itemList.content)
          }): loadProduct(elt.value.data.data.searchResult.mods.itemList.content)
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
             <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
        </div>
    )
    

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)