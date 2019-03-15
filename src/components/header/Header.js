import React from 'react';
import {Layout,Menu} from 'antd';
import {Link} from 'react-router-dom';

const Header = (props) => {
    return(
        <Layout style={{position:'fixed', zIndex:1, width:'100%'}}>
        <div className="logo"></div>
        <Menu theme ="light" 
              mode="horizontal"  
              defaultSelectedKeys = {['1']}
              style={{lineHeight:'64px'}}>
            <Menu.Item key="1"><Link to={'/home'}>首页</Link></Menu.Item>
            <Menu.Item key="2"><Link to={'/product'}>商品</Link></Menu.Item>
            <Menu.Item key="3"><Link to={'/cart'}>购物车</Link></Menu.Item>
            <Menu.Item key="4"><Link to={'/user'}>个人中心</Link></Menu.Item>
        </Menu>
        </Layout>
    )
}
export default Header;