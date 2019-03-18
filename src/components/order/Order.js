import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, List, Card } from 'antd';
//import data from '../../data/productData.json';
//import adData from '../../data/userData.json';

class Order extends React.Component {
    constructor(props) {
        super(props)
        this.TableColumns = [{
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
                <span>{amount}</span>
            )
        }, {
            title: "金额",
            dataIndex: '',
            key: '',
            render: (record) => {
                return (<span>{record.amount * record.price}</span>)
            }
        }];

        this.state = {
            dataSource: [],
            addressData: [],
            address: {},
            isChoose: false,
            total: Number

        }
        console.log(this.state.addressData)
    }
    componentDidMount = () => {
        this.showTable()
    }
    showTable = () => {
        const str = window.sessionStorage.getItem("order")
        const str2 = window.sessionStorage.getItem("address")
        var total = 0
        console.log(window.sessionStorage)
        if (str) {
            const data = JSON.parse(str)
            this.setState({
                dataSource: data
            })
            data.forEach(item => {
                total = total + item.amount * item.price
            })
            this.setState({
                total: total
            })
        }

        if (str2) {
            this.setState({
                addressData: JSON.parse(str2)
            })
        }
    }
    onClick = (ad) => {
        //console.log(ad)
        this.setState({
            address: ad,
            isChoose: true
        })
    }
    orderSuccess = () =>{
        Modal.success({
            title:'This is a notification message',
            content:(
                <div>
                    <p>You have submitted your order successfully</p>
                </div>
            ),
            onOk(){
                window.location.href = '/product'
            }
        })
    }
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <div className='addressList'>
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={this.state.addressData}
                        renderItem={
                            item => (
                                <List.Item
                                    onClick={() => { this.onClick(item) }}
                                >
                                    <button>
                                        <Card
                                            title={`收件人：${item.name}`}
                                            hoverable
                                        >
                                            {`地址：${item.addPrefix}   ${item.address}`}
                                            <br />
                                            {`电话：${item.phone}`}
                                        </Card>
                                    </button>
                                </List.Item>)
                        }
                    ></List>
                    <Button><Link to={'/address'}>添加地址</Link></Button>
                </div>
                <div className="productList">
                    <Table columns={this.TableColumns} dataSource={this.state.dataSource}></Table>
                </div>
                <div className="order">
                    {this.state.isChoose ?
                        <Card title={this.state.address.name}>
                            {`地址：${this.state.address.address}   电话：${this.state.address.phone}`}
                        </Card>
                        : ''}
                    <span className="total-amount">{`应付款：${this.state.total}`}</span>
                    <Button onClick={this.orderSuccess}>确定订单</Button>
                </div>
            </div>
        );
    }
}
export default Order;
