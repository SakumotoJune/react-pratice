import React from 'react';
import {Link} from 'react-router-dom'
import { Card, Button, InputNumber, Input } from 'antd';
import data from '../../data/productData.json'
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                id: this.props.match.params.id,
                name: String,
                price: String,
                image: String,
                quantity: Number,
                amount: Number
            },
            isEmpty: true,
        }
        //console.log(this.props.match.params.id)
    }
    componentDidMount = () => {
        const id = this.state.product.id
        data.forEach(item => {
            if (item.id == id) {
                this.setState({
                    product: {
                        ...this.state.product,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity,
                        amount: 1
                    }
                })

            }
        });

    }
    onChange = (value) => {
        var amount = window.sessionStorage.getItem(this.state.product.id)
        if (amount) {
            value = parseInt(amount) + parseInt(value)
        }
        console.log(value)
        this.setState({
            amount: value,
            isEmpty: false
        })
    }
    addCart = () => {
        //console.log(this.state.product)
        window.sessionStorage.setItem(this.state.product.id, this.state.amount)
        //console.log(window.sessionStorage)
    }
    onSubmit = () => {
        var storage = window.sessionStorage
        var temp = []
        temp.push(this.state.product)
        storage.setItem("order", JSON.stringify(temp))
        console.log(storage)
    }
    render() {
        return (
            <div>
                <br />
                <br />
                <div className="avatar">
                    <Card
                        style={{ width: 240 }}
                        cover={<img src={this.state.product.image}></img>}
                    ></Card>
                </div>
                <div className="description">
                    <h3>{this.state.product.name}</h3>
                    <br />
                    <h3>¥ {this.state.product.price}</h3>
                    <div className="amount">
                        <InputNumber
                            min={1} max={this.state.product.quantity}
                            defaultValue={this.state.isEmpty ? 1 : this.state.product.amount}
                            onChange={this.onChange}
                        >
                        </InputNumber>
                        <span>库存: {this.state.product.quantity}</span>
                    </div>
                </div>
                <div>
                    <Button type="primary" onClick={this.addCart}>加入购物车</Button>
                    <Button type="primary" onClick={this.onSubmit}><Link to={'/order'}>立即购买</Link></Button>
                </div>
            </div>

        )
    }
}
export default ProductDetail;