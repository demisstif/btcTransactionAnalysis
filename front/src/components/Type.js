import React, { Component } from 'react'
import { Layout, Menu, Alert, DatePicker, Divider} from 'antd'
import { LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip, Bar, BarChart, Legend, Label, AreaChart, Area, Pie, PieChart } from 'recharts';
import moment from 'moment'
const {MonthPicker} = DatePicker;
const { Header, Content, Footer } = Layout;

class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {dataAmount:[], dataBtc:[]};

    }

    componentWillMount(){
        this.getDatas(2018,3)
    }

    getDatas = (year, month) => {
        let datasAmount = []
        let datasBtc = []
        const {exchange} = this.props;
        fetch("http://demisstif.cc:8081/month/month"+"?exchange="+exchange+"&year="+year+"&month="+month).then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let receivedAmount = {name:'receivedAmount', value:json[i].receivedAmount}
                let sentAmount = {name:'sentAmount', value:json[i].sentAmount}
                datasAmount.push(receivedAmount);
                datasAmount.push(sentAmount)

                let rBtc = {name:'receivedBtc', value:json[i].receivedBtc};
                let sBtc = {name:'sentBtc', value:json[i].sentBtc};
                datasBtc.push(rBtc);
                datasBtc.push(sBtc);
            }
            this.setState({dataAmount:datasAmount, dataBtc:datasBtc})
            // console.log(JSON.stringify(datas))
            // fetch("http://demisstif.cc:8081/received/month/btc"+"?exchange=bittrex").then((response) => {
            //    return response.json()
            // }).then((json) => {
            //     for (let i=0; i<json.length;i++) {
            //         // alert(json[i].txNumberOneDay)
            //         // let single = {name:json[i].day,sent:json[i].txNumberOneDay, received:0, amt:2400}
            //         datas[i].received = json[i].txNumberOneDay;
            //     }
            //     console.log(JSON.stringify(datas))
            //     this.setState({data:datas})
            // })


        }).catch(function (e) {
            alert(e)
        })
    }

    onSelectMonth = (date, dateString) => {
        let values = dateString.split('-');
        let year = Number(values[0])
        let month = Number(values[1])
        this.getDatas(year, month)
    }

    render() {
        const {dataAmount, dataBtc} =this.state
        return (
            <Layout style={{background:'#fff'}}>

                <header>

                    <hr/>
                    <div>交易所BTC月变化</div>
                    请选择月份 <MonthPicker onChange={this.onSelectMonth} placeholder="Select month" defaultValue={moment('2018/3','YYYY/MM')}/>
                </header>
                <Content>
                    <span>
                         <PieChart width={730} height={250}>
                        <Pie data={dataAmount} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" label />
                    </PieChart>
                    </span>
                    <div float>
                    <PieChart width={730} height={250}>
                        <Pie data={dataBtc} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                    </PieChart>
                    </div>

                </Content>

            </Layout>

        );
    }
}

export default Type