import React from 'react';
import {Link }from 'react-router-dom'
import { Table, Button, InputNumber } from 'antd';
import data from '../../data/productData.json';


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.tableColumns = [{
            title: "商品图片",
            dataIndex: 'image',
            render: (item) => (
                <img src={item} width="100px" ></img>
            )
        }, {
            title: "商品详情",
            dataIndex: 'name'
        }, {
            title: "单价",
            dataIndex: 'price',
        }, {
            title: "数量",
            dataIndex: 'amount',
            key: '',
            render: (amount) => (
                <InputNumber
                    defaultValue={amount}
                    onChange={this.onChange}>
                </InputNumber>
            )
        }, {
            title: "操作",
            dataIndex: '',
            render: (record) => (
                <a className="edit-data" onClick={() => { this.deleteData(record.id) }}>删除</a>
            ),
        }];
        this.state = {
            queryInfo: {
                pageSize: 10
            },
            dataSource: [],
            orderProduct:[]
        }
        
    }
    componentDidMount = () => {
        this.showTable()
    }
    showTable = () => {
        const storage = window.sessionStorage;
        const cartData = new Array;
        const tempId = new Array;
        const tempValue = new Array
        //console.log(storage.length)
        for (var i = 0, len = storage.length; i < len; i++) {
            var key = storage.key(i)
            var value = storage.getItem(key)
            tempId.push(key)
            tempValue.push(value)
        }
        data.forEach(item => {
            var index = tempId.indexOf(item.id)
            if (index != -1) {
                var value = tempValue[index]
                var obj = { ...item, "amount": value }
                cartData.push(obj)
            }
        });
        console.log('show')
        console.log(cartData)
        this.setState({
            dataSource: cartData
        })
    }
    deleteData = (value) => {

        window.sessionStorage.removeItem(value)
        //console.log(window.sessionStorage)
        this.showTable()
    }
    onSelect = (record)=>{
        this.setState({
            orderProduct:[...this.state.orderProduct,record]
        })
    }
    onSelectAll = (selected,selectedRows,changeRows)=>{
        console.log(selectedRows)
        this.setState({
            orderProduct:selectedRows
        })
    }
    onSubmit = ()=>{
        var storage = window.sessionStorage
        storage.setItem("order",JSON.stringify(this.state.orderProduct))
        console.log(storage)
    }
    
    render() {
        const rowSelection = {
            onSelect:this.onSelect,
            onSelectAll:this.onSelectAll
        };
        return (
            <div>
                <br />
                <br />
                <Table 
                rowSelection = {rowSelection} 
                columns={this.tableColumns} dataSource={this.state.dataSource}></Table>
                <Button onClick={() => { this.onSubmit() }}><Link to={'/order'}>提交订单</Link></Button>
            </div>
        )
    }
}
export default Cart;