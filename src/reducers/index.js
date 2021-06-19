import {MODAL, DATA, ADD, DELETE, SERVICECATEGORY, SERVICEPRODUCT, RESAPI} from '../Vars'

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
                total       : state.total + (parseFloat(action.payload.price.value) * parseInt(action.payload.quantite))
            }

            )
        case DELETE : 
            return Object.assign({}, state, {
                panierStore : state.panierStore.filter(item => item.id !== action.payload.id),
                total       : state.total - (parseFloat(action.payload.price.value) * parseInt(action.payload.quantite))
                
            })
        case SERVICECATEGORY : 
            let items = Object.assign({}, state , {
                data : Object.assign({}, state.data, {
                    productsByCategory : state.data.productsByCategory.concat(action.payload)
                })
            })
            localStorage.setItem('data', JSON.stringify(items.data));
            return items
        
        case SERVICEPRODUCT : 
        let dataValues = Object.assign({}, state , {
            data : Object.assign({}, state.data, {
                Detailsproduct : state.data.Detailsproduct.concat(action.payload)
            })
        })
        localStorage.setItem('data', JSON.stringify(dataValues.data));
        return dataValues

        case RESAPI :
            return Object.assign({}, state, {
                resApi : action.payload
            })



        default :
            return state
    }
}

export default rootReducer;