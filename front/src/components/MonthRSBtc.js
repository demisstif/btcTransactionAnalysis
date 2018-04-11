import React, { Component } from 'react'
import { Layout, Menu, Alert} from 'antd'
import { LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip, Bar, BarChart, Legend } from 'recharts';
import $ from 'jquery'

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
        let datas = []

        fetch("http://127.0.0.1:8081/sent/month/btc").then((response) => {
            return response.json()
        }).then((json) => {
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:json[i].day,sent:json[i].txNumberOneDay, received:0, amt:2400}
                datas.push(single)
            }
            console.log(JSON.stringify(datas))
            fetch("http://127.0.0.1:8081/received/month/btc").then((response) => {
               return response.json()
            }).then((json) => {
                for (let i=0; i<json.length;i++) {
                    // alert(json[i].txNumberOneDay)
                    // let single = {name:json[i].day,sent:json[i].txNumberOneDay, received:0, amt:2400}
                    datas[i].received = json[i].txNumberOneDay;
                }
                console.log(JSON.stringify(datas))
                this.setState({data:datas})
            })


        }).catch(function (e) {
            alert(e)
        })
    }



    render() {
        const {data} =this.state
        return (
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="received" fill="#8884d8" />
                <Bar dataKey="sent" fill="#82ca9d" />
            </BarChart>
        );
    }
}

export default MonthRSBtc