import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch, faShoppingCart, faHome} from '@fortawesome/free-solid-svg-icons' 
import './SearchBar.css'
import {setModal} from '../../actions/index'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const mapStateToProps = state => {
    return {
      modalIsOpen           : state.modalIsOpen
        
    }
  }


const mapDispatchToProps = dispatch =>{
    return {
        setModal   : ()    => dispatch(setModal()),
    }
  }

const SearchBar = ({setModal, modalIsOpen}) => {
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
                <div onClick = {setModal}>
                    <FontAwesomeIcon icon = {faShoppingCart} color = 'white'/>
                </div>
               
            </div>
        </div>
    )
    

    
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)