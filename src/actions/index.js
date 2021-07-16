
import {MODAL, DATA, ADD, DELETE, SERVICECATEGORY, SERVICEPRODUCT, FILTER, LOAD, QUANTITY, ADDCOMMENT} from '../Vars'



export function setModal() {
    console.log('action')
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

export function filterProduct(payload){
    return({
        type : FILTER,
        payload
    })
}

export function loadProduct(payload){
    return({
        type : LOAD,
        payload
    })
}

export function setQuantity(payload){
    return({
        type : QUANTITY,
        payload
    })
}

export function addFeedback(payload){
    return({
        type : ADDCOMMENT,
        payload
    })
}