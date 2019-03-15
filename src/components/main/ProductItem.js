import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'antd';


class ProductItem extends React.Component {
    constructor(props) {
        super(props)
    }
    addCart = () => {
        //console.log(this.props.id)
        var amount = window.sessionStorage.getItem(this.props.id)
        if (amount){
            amount = parseInt(amount)+1
        }else{
            amount = 1
        }
        window.sessionStorage.setItem(this.props.id, amount)
    }
    render() {
        return (
            <div>
                <Card
                    style={{ width: 300, height: 400 }}
                    cover={<Link to={`/productDetail/${this.props.id}`}><img className="pro-image" width="200px" height="200px" src={this.props.image}></img></Link>}
                    actions={[<Icon type="shopping-cart" onClick={this.addCart}>add wishlist</Icon>, <Link to={`/productDetail/${this.props.id}`}><Icon type="shopping">add buy</Icon></Link>]}
                >
                    <Link to={`/productDetail/${this.props.id}`}>
                        <Card.Meta
                            style={{ height: 108 }}
                            className="description" title={this.props.price} description={this.props.name}></Card.Meta>
                    </Link>
                </Card>
            </div>
        )
    }
}
export default ProductItem;