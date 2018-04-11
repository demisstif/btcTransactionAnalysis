import React, { Component } from 'react'
import { Layout, Menu, Alert, DatePicker, Divider} from 'antd'
import { LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip, Label, Legend} from 'recharts';
import moment from 'moment'


const {MonthPicker} = DatePicker;
const { Header, Content, Footer } = Layout;

class ContrastHot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Page A', uv: 4000, sent: 2400, amt: 2400},
                {name: 'Page B', uv: 3000, sent: 1398, amt: 2210},
                {name: 'Page C', uv: 2000, sent: 9800, amt: 2290},
                {name: 'Page D', uv: 2780, sent: 3908, amt: 2000},
                {name: 'Page E', uv: 1890, sent: 4800, amt: 2181},
                {name: 'Page F', uv: 2390, sent: 3800, amt: 2500},
                {name: 'Page G', uv: 3490, sent: 4300, amt: 2100},
            ],
            dataAll:[]
        };
        // this.componentWillMount = this.componentWillMount.bind(this)

    }

    componentWillMount() {
        // let finalDatas = []
        // let datasBittrex = this.getDatas(2018, 3, 'bittrex');
        // let datasPoloniex = this.getDatas(2018, 3, 'poloniex');
        // for (let i=0; i<datasBittrex.length; i++) {
        //     let single = {name:datasBittrex[i].name, bittrexTotal:datasBittrex[i].total, poloniexTotal:datasPoloniex[i].total}
        //     finalDatas.push(single)
        // }
        // this.setState({data:finalDatas})
        this.getDatas(2018,3)
        this.getAllDatas()
    }

    getAllDatas = () => {
        let datas = []
        fetch("http://127.0.0.1:8081/day/all"+"?exchange=bittrex").then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:String(json[i].month)+'.'+String(json[i].day),bittrex:json[i].sentAmount+json[i].receivedAmount, poloniex:0, amt:2400}
                datas.push(single)
            }
            fetch("http://127.0.0.1:8081/day/all"+"?exchange=poloniex").then((response) => {
                return response.json()
            }).then((json) => {
                for (let i=0; i<json.length;i++) {
                    // alert(json[i].txNumberOneDay)
                    datas[i].poloniex = json[i].sentAmount+json[i].receivedAmount
                }
                console.log(datas)
                this.setState({dataAll:datas})
            })
            // this.setState({dataAll:datas})


        }).catch(function (e) {
            alert(e)
        })
    }
    getDatas = (year, month) => {
        let datas = []
        // const {exchange} = this.props;
        fetch("http://127.0.0.1:8081/day/month"+"?exchange=bittrex&year="+year+"&month="+month).then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:String(json[i].month)+'.'+String(json[i].day),bittrex:json[i].sentAmount+json[i].receivedAmount, poloniex:0, amt:2400}
                datas.push(single)
            }
            fetch("http://127.0.0.1:8081/day/month"+"?exchange=poloniex&year="+year+"&month="+month).then((response) => {
                return response.json()
            }).then((json) => {
                for (let i=0; i<json.length;i++) {
                    // alert(json[i].txNumberOneDay)
                    datas[i].poloniex = json[i].sentAmount+json[i].receivedAmount
                }
                console.log(datas)
                this.setState({data:datas})
            })



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
        const {data, dataAll} =this.state
        return (
            <Layout style={{background:'#fff'}}>
                <header>
                    <hr/>
                    <div><b>活跃度月内变化对比</b></div>
                    请选择月份 <MonthPicker onChange={this.onSelectMonth} placeholder="Select month" defaultValue={moment('2018/3','YYYY/MM')}/>
                    <div>日活跃度=received交易数+sent交易数, 反映当日交易所的转币笔数</div>
                </header>
                <Content>
                    <LineChart width={1500} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="name" >
                            <Label value="日期" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis label={{ value: 'received和sent的总交易数', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="bittrex" stroke="#8884d8" />
                        <Line type="monotone" dataKey="poloniex" stroke="#82ca9d" />
                    </LineChart>
                    <hr/>
                    <div><b>一月到三月活跃度变化</b></div>
                    <LineChart width={1800} height={400} data={dataAll} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="name" >
                            <Label value="日期" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis label={{ value: 'received和sent的总交易数', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend/>
                        <Line type="monotone" dataKey="bittrex" stroke="#8884d8" />
                        <Line type="monotone" dataKey="poloniex" stroke="#82ca9d" />
                    </LineChart>


                </Content>
            </Layout>

        );
    }
}

export default ContrastHot