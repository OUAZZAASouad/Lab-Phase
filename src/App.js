import './App.css';
import Header from './components/header/Header'
import Accueil from './components/Accueil/Accueil'
import Popup from './components/template/Modal'
// require('dotenv').config()
import {Route, Switch} from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import Product from './components/ProductDetail/Product'


function App() {
  return (
    <div className = 'container'>
      <Header/>
      <Popup/>
      
      <Switch> 
        <Route  path='/' exact >
          <Accueil/>
        </Route>

        <Route  path='/categories/:categorieId' exact >
          <ProductList/>
        </Route>

        <Route path = '/categories/product/:productId' exact>
              <Product/>
        </Route>
      
      </Switch>
    </div>
  );
}

export default App;
