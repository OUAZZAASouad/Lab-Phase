import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons' 
import {connect} from 'react-redux'
import Content from './Content'
import {setModal} from '../../actions/index'

const mapStateToProps = state => {
    return {
      panierStore                : state.panierStore
        
    }
  }
  const mapDispatchToProps = dispatch =>{
    return {
        setModal   : ()    => dispatch(setModal()),
    }
  }

const ModalPanier = ({setModal, panierStore}) => {
    
    return(
        <div style = {{display: 'flex',flexDirection : 'column', justifyContent : 'space-between',alignItems : 'center', height : '500px', position : 'relative'}}>
              <div style = {{display: 'flex', justifyContent : 'space-between', width : '100%'}}>
                <p>Mon Panier</p>
                <div onClick={setModal} style = {{cursor:'pointer'}}>
                  <FontAwesomeIcon icon = {faTimes}/>
                </div>
              </div>
              
              {panierStore.length === 0 ? <p>VOTRE PANIER EST VIDE</p> : <Content/> }
              <div style = {{width : '75%', border : '2px solid green', padding : '10px'}}>Livraison gratuite pour toute commande & retours offerts dès 100€ d'achat</div>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPanier)