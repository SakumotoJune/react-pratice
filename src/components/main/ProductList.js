import React from 'react';
import ProductItem from './ProductItem';
import { Col } from 'antd';

const ProductList = (props) => {
    const itemsProduct = props.dataProducts.map(function (item) {
        return <Col span={6}>
            <ProductItem
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
            ></ProductItem>
        </Col>
    })
    return (
        <div id='product-list'>
            {itemsProduct}
        </div>
    )
}
/*
class ProductList extends React.Component{
    constructor(props){
        super(props)     
    }
    render(){
        const itemsProduct = this.props.dataProducts.map(function (item) {
            return <Col span={6}>
                <ProductItem
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                ></ProductItem>
            </Col>
        })
        return(
            <div id='product-list'>
                {itemsProduct}
            </div>
        )
    }
}
*/
export default ProductList;