import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, InputNumber, List, Card } from 'antd';
import data from '../../data/productData.json';
import adData from '../../data/userData.json';

class Order extends React.Component {
    constructor(props) {
        super(props)
        this.orderTableColumns = [{
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
            title: "金额",
            dataIndex: '',
            key: '',
            render: (record) => {
                <span>{record.amount * record.price}</span>
            }
        }];

        this.state = {
            dataSource: [],
            addressData: adData,
            address: {},
            isChoose: false

        }
        console.log(this.state.addressData)
    }
    componentDidMount = () => {
        this.showTable()
    }
    showTable = () => {
        const str = window.sessionStorage.getItem("order")
        var temp = [];
        if (str) {
            temp = JSON.parse(str)
        }
        this.setState({
            dataSource: temp
        })
    }
    onClick =(ad)=>{
        //console.log(ad)
        this.setState({
            address: ad,
            isChoose: true
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
                                    onClick={()=>{this.onClick(item)}}
                                >
                                    <button>
                                        <Card
                                            title={`收件人：${item.recipient}`}
                                            hoverable
                                        >
                                            {`地址：${item.address}   电话：${item.phone}`}
                                        </Card>
                                    </button>
                                </List.Item>)
                        }
                    ></List>
                    <Button><Link to={'/address'}></Link>添加地址</Button>
                </div>
                <div className="productList">
                    <Table columns={this.orderTableColumns} dataSource={this.state.dataSource}></Table>
                </div>
                <div className="order">
                    {this.state.isChoose ?
                        <Card title={this.state.address.recipient}>
                        {`地址：${this.state.address.address}   电话：${this.state.address.phone}`}
                        </Card>
                        : ''}
                    <Button>确定订单</Button>
                </div>
            </div>
        );
    }
}
export default Order;
