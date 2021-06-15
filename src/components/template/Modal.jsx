import Modal from 'react-modal';
import ModalPanier from '../Panier/ModalPanier'
import {connect} from 'react-redux'
import {setModal} from '../../actions/index'

Modal.setAppElement('#root')
const mapStateToProps = state => {
    return {
      modalIsOpen           : state.modalIsOpen,
        
    }
  }
  const mapDispatchToProps = dispatch =>{
    return {
        setModal   : ()    => dispatch(setModal()),
    }
  }

const Popup = ({setModal, modalIsOpen}) => {
    
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
    return(
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={setModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
              <ModalPanier/>

        </Modal>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)