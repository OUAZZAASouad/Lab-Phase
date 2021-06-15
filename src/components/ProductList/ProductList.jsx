import Card from '../template/Card'
import {useParams} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {setData} from '../../actions'
import {category} from '../../services/Api'
import './ProductList.css'

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

const ProductList = ({data, setData}) => {
    const categorieId = useParams()
    var item = data.productsByCategory.find(element => element.id === parseInt(categorieId.categorieId) );

    // TODO refactoring 
    if ( item === undefined && data.productsByCategory.length !== 2) {
        category(parseInt(categorieId.categorieId)).then(res =>{
            var elt = res.data.data.searchResult.mods.itemList.content
            let new_data = Object.assign({}, data , {
                productsByCategory : [...data.productsByCategory, {id : parseInt(categorieId.categorieId), value : res}]
            })
            setData(new_data)
          });
    }
    else if (data.productsByCategory.length !== 0){
        var elt = item.value.data.data.searchResult.mods.itemList.content
    }    
    var item = elt === undefined ? [] : elt

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
    }, [offset])

    return(
        <div className = 'wrapper'>
           <div className = 'products'> 
                {list.map(item =>{ 
                    console.log(item)
                    return(<Card article = {item}></Card>)}
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