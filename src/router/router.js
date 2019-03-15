import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import ProductSite from '../components/main/ProductSite';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import User from '../components/user/User';
import Cart from '../components/cart/Cart';
import ProductDetail from '../components/product/ProductDetail';
import Order from '../components/order/Order'

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
                    <Route path='/user' component={User}></Route>
                    <Route path='/cart' component={Cart}></Route>
                    <Route path='/productDetail/:id' component={ProductDetail}></Route>
                    <Route path='/order' component={Order}></Route>
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