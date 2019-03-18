import React from 'react';
import { Input, Table, Button, Cascader, Select } from 'antd'
//import data from '../../data/userData.json'
const Option = Select.Option
class Address extends React.Component {
    constructor(props) {
        super(props)
        this.tableColumns = [
            {
                title: "收货人",
                dataIndex: "name"
            }, {
                title: "所在地区",
                dataIndex: "addPrefix"
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
                    <div>
                        <a className="delete-data" onClick={() => { this.deleteData(record) }}>删除</a>
                        <span>|</span>
                        <a className="edit-data" onClick={() => { this.editData(record) }}>修改</a>
                    </div>
                )
            }, {
                title: '',
                dataIndex: '',
                render: () => (
                    <Button>设为默认地址</Button>
                )
            }
        ]
        this.options = [{
            value: '北京',
            label: '北京',
            children: [{
                value: '北京市',
                label: '北京市',
                children: [{
                    value: '东城区',
                    label: '东城区'
                }, {
                    value: '西城区',
                    label: '西城区',
                }, {
                    value: '朝阳区',
                    label: '朝阳区'
                }, {
                    value: '丰台区',
                    label: '丰台区'
                }]
            }]
        }, {
            value: '河南省',
            label: '河南省',
            children: [{
                value: '许昌市',
                label: '许昌市',
                children: [{
                    value: '魏都区',
                    label: '魏都区'
                }, {
                    value: '建安区',
                    label: '建安区'
                }]
            }, {
                value: '平顶山市',
                label: '平顶山市',
                children: [{
                    value: '新华区',
                    label: '新华区'
                }, {
                    value: '宝丰县',
                    label: '宝丰县'
                }]
            }]
        }]

        this.state = {
            dataSource: [],
            item: {
                name: String,
                phone: String,
                address: String,
                addPrefix: String,
                phonePrefix: '+86 '
            },
            isCheck: true,
            isEmpty: {
                isAddress:true,
                isPhone:true,
                isName:true
                
            }
        }
    }
    componentDidMount = () => {
        this.showTable()
    }
    showTable = () => {
        var storage = window.sessionStorage
        var addressData = JSON.parse(storage.getItem("address"))
        if (addressData) {
            this.setState({
                dataSource: addressData
            })
        }

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
        console.log(this.state.item)
        //console.log(this.state.dataSource)
        var isEmpty = true
        if(this.state.isEmpty.isAddress&&this.state.isEmpty.isName&&this.state.isEmpty.isPhone){
            isEmpty = false
        }
        if (this.state.isCheck && !isEmpty) {
            this.setState({
                dataSource: [...this.state.dataSource, this.state.item]
            }, () => {
                storage.setItem("address", JSON.stringify(this.state.dataSource))
            })
        }

    }
    nameChange = (e) => {
        console.log(e.target.value)
        this.setState({
            item: {
                ...this.state.item,
                name: e.target.value
            },
            isEmpty: {
                ...isEmpty,
                isName: false
            }
        })
    }
    phoneChange = (e) => {
        if (/^1[34578]\d{9}$/.test(e.target.value)) {
            this.setState({
                item: {
                    ...this.state.item,
                    phone: this.state.item.phonePrefix + e.target.value
                },
                isCheck: true,
                isEmpty: {
                    ...isEmpty,
                    isPhone: false
                }
            })
        } else {
            this.setState({
                isCheck: false
            })
        }
    }
    addressChange = (e) => {
        this.setState({
            item: {
                ...this.state.item,
                address: e.target.value
            },
            isEmpty: {
                ...isEmpty,
                isAddress: false
            }
        })
    }
    editAddPrefix = (value) => {
        console.log(value)
        this.setState({
            item: {
                ...this.state.item,
                addPrefix: value
            }
        })
    }
    editPhonePrefix = (value) => {
        console.log(value)
        this.setState({
            item: {
                ...this.state.item,
                phonePrefix: value
            }
        })
    }
    render() {
        return (
            <div className="address">
                <br />
                <br />
                <br />
                <div className="add">
                    <span>地址信息：</span>
                    <Cascader options={this.options} placeholder="Please select" onChange={this.editAddPrefix}></Cascader>
                    <br />
                    <span>详细地址：</span>
                    <Input style={{ width: 300, height: 100 }}
                        onChange={this.addressChange}
                    ></Input>
                    <br />
                    <span>收货人：</span>
                    <Input style={{ width: 200 }} onChange={this.nameChange}></Input>
                    <br />
                    <span>电话号码：</span>
                    <Select defaultValue="+86 " style={{ width: 150 }} onChange={this.editPhonePrefix}>
                        <Option value="+86 ">中国大陆+86</Option>
                        <Option value="+852 ">香港+852</Option>
                        <Option value="+853 ">澳门+853</Option>
                        <Option value="+886 ">台湾+886</Option>
                        <Option value="+81 ">日本+81</Option>
                        <Option value="+44 ">英国+44</Option>
                    </Select>
                    <Input style={{ width: 180 }} onChange={this.phoneChange}></Input>
                    {this.state.isCheck ? '' : <span>格式错误</span>}
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