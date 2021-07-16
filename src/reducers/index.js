import {MODAL, DATA, ADD, DELETE, SERVICECATEGORY, SERVICEPRODUCT, FILTER, LOAD, QUANTITY, ADDCOMMENT} from '../Vars'
import dateFormat from 'dateformat';

function rootReducer(state, action){
    switch (action.type){
        
        case MODAL :
            console.log('test')
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

        case LOAD :
            return Object.assign({}, state, {
                productList : action.payload,
                filtredProducts :  JSON.stringify(state.productList) === JSON.stringify(action.payload)? state.filtredProducts : action.payload
            })

        case FILTER : 
            return Object.assign({}, state, {
                    filtredProducts : state.productList.filter(item => item.title.displayTitle.toLowerCase().includes(action.payload.title.toLowerCase()) && ((action.payload.price[0] === 0 && action.payload.price[1] === 0 ) || (item.umpPrices.sale_price.minPrice>= parseFloat(action.payload.price[0]) && item.umpPrices.sale_price.minPrice<=parseFloat(action.payload.price[1]))) && (action.payload.rate === 0  || ( ("evaluation" in item ? item.evaluation.starRating : 4) <= parseFloat(action.payload.rate) )) )
                })
        case QUANTITY :
            return Object.assign({}, state, {
                quantity : Math.max(state.quantity + action.payload, 0)
            })
        case ADDCOMMENT : 
            console.log(action.payload)
            let newItems = Object.assign({}, state , {
                data : Object.assign({}, state.data, {
                    Detailsproduct : state.data.Detailsproduct.map(item => item.id === action.payload.product ? Object.assign({}, item,{
                        value : Object.assign({}, item.value ,{
                            evaViewList : item.value.evaViewList.concat({buyerName: action.payload.name, buyerFeedback:action.payload.feedback , evalDate:  dateFormat(new Date(), "mmmm dS, yyyy"), buyerEval : action.payload.rate * 100 / 5})
                        }) 
                    }): item)
                    
                })
            })
            localStorage.setItem('data', JSON.stringify(newItems.data));
            return newItems
            
        default :
            return state
    }
}

export default rootReducer;