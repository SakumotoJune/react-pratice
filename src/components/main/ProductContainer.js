import React from 'react';
import { Pagination, Row } from 'antd';
import ProductList from './ProductList';


class ProductContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProducts: this.props.dataProducts,
            productsList: [],
            pageSize: 28,
            total: this.props.dataProducts.length,
            pageNumber: 1
        }
        //console.log(2);
        //console.log(this.props.dataProducts);
        this.onChange = this.onChange.bind(this);
        this.initProductsList = this.initProductsList.bind(this);
    }
    componentDidMount = () => {
        this.initProductsList(this.props);
    }
    componentWillReceiveProps = (nextProps) => {
        //console.log('willprops')
        //console.log(nextProps.dataProducts)
        this.initProductsList(nextProps)
    }
    initProductsList = (props) => {
        const dataProducts = props.dataProducts;
        const page = this.state.pageNumber;
        this.setState({
            productsList: dataProducts.slice((page - 1) * 28, page * 28)
        })
        //console.log(this.props.flag)
        //console.log(this.props.dataProducts)
        //console.log(this.state.productsList)
    }
    onChange = (pageNumber) => {
        this.setState({
            pageNumber: pageNumber
        }, initProductsList)
    }
    render() {
        //console.log('renderc')
        return (
            <div>
                <Row gutter={16}><ProductList dataProducts={this.state.productsList}></ProductList></Row>
                <Pagination
                    showQuickJumper
                    handleSinglePage={true}
                    defaultCurrent={this.state.pageNumber}
                    current={this.state.pageNumber}
                    total={this.state.total}
                    pageSize={this.state.pageSize}
                    onChange={this.onChange} />
            </div>
        )

    }
}
export default ProductContainer;