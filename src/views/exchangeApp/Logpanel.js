import React, { Component, lazy, Suspense } from "react";
import { Bar } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Row,
  Badge,
} from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

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

const logs = [
  {
    id: 2,
    date: "2020/01/03",
    type: "viste",
    message: "message",
    logger: "localog",
    level: "WARN",
  },

  {
    id: 2,
    date: "2020/01/03",
    type: "viste",
    message: "message",
    logger: "localog",
    level: "INFO",
  },

  {
    id: 2,
    date: "2020/01/03",
    type: "viste",
    message: "message",
    logger: "localog",
    level: "ERROR",
  },
  {
    id: 2,
    date: "2020/01/03",
    type: "viste",
    message: "message",
    logger: "localog",
    level: "OFF",
  },
];

function levelformat(cell, row) {
  let badge = null;
  switch (cell) {
    case "INFO":
      badge = (
        <Badge className="mr-1" color="success">
          Success
        </Badge>
      );
      break;

    case "WARN":
      badge = (
        <Badge className="mr-1" color="warning">
          warning
        </Badge>
      );
      break;
    case "ERROR":
      badge = (
        <Badge className="mr-1" color="danger">
          warning
        </Badge>
      );
      break;

    default:
      badge = (
        <Badge className="mr-1" color="dark">
          warning
        </Badge>
      );
      break;
  }
  return badge;
}

export default class Logpanel extends Component {
  bar = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "info",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "Warning",
        backgroundColor: "rgb(103, 235, 52)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  render() {
    return (
      <div>
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
                  style={{ height: 300 + "px", marginTop: 40 + "px" }}
                >
                  <BootstrapTable data={logs} pagination 
                  options={ { noDataText: 'This is custom text for empty data' } }
                  bordered={false}>
                    <TableHeaderColumn
                      dataField="level"
                      dataFormat={levelformat}
                    >
                      level
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="id" isKey>
                      ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="date">Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="message">
                      Message
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="logger">
                      Logger
                    </TableHeaderColumn>
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
