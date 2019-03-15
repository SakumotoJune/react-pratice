import React from 'react';
import { Input, Table, Button } from 'antd'
//import data from '../../data/userData.json'

class Address extends React.Component {
    constructor(props) {
        super(props)
        this.tableColumns = [
            {
                title: "收货人",
                dataIndex: "recipient"
            }, {
                title: "详细地址",
                dataIndex: "address"
            }, {
                title: "电话",
                dataIndex: "phone"
            }, {
                title: "操作",
                dataIndex: '',
                render: (record) => (
                    <a className="edit-data" onClick={() => { this.deleteData(record) }}>删除</a>
                )
            }
        ]
        this.state = {
            dataSource: [],
            item: {
                name: String,
                phone: String,
                address: String
            },
            isCheck:true

        }
    }
    componentDidMount = () => {
        this.showTable()
    }
    showTable = () => {
        var storage = window.sessionStorage
        var addressData = JSON.parse(storage.getItem("address"))
        this.setState({
            dataSource: addressData
        })
    }
    deleteData = (record) => {
        var storage = window.sessionStorage
        var addressData = JSON.parse(storage.getItem("address"))
        const temp = addressData.filter(item => {
            return item.name != record.name | item.phone != record.phone | item.address != record.address
        });
        this.setState({
            dataSource: temp
        }, () => {
            storage.setItem("address", JSON.stringify(this.state.dataSource))
        })

    }
    addAddress = () => {
        var storage = window.sessionStorage
        this.setState({
            dataSource: [...this.state.dataSource, this.state.item]
        }, () => {
            storage.setItem("address", JSON.stringify(this.state.dataSource))
        })
        
    }
    nameChange = (value) => {
        this.setState({
            name:value
        })
    }
    phoneChange = (value) => {
        if (/^1[34578]\d{9}$/.test(value)){
            this.setState({
                phone:value,
                isCheck:true
            })
        }else{
            this.setState({
                isCheck:false
            })
        }
    }
    addressChange = (value) => {
        this.setState({
            address:value
        })
    }
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <div className="add">
                    <span>地址信息：</span>
                    <Input style={{ width: 300 }}
                        onChange={this.addressChange}
                    ></Input>
                    <br />
                    <span>收货人：</span>
                    <Input style={{ width: 300 }} onChange={this.nameChange}></Input>
                    <br />
                    <span>电话号码：</span>
                    <Input style={{ width: 300 }} onChange={this.phoneChange}></Input>
                    {this.state.isCheck?'':<span>格式有误</span>}
                    <br />
                    <Button onClick={this.addAddress}>新增地址</Button>
                </div>
                <div className="addressList">
                    <Table columns={this.tableColumns} dataSource={this.state.dataSource}></Table>
                </div>
            </div>

        )
    }

}
export default Address;