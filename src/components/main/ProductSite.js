import React from 'react';
import ProductContainer from './ProductContainer'
import SearchBox from './SearchBox'
import FilterBox from './FilterBox'
import Grid from 'antd/lib/card/Grid';
//import axios from 'axios';
import data from '../../data/productData.json';
class ProductSite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProducts: data,
            keyword: '',
            isNotFound: false,
            min: '',
            max: ''
        }
        //console.log(this.state.dataProducts)
        //this.handleGetData = this.handleGetData.bind(this)
    }
    handleGetData = () => {
        /*
        axios
            .get('/data/dataBase.json')
            .then(res => this.setState({
                dataProducts: res.data,
                flag: [1, 2, 3]
            }, () => { console.log("data") }))
            .catch(err => console.log(err))
            */

    }
    onSearch = (value) => {
        //console.log(this.state.isNotFound)
        //console.log('search')
        const keyword = new RegExp(value, 'gim');
        var temp = new Array;
        temp = data.filter(item => {
            return keyword.test(item.name)
        })
        if (!temp.length) {
            this.setState({ isNotFound: true })
        }
        else {
            temp.sort(function () { return 0.5 - Math.random() })
            console.log('temp')
            //console.log(temp)
            this.setState({
                dataProducts: temp,
                keyword: value
            })
        }

    }
    onFilter = () => {
        const min = this.state.min;
        const max = this.state.max;
        const temp = new Array;
        this.state.dataProducts.forEach(function (item) {
            if (item.price <= max && item.price >= min) {
                temp.push(item);
            }
        })
        this.setState({
            dataProducts: temp
        })
    }
    onChangeMin = (value) => {
        this.state.min = value
    }
    onChangeMax = (value) => {
        this.state.max = value
    }

    render() {
        //console.log('render')
        //console.log(this.state.dataProducts)
        return (
            <div>
                <br />
                <br />
                <br />
                <div className="nav">
                    <SearchBox onSearch={this.onSearch} ></SearchBox>
                    <FilterBox onFilter={this.onFilter} onChangeMin={this.onChangeMin} onChangeMax={this.onChangeMax}></FilterBox>
                </div>
                <div className="content">
                    {this.state.isNotFound ? <span>无相关商品</span> : <ProductContainer dataProducts={this.state.dataProducts} ></ProductContainer>}
                </div>
            </div>
        )
    }
}
export default ProductSite;