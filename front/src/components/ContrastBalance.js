import React, { Component } from 'react'
import { Layout, Menu, Alert, DatePicker, Divider} from 'antd'
import { LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip, Bar, BarChart, Legend, Label, AreaChart, Area } from 'recharts';
import moment from 'moment'
const {MonthPicker} = DatePicker;
const { Header, Content, Footer } = Layout;

class ContrastBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataAll:[]
        };

    }

    componentWillMount(){
        this.getDatas(2018,3)
        this.getAllDatas()
    }

    getAllDatas = () => {
        let datas = []
        fetch("http://demisstif.cc:8081/day/all"+"?exchange=bittrex").then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:String(json[i].month)+'.'+String(json[i].day),bittrex:json[i].balance, poloniex:0, amt:2400}
                datas.push(single)
            }
            fetch("http://demisstif.cc:8081/day/all"+"?exchange=poloniex").then((response) => {
                return response.json()
            }).then((json) => {
                for (let i=0; i<json.length;i++) {
                    // alert(json[i].txNumberOneDay)
                    datas[i].poloniex = json[i].balance
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
        fetch("http://demisstif.cc:8081/day/month"+"?exchange=bittrex&year="+year+"&month="+month).then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:String(json[i].month)+'.'+String(json[i].day),bittrex:json[i].balance, poloniex:0, amt:2400}
                datas.push(single)
            }
            fetch("http://demisstif.cc:8081/day/month"+"?exchange=poloniex&year="+year+"&month="+month).then((response) => {
                return response.json()
            }).then((json) => {
                for (let i=0; i<json.length;i++) {
                    // alert(json[i].txNumberOneDay)
                    datas[i].poloniex = json[i].balance
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
                    <div>交易所BTC月变化</div>
                    请选择月份 <MonthPicker onChange={this.onSelectMonth} placeholder="Select month" defaultValue={moment('2018/3','YYYY/MM')}/>
                </header>
                <Divider/>
                <Content>
                    <LineChart width={1000} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                    <LineChart width={1000} height={300} data={dataAll} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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


export default ContrastBalance