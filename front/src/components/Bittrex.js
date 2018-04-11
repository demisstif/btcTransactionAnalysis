import React, { Component } from 'react'
import { Layout, Menu, Alert} from 'antd'
import DayReceived from './DayReceived'
import MonthRSBtc from './MonthRSBtc'
import HotDayOneMonth from './HotDayOneMonth'

const { Content, Sider } = Layout;


class Bittrex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'dayReceived'
        };

    }

    componentDidMount() {

    }

    onSelectTab = ({key}) =>{
        this.setState({
            mode: key
        });
    }


    renderContent = () => {
        const {account} = this.props;
        const { mode}  = this.state;
        switch (mode) {
            case 'dayReceived':
                // return <div>DayReceived</div>
                return <DayReceived/>
            case 'daySent':
                return <div>DaySent</div>
            case 'monthRSBtc':
                return <MonthRSBtc/>
            case 'hotDayOneMonth':
                return <HotDayOneMonth/>
        }
    }

    render() {
        return (
            <Layout style={{ padding: '24px 0', background: '#fff'}}>
                <Sider width={200} style={{ background: '#fff'}}>
                    <Menu
                        mode='inline'
                        defaultSelectedKeys={['dayReceived']}
                        style={{height:'100%'}}
                        onSelect={this.onSelectTab}
                    >
                        <Menu.Item key="dayReceived">月离场btc</Menu.Item>
                        <Menu.Item key="daySent">每日提取资金</Menu.Item>
                        <Menu.Item key="monthRSBtc">每月进/离资金</Menu.Item>
                        <Menu.Item key="hotDayOneMonth">月内日活跃度</Menu.Item>

                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minheight: 280}}>
                    {this.renderContent()}
                </Content>

            </Layout>
        );
    }


}

export default Bittrex
