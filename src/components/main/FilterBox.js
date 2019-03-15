import React from 'react'
import {InputNumber,Button} from 'antd'

class FilterBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isMaxEmpty:true,
            isMinEmpty:true,
            maxValue:'',
            minValue:''
        }
    }
    /*
    onChangeMin(value){
        this.setState({
            isMinEmpty:false,
            minValue: value
        })
        this.props.onChangeMin(value);
    }
    onChangeMax(value){
        this.setState({
            isMaxEmpty:false,
            maxValue: value
        })
        this.props.onChangeMax(value);
    }
    */
    render(){
        return(
            <div>
                <span>¥</span>
            <InputNumber 
              placeholder = {this.state.isMinEmpty?'':this.state.minValue}
              formatter={value => `${value}`.replace(/\B(?=(\D{3})+(?!\d))/g,',')}
              parser={value => value.replace(/\$\s?|(,*)/g,'')}
              onChange={this.props.onChangeMin}
            ></InputNumber>
            -
            <InputNumber
            placeholder ={this.state.isMaxEmpty?'':this.state.maxValue}
            formatter={value => `${value}`.replace(/\B(?=(\D{3})+(?!\d))/g,',')}
            parser={value => value.replace(/\$\s?|(,*)/g,'')}
            onChange={this.props.onChangeMax}
            ></InputNumber>
            <Button type="primary" onClick={this.props.onFilter}>搜索</Button>
        </div>
        ) 
    }
}
export default FilterBox;



