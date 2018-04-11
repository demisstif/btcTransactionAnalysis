import React, { Component } from 'react'
import { Layout, Menu, Alert, DatePicker, Divider} from 'antd'
import { LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip, Bar, BarChart, Legend, Label, AreaChart, Area } from 'recharts';
import moment from 'moment'
const {MonthPicker} = DatePicker;
const { Header, Content, Footer } = Layout;

class Balance extends Component {
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
        const {exchange} = this.props;
        console.log(exchange)
        fetch("http://127.0.0.1:8081/day/all"+"?exchange="+exchange).then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:String(json[i].month)+'.'+String(json[i].day),balance:json[i].balance, amt:2400}
                datas.push(single)
            }
            this.setState({dataAll:datas})


        }).catch(function (e) {
            alert(e)
        })
    }

    getDatas = (year, month) => {
        let datas = []
        const {exchange} = this.props;
        console.log(exchange)
        fetch("http://127.0.0.1:8081/day/month"+"?exchange="+exchange+"&year="+year+"&month="+month).then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:String(json[i].month)+'.'+String(json[i].day),balance:json[i].balance, amt:2400}
                datas.push(single)
            }
            this.setState({data:datas})
            // console.log(JSON.stringify(datas))
            // fetch("http://127.0.0.1:8081/received/month/btc"+"?exchange=bittrex").then((response) => {
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

                    <AreaChart width={1500} height={350} data={data}
                               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            {/*<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">*/}
                                {/*<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>*/}
                                {/*<stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>*/}
                            {/*</linearGradient>*/}
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="balance" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        {/*<Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />*/}
                    </AreaChart>
                    <hr/>
                    <div>
                        一月至三月交易所BTC数目变动
                    </div>
                    <AreaChart width={1800} height={350} data={dataAll}
                               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            {/*<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">*/}
                                {/*<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>*/}
                                {/*<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>*/}
                            {/*</linearGradient>*/}
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        {/*<Area type="monotone" dataKey="balance" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />*/}
                        <Area type="monotone" dataKey="balance" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </Content>

            </Layout>

        );
    }

}


export default Balance