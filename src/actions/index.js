
import {MODAL, DATA, ADD, DELETE, SERVICECATEGORY, SERVICEPRODUCT} from '../Vars'



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

export function serviceCategories(payload){
    return({
        type : SERVICECATEGORY,
        payload
    })
}

export function serviceProducts(payload){
    return({
        type : SERVICEPRODUCT,
        payload
    })
}
