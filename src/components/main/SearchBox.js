import React,{Component} from 'react';
import {Input} from 'antd'

class SearhBox extends Component{
    constructor(props){
        super(props)
        this.state = {
            isEmpty:true,
            keyword:''
        }
    }
    onSearch = (value) =>{
        //console.log(value)
        this.setState({
            isEmpty:false,
            keyword: value
        })
        this.props.onSearch(value)
    }
    render(){
        return(
        <div>
            <Input.Search
             placeholder={this.state.isEmpty?"input search text":this.state.keyword}
             onSearch={value => this.onSearch(value)}
             enterButton
             style={{width:200}}
            ></Input.Search>
        </div>
        )  
    }
}
export default SearhBox;