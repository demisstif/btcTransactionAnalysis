import React, { Component } from 'react'
import { Layout, Menu, Alert, DatePicker, Divider} from 'antd'
import { LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip, Label} from 'recharts';
import moment from 'moment'


const {MonthPicker} = DatePicker;
const { Header, Content, Footer } = Layout;

class HotDayOneMonth extends Component {
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
        this.getDatas(2018, 3)
        this.getAllDatas()
    }

    getAllDatas = () => {
        let datas = []
        const {exchange} = this.props;
        fetch("http://demisstif.cc:8081/day/all"+"?exchange="+exchange).then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:String(json[i].month)+'.'+String(json[i].day),total:json[i].sentAmount+json[i].receivedAmount, amt:2400}
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
        fetch("http://demisstif.cc:8081/day/month"+"?exchange="+exchange+"&year="+year+"&month="+month).then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:String(json[i].month)+'.'+String(json[i].day),total:json[i].sentAmount+json[i].receivedAmount, amt:2400}
                datas.push(single)
            }
            this.setState({data:datas})
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
        const {data, dataAll} =this.state
        return (
            <Layout style={{background:'#fff'}}>
                <header>
                    <hr/>
                    <div><b>活跃度月内变化</b></div>
                    请选择月份 <MonthPicker onChange={this.onSelectMonth} placeholder="Select month" defaultValue={moment('2018/3','YYYY/MM')}/>
                    <div>日活跃度=received交易数+sent交易数, 反映当日交易所的转币笔数</div>
                </header>
                <Content>
                    <LineChart width={1000} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="total" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="name" >
                            <Label value="日期" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis label={{ value: 'received和sent的总交易数', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                    </LineChart>
                    <hr/>
                    <div><b>一月到三月活跃度变化</b></div>
                    <LineChart width={1000} height={300} data={dataAll} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="total" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="name" >
                            <Label value="日期" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis label={{ value: 'received和sent的总交易数', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                    </LineChart>


                </Content>
            </Layout>

        );
    }
}

export default HotDayOneMonth