import React, { Component } from 'react'
import { Layout, Menu, Alert} from 'antd'
import { LineChart, Line, XAxis, YAxis,CartesianGrid, Tooltip } from 'recharts';
import $ from 'jquery'

class DayReceived extends Component {
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
            ]
        };
        this.componentWillMount = this.componentWillMount.bind(this)

    }

    componentWillMount() {
        let datas = []
        // fetch("http://demisstif.cc:8081/day/month"+"?exchange=bittrex&year=2018&month=3").then((response) => {
        fetch("http://demisstif.cc:8081/day/all"+"?exchange=bittrex").then((response) => {
            return response.json()
        }).then((json) => {
            console.log(json)
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:String(json[i].month)+'.'+String(json[i].day),uv:4000, sent:json[i].receivedBtc, amt:2400}
                datas.push(single)
            }
            console.log(JSON.stringify(datas))
            this.setState({data:datas})
        }).catch(function (e) {
            alert(e)
        })
    }

    // componentDidMount(){
    //     // $.ajax({
    //     //     url: "http://localhost:8081/sent/month/btc",
    //     //     dataType: "JSON",
    //     //     success: function (data) {
    //     //         console.log(data)
    //     //     }
    //     // })
    //     let datas = []
    //     fetch("http://demisstif.cc:8081/sent/month/btc").then(function(response) {
    //         return response.json()
    //     }).then(function(json) {
    //
    //         for (let i=0; i<json.length;i++) {
    //            alert(json[i].txNumberOneDay)
    //            let single = {name:json[i].day,uv:4000, sent:json[i].txNumberOneDay, amt:2400}
    //            datas.push(single)
    //        }
    //        console.log(JSON.stringify(datas))
    //
    //     }).catch(function (e) {
    //        alert(e)
    //     })
    //     // this.setState({data:JSON.stringify(datas)})
    //
    //
    // }

    render() {
        const {data} =this.state
        return (
            <LineChart width={1200} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="sent" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        );
    }
}

export default DayReceived