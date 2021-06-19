import Card from '../template/Card'
import {useParams} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {setData, serviceCategories} from '../../actions'
import {category} from '../../services/Api'
import {Link} from 'react-router-dom'
import './ProductList.css'


const mapStateToProps = state => {
    return {
        data           : state.data
        
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        setData             : (item)    => dispatch(setData(item)),
        serviceCategories   : (item)    => dispatch(serviceCategories(item)),
    }
  }

const ProductList = ({data, setData, serviceCategories}) => {
    const categorieId = useParams()
    var elt = data.productsByCategory.find(element => element.id === parseInt(categorieId.categorieId));
    var item  = []
    if (elt === undefined) {
        category(parseInt(categorieId.categorieId)).then(res =>{
            serviceCategories({id : parseInt(categorieId.categorieId), value : res})
            item = res.data.data.searchResult.mods.itemList.content
          });
        
    }
    else {
        item = elt.value.data.data.searchResult.mods.itemList.content
    }    
    
    const [offset, setOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [list, setList] = useState([])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
        setCurrentPage(selectedPage)
    };
    // TODO : end 
    let perPage = 10
    let pageCount = Math.ceil(item.length / perPage)
    
    useEffect( () => {
        setList(item.slice(offset, offset + perPage))
        console.log(item.slice(offset, offset + perPage))
    }, [offset, item])

    return(
        <div className = 'wrapper'>
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