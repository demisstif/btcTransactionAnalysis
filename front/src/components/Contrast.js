import React, { Component } from 'react'
import { Layout, Menu, Alert} from 'antd'
import DayReceived from './DayReceived'
import MonthRSBtc from './MonthRSBtc'
import HotDayOneMonth from './HotDayOneMonth'
import Balance from "./Balance";
import Type from "./Type";
import ContrastHot from "./ContrastHot";
import ContrastBalance from "./ContrastBalance";

const { Content, Sider } = Layout;

class Contrast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'balance'
        };

    }

    onSelectTab = ({key}) =>{
        this.setState({
            mode: key
        });
    }
    renderContent = () => {
        const {exchange} = this.props;
        const { mode}  = this.state;
        switch (mode) {

            case 'contrastHot':
                return <ContrastHot/>
            case 'balance':
                return <ContrastBalance/>

        }
    }

    render() {
        return (
            <Layout style={{ padding: '24px 0', background: '#fff'}}>
                <Sider width={200} style={{ background: '#fff'}}>
                    <Menu
                        mode='inline'
                        defaultSelectedKeys={['balance']}
                        style={{height:'100%'}}
                        onSelect={this.onSelectTab}
                    >

                        {/*<Menu.Item key="monthRSBtc">进/出BTC数目</Menu.Item>*/}
                        <Menu.Item key="balance">交易所BTC数目对比</Menu.Item>
                        <Menu.Item key="contrastHot">交易所活跃度对比</Menu.Item>
                        {/*<Menu.Item key="type">交易种类占比</Menu.Item>*/}

                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minheight: 280}}>
                    {this.renderContent()}
                </Content>

            </Layout>
        );
    }
}

export default Contrast