import React, { Component } from 'react'

import { Layout, Menu, Spin, Alert } from 'antd';
import Bittrex from './components/Bittrex';


import 'antd/dist/antd.css';
import './App.css';
import Poloniex from "./components/Poloniex";
import Contrast from "./components/Contrast";

const { Header, Content, Footer } = Layout;

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            storageValue: 0,
            mode: 'bittrex'
        }
    }

    componentWillMount() {

    }


    onSelectTab = ({key}) => {
        this.setState({
            mode: key
        });
    }

    renderContent = () => {
        const {  mode } = this.state;
        let bittrex = 'bittrex'
        let poloniex = 'poloniex'


        // if (!payroll) {
        //     return <Spin tip="Loading..." />;
        // }

        switch(mode) {
            case 'huobi':
                // return <Alert message="huobi" type="info" showIcon/>
                return <Alert message="数据获取网站关于火币的数据不完整,暂不处理" type="info" showIcon/>
            case 'bittrex':
                return <Bittrex exchange={bittrex}/>
            case 'poloniex':
                return <Poloniex exchange={poloniex}/>
            case 'contrast':
                return <Contrast/>
            default:
                return <Alert message="请选一个模式" type="info" showIcon />
        }
    }

    render() {

        return (
            <Layout>
                <Header className="header">
                    <div className="logo">BTC交易所数据分析</div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['bittrex']}
                        style={{ lineHeight: '64px' }}
                        onSelect={this.onSelectTab}
                    >

                        <Menu.Item key="bittrex">Bittrex</Menu.Item>
                        <Menu.Item key="poloniex">Poloniex</Menu.Item>
                        <Menu.Item key="huobi">Huobi</Menu.Item>
                        <Menu.Item key="contrast">对比分析</Menu.Item>

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff', minHeight: '1000px' }}>
                        {this.renderContent()}
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    demisstif ©2018 交易分析
                </Footer>
            </Layout>
        );
    }
}

export default App