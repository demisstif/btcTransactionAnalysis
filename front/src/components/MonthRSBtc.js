import React, { Component } from 'react'
import { Layout, Menu, Alert, DatePicker} from 'antd'
import { LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip, Bar, BarChart, Legend } from 'recharts';
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
            data: [
                {name: 'Page A', sent: 4000, received: 2400, amt: 2400},
                {name: 'Page B', sent: 3000, received: 1398, amt: 2210},
                {name: 'Page C', sent: 2000, received: 9800, amt: 2290},
                {name: 'Page D', sent: 2780, received: 3908, amt: 2000},
                {name: 'Page E', sent: 1890, received: 4800, amt: 2181},
                {name: 'Page F', sent: 2390, received: 3800, amt: 2500},
                {name: 'Page G', sent: 3490, received: 4300, amt: 2100},
            ]
        };
        this.componentWillMount = this.componentWillMount.bind(this)

    }



    componentWillMount() {
        this.getDatas(2018, 3)
    }

    getDatas = (year, month) => {
        let datas = []
        fetch("http://127.0.0.1:8081/day/month"+"?exchange=bittrex&year="+year+"&month="+month).then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:json[i].day,sent:json[i].sentBtc, received:json[i].receivedBtc, amt:2400}
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
        const {data} =this.state
        return (
            <Content style={{ padding: '0 50px'}}>
                <div>
                    <MonthPicker onChange={this.onSelectMonth} placeholder="Select month" defaultValue={moment('2018/3','YYYY/MM')}/>
                </div>
                <BarChart width={1500} height={500} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="received" fill="#8884d8" />
                    <Bar dataKey="sent" fill="#82ca9d" />
                </BarChart>
            </Content>

        );
    }
}

export default MonthRSBtc