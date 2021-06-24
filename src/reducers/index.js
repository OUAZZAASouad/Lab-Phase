import {MODAL, DATA, ADD, DELETE, SERVICECATEGORY, SERVICEPRODUCT, FILTER, LOAD, ELEMENTS} from '../Vars'

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

        case LOAD :
            return Object.assign({}, state, {
                productList : action.payload,
                filtredProducts :  JSON.stringify(state.productList) === JSON.stringify(action.payload)? state.filtredProducts : action.payload
            })

        case FILTER :
        // if (state.productList.length > 0 ){
        //     console.log(state.productList[2].umpPrices.sale_price.minPrice)
        //     // console.log(state.productList[2].umpPrices.sale_price.minPrice)
        //     console.log('title',state.productList[2].title.displayTitle.toLowerCase().includes(action.payload.title.toLowerCase()))
        // }
        state.productList.map(item => {
            // console.log('title---------')
            // console.log(item.title.displayTitle.toLowerCase())
            // console.log(item.title.displayTitle.toLowerCase().includes(action.payload.title.toLowerCase()))
            // console.log('---------------- price')
            // console.log(state.productList[0].umpPrices.sale_price.minPrice)
            // console.log((action.payload.price[0] === 0 && action.payload.price[1] === 0 ) || (state.productList[0].umpPrices.sale_price.minPrice>= parseFloat(action.payload.price[0]) && state.productList[0].umpPrices.sale_price.minPrice<=parseFloat(action.payload.price[1])))
            console.log('rate', ( ("evaluation" in item ? item.evaluation.starRating : 4) <= parseFloat(action.payload.rate) ))
        })
            
        console.log((action.payload.price[0] === 0 && action.payload.price[1] === 0 ) || (state.productList[2].umpPrices.sale_price.minPrice>= parseFloat(action.payload.price[0]) && state.productList[2].umpPrices.sale_price.minPrice<=parseFloat(action.payload.price[1])) )
        console.log('filter')    
        return Object.assign({}, state, {
                filtredProducts : state.productList.filter(item => item.title.displayTitle.toLowerCase().includes(action.payload.title.toLowerCase()) && ((action.payload.price[0] === 0 && action.payload.price[1] === 0 ) || (item.umpPrices.sale_price.minPrice>= parseFloat(action.payload.price[0]) && item.umpPrices.sale_price.minPrice<=parseFloat(action.payload.price[1]))) && (action.payload.rate === 0  || ( ("evaluation" in item ? item.evaluation.starRating : 4) <= parseFloat(action.payload.rate) )) )
            })
        default :
            return state
    }
}

export default rootReducer;