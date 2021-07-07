import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch, faShoppingCart, faHome} from '@fortawesome/free-solid-svg-icons' 
import './SearchBar.css'
import {setModal} from '../../actions/index'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const mapStateToProps = state => {
    return {
      panierStore           : state.panierStore
        
    }
  }


const mapDispatchToProps = dispatch =>{
    return {
        setModal   : ()    => dispatch(setModal()),
    }
  }

const SearchBar = ({setModal, panierStore}) => {
    return (
        <div className = 'content'>
            <div className = 'search'>
                <span><FontAwesomeIcon icon = {faSearch}/></span>
                <input type = 'text' placeholder = 'Search'/>
            </div>
            <div className = 'icons'>
                  <div>
                    <Link to = '/'><FontAwesomeIcon icon = {faHome} color = 'white' /> </Link>
                  </div>
                <div onClick = {setModal} className = 'panier'>
                    <FontAwesomeIcon icon = {faShoppingCart} color = 'white'/>
                    {panierStore.length !== 0 ? <div className = 'count'>{panierStore.length}</div>:<></>}
                    
                </div>
               
            </div>
        </div>
    )
    

    
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)