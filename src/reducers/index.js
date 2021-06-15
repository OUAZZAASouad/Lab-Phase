import {MODAL, DATA, ADD, DELETE} from '../Vars'

function rootReducer(state, action){
    switch (action.type){
        
        case MODAL :
            return Object.assign({}, state, {
                modalIsOpen           : !state.modalIsOpen
            })
        case DATA :
            localStorage.setItem('data', JSON.stringify(action.payload));
            return Object.assign({}, state, {
                data  : action.payload
            })
        case ADD :
            
            return Object.assign({}, state, {
                panierStore : state.panierStore.concat(action.payload),
                total       : state.total + parseFloat(action.payload.price.value)
            }

            )
        case DELETE : 
            return Object.assign({}, state, {
                panierStore : state.panierStore.filter(item => item.id !== action.payload.id),
                
            })

        default :
            return state
    }
}

export default rootReducer;