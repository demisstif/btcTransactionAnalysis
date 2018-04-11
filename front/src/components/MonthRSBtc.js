import React, { Component } from 'react'
import { Layout, Menu, Alert, DatePicker, Divider} from 'antd'
import { LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip, Bar, BarChart, Legend, Label } from 'recharts';
import moment from 'moment'
const {MonthPicker} = DatePicker;
const { Header, Content, Footer } = Layout;

// function disabledDate(current) {
//     // Can not select days before today and today
//     // console.log(current)
//     return ;
// }

class MonthRSBtc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataAll: []
        };

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
                let single = {name:String(json[i].month)+'.'+String(json[i].day),sent:json[i].sentBtc, received:json[i].receivedBtc, amt:2400}
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
                let single = {name:String(json[i].month)+'.'+String(json[i].day),sent:json[i].sentBtc, received:json[i].receivedBtc, amt:2400}
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
            <Content style={{ padding: '0 50px'}}>
                <div>
                    <p3>recieved代表进入交易所;sent代表出交易所</p3>
                    <hr/>
                    <div><b>每月进/出交易所BTC</b></div>
                    请选择月份 <MonthPicker onChange={this.onSelectMonth} placeholder="Select month" defaultValue={moment('2018/3','YYYY/MM')}/>
                </div>

                <BarChart width={1800} height={350} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" >
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="received" fill="#8884d8" />
                    <Bar dataKey="sent" fill="#82ca9d" />
                </BarChart>
                <hr/>
                <div><b>一月至三月总体趋势</b></div>
                <LineChart width={1800} height={350} data={dataAll}
                           margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="received" stroke="#8884d8" />
                    <Line type="monotone" dataKey="sent" stroke="#82ca9d" />
                </LineChart>
            </Content>

        );
    }
}

export default MonthRSBtc