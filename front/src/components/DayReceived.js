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
        // fetch("http://127.0.0.1:8081/sent/month/btc").then((response) => {
        //     let json = response.json()
        //     console.log(json)
        //
        //     for (let i=0; i<json.length;i++) {
        //         alert(json[i].txNumberOneDay)
        //         let single = {name:json[i].day,uv:4000, sent:json[i].txNumberOneDay, amt:2400}
        //         datas.push(single)
        //     }
        //     console.log(JSON.stringify(datas))
        //     let str_data = JSON.stringify(datas)
        //     this.setState({data:[{"name":1,"uv":4000,"sent":4952,"amt":2400},{"name":2,"uv":4000,"sent":222,"amt":2400},{"name":3,"uv":4000,"sent":165228.92737502,"amt":2400}]})
        // })



        fetch("http://127.0.0.1:8081/sent/month/btc"+"?exchange=bittrex").then((response) => {
            return response.json()
        }).then((json) => {
            console.log(json)
            for (let i=0; i<json.length;i++) {
                // alert(json[i].txNumberOneDay)
                let single = {name:json[i].day,uv:4000, sent:json[i].txNumberOneDay, amt:2400}
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
    //     fetch("http://127.0.0.1:8081/sent/month/btc").then(function(response) {
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
            <LineChart width={400} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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