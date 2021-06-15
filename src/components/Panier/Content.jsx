import {Delete} from '../../actions/index'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons' 



const mapStateToProps = state => {
    return {
      panierStore  : state.panierStore,
      total        : state.total
        
    }
  }

const mapDispatchToProps = dispatch =>{
    return {
        Delete   : (data)    => dispatch(Delete(data)),
    }
  }

const Content = ({panierStore, total, Delete}) => {
    return(
        <div style = {{width : '100%', display : 'flex', flexDirection : 'column', justifyContent : 'space-around', height : '80%'}}>
            <h1>Total : {total}</h1>
            {panierStore.map(item => 
                <div style = {{display : 'flex', justifyContent : 'space-between'}}>
                    <img src = {item.image}/>
                    <p>{item.price.formatedAmount}</p>
                    <div onClick = {() => Delete(item)}>
                        <FontAwesomeIcon icon = {faTimes}/>
                    </div>
                </div>)}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)