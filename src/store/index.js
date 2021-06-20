import {createStore} from 'redux'
import rootReducer from '../reducers/index'
import {dataInfo} from '../Vars'


const initState = {
    modalIsOpen       : false,
    data              : dataInfo,
    panierStore       : [],
    total             : 0,
}

const store = createStore(rootReducer, initState);

export default store;