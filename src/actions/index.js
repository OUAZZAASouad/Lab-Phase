
import {MODAL, DATA, ADD, DELETE} from '../Vars'



export function setModal() {
    return( {
            type : MODAL
        })
   
  }

export function setData(payload) {
    return( {
            type : DATA,
            payload
        })
   
  }

export function addToPanier(payload){
    return({
        type : ADD,
        payload
    })
}

export function Delete(payload){
    return(
        {
            type : DELETE,
            payload
        }
    )
}