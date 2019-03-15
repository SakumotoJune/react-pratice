import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import ProductSite from '../components/main/ProductSite';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Cart from '../components/cart/Cart';
import ProductDetail from '../components/product/ProductDetail';
import Order from '../components/order/Order'
import Address from '../components/address/Address'
class RouterApp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cart:[]
        }
    }
    render(){
        return(
            <Router>
                <div>
                    <div>
                    <Route component={Header}></Route>
                    </div>
                    <br/>
                    <div>
                    <Switch>
                    <Route path='/product' component={ProductSite}></Route>
                    <Route path='/cart' component={Cart}></Route>
                    <Route path='/productDetail/:id' component={ProductDetail}></Route>
                    <Route path='/order' component={Order}></Route>
                    <Route path='/address' component={Address}></Route>
                    <Route ></Route>
                    </Switch>
                    </div>
                    <div>
                    <Route component={Footer}></Route>
                    </div>
                </div> 
            </Router>
        )
    }
}
export default RouterApp;