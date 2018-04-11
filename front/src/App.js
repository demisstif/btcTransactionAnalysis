import React, { Component } from 'react'

import { Layout, Menu, Spin, Alert } from 'antd';
import Bittrex from './components/Bittrex';


import 'antd/dist/antd.css';
import './App.css';

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


        // if (!payroll) {
        //     return <Spin tip="Loading..." />;
        // }

        switch(mode) {
            case 'huobi':
                // return <Alert message="huobi" type="info" showIcon/>
                return <Alert message="bittrex" type="info" showIcon/>
            case 'bittrex':
                return <Bittrex/>
            case 'poloniex':
                return <Alert message="poloniex" type="info" showIcon/>
            default:
                return <Alert message="请选一个模式" type="info" showIcon />
        }
    }

    render() {

        return (
            <Layout>
                <Header className="header">
                    <div className="logo">btc 交易所交易数据分析</div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['bittrex']}
                        style={{ lineHeight: '64px' }}
                        onSelect={this.onSelectTab}
                    >

                        <Menu.Item key="bittrex">bittrex</Menu.Item>
                        <Menu.Item key="poloniex">poloniex</Menu.Item>
                        <Menu.Item key="huobi">huobi</Menu.Item>
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