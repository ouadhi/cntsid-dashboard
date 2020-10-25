import React, { Component, lazy, Suspense } from "react";
import { Bar } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { Card, CardBody, CardFooter, CardTitle, Col, Row } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

const Widget05 = lazy(() => import("../Widgets/Widget05"));
const variant =['facebook', 'twitter', 'linkedin', 'google-plus']

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
};

export default class MessageOut extends Component {
  bar = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
        stack: 2,
      },
      {
        label: "My Seconds dataset",
        backgroundColor: "rgb(103, 235, 52)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
        stack: 2,
      },
    ],
  };

  products = [
    {
      id: 1,
      type: "Debarquemnt",
      company: "Dpworld",
      date: "2020/01/03",
      size: 34,
    },

    {
      id: 2,
      type: "viste",
      company: "Dpworld",
      date: "2020/01/03",
      size: 6,
    },

    {
      id: 3,
      type: "Pull Out",
      company: "Dpworld",
      date: "2020/01/03",
      size: 55,
    },
  ];

  constructor(props){
    super(props) 

    this.state={
      isLoading: false, 
      data : null , 
      liste:[] , 
      items:[] 
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch("http://localhost:8881/api/v1/message/");
    const json = await response.json();
    this.setState({
      data: json.Out ,
      isLoading: false,
      liste:json.Out.liste , 
      items:json.Out.stat.items
    });

    console.log(this.state)
  }


  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div>
        {/*
          widget Top 
        */}
        <Row>
  
          {this.state.items.map((item,i) =>
          <Col>
          <Suspense fallback={this.loading()}>
            <Widget05 key={i}
              dataBox={() => ({
                variant: variant[i],
                Consumed: item.consumed,
                Notyet: item.notyet,
                title: item.title,
              })}
            ></Widget05>
          </Suspense>
        </Col> 
         
         )}

        </Row>

        {/*chart*/}
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Traffic</CardTitle>
                    <div className="small text-muted">November 2015</div>
                  </Col>
                </Row>

                <div
                  className="chart-wrapper"
                  style={{ height: 300 + "px", marginTop: 40 + "px" }}
                >
                  <Bar data={this.bar} options={options} />
                </div>
              </CardBody>

              <CardFooter></CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">table</CardTitle>
                    <div className="small text-muted">November 2015</div>
                  </Col>
                </Row>

                <div
                  className="chart-wrapper"
                  style={{ height: 600 + "px", marginTop: 40 + "px" }}
                >
                  <BootstrapTable data={this.state.liste}  pagination ={true} >
                    <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="type">Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="messageName">message</TableHeaderColumn>
                    <TableHeaderColumn dataField="saveDate">Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="user_name">user</TableHeaderColumn>
                    <TableHeaderColumn dataField="start">start</TableHeaderColumn>
                    <TableHeaderColumn dataField="end">end</TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </CardBody>

              <CardFooter></CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
