import React, { Component, lazy, Suspense } from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Progress,
  Row,
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

const Widget05 = lazy(() => import("../../views/Widgets/Widget05"));

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandDanger = getStyle("--danger");

// Card Chart 1
const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [50, 50, 50, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
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
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
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
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
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
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Main Chart

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor,
        };
      },
    },
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          // stepSize: Math.ceil(250 / 5),
          // max: 250,
        },
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

const url = "http://localhost:8881/api/v1/message/";

class DashboardApp extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,

      isLoading: false,
      datajson: null,

      manifest: null,
      declaration: null,
      extrat_visite: null,
      take_out: null,

      debarquement: null,
      park: null,
      pullout: null,

      chart: null,
    };
  }

  async componentDidMount() {
    await this.infApp();
    await this.chartInfo();

    console.log(this.state);
  }

  async chartInfo() {
    this.setState({ isLoading: true });
    const response = await fetch("http://localhost:8881/api/ui/v2/static");
    const datachart = await response.json();
    this.setState({
      isLoading: false,
      chart: this.creatlinechart(datachart),
    });
  }

  creatlinechart(datachart) {
    return {
      labels: datachart.date,
      datasets: [
        {
          label: "debarquement",
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: "#fff",
          borderWidth: 2,
          data: datachart.debarquement,
        },
        {
          label: "ParcVisite",
          backgroundColor: "transparent",
          borderColor: brandSuccess,
          pointHoverBackgroundColor: "#fff",
          borderWidth: 2,
          data: datachart.parc,
        },
        {
          label: "Pullout",
          backgroundColor: "transparent",
          borderColor: brandDanger,
          pointHoverBackgroundColor: "#fff",
          borderWidth: 1,
          borderDash: [8, 5],
          data: datachart.pullout,
        },
      ],
    };
  }

  async infApp() {
    this.setState({ isLoading: true });
    const response = await fetch(url);
    const json = await response.json();
    this.setState({
      datajson: json,
      isLoading: false,
      debarquement: this.filtter_val(json.In.stat.items, "debarquement"),
      park: this.filtter_val(json.In.stat.items, "parc visite"),
      pullout: this.filtter_val(json.In.stat.items, "pullout"),

      manifest: this.filtter_val(json.Out.stat.items, "manifest"),
      declaration: this.filtter_val(json.Out.stat.items, "declaration"),
      extrat_visite: this.filtter_val(json.Out.stat.items, "contre"),
      take_out: this.filtter_val(json.Out.stat.items, "bae"),
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  filtter_val(arr, type) {
    return arr.find((item) => {
      return item.title === type;
    });
  }

  

  render() {
    if (
      this.state.isLoading ||
      this.state.datajson == null ||
      this.state.chart == null
    ) {
      console.log(this.state.isLoading);
      return <p>Loading ...</p>;
    }

    return (
      <div className="animated fadeIn">
        <p>{this.state.debarquement.title}</p>
        {/*
          widget Top 
        */}
        <Row>
          <Col xs="6" sm="6" lg="3">
            <Suspense fallback={this.loading()}>
              <Widget05
                dataBox={() => ({
                  variant: "facebook",
                  Consumed: this.state.manifest.consumed,
                  Notyet: this.state.manifest.notyet,
                  title: "Manifest",
                })}
              ></Widget05>
            </Suspense>
          </Col>

          <Col xs="6" sm="6" lg="3">
            <Suspense fallback={this.loading()}>
              <Widget05
                dataBox={() => ({
                  variant: "twitter",
                  Consumed: this.state.declaration.consumed,
                  Notyet: this.state.declaration.notyet,
                  title: "Declaration",
                })}
              ></Widget05>
            </Suspense>
          </Col>

          <Col xs="6" sm="6" lg="3">
            <Suspense fallback={this.loading()}>
              <Widget05
                dataBox={() => ({
                  variant: "linkedin",
                  Consumed: this.state.extrat_visite.consumed,
                  Notyet: this.state.extrat_visite.notyet,
                  title: "extrat-Visite",
                })}
              ></Widget05>
            </Suspense>
          </Col>

          <Col xs="6" sm="6" lg="3">
            <Suspense fallback={this.loading()}>
              <Widget05
                dataBox={() => ({
                  variant: "google-plus",
                  Consumed: this.state.take_out.consumed,
                  Notyet: this.state.take_out.notyet,
                  title: "Take-Off",
                })}
              ></Widget05>
            </Suspense>
          </Col>
        </Row>

        {/*
          widget Second 
        */}
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">
                  {this.state.debarquement.count_all}
                </div>
                <div>Debarquement</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Line
                  data={cardChartData2}
                  options={cardChartOpts2}
                  height={70}
                />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.park.count_all}</div>
                <div>Park Visit</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Line
                  data={cardChartData1}
                  options={cardChartOpts1}
                  height={70}
                />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.pullout.count_all}</div>
                <div>Pull Out</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: "70px" }}>
                <Line
                  data={cardChartData3}
                  options={cardChartOpts3}
                  height={70}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Traffic</CardTitle>
                    <div className="small text-muted"></div>
                  </Col>
                </Row>
                {/*
                  chart 
                  */}
                <div
                  className="chart-wrapper"
                  style={{ height: 300 + "px", marginTop: 40 + "px" }}
                >
                  <Line
                    data={this.state.chart}
                    options={mainChartOpts}
                    height={300}
                  />
                </div>
              </CardBody>

              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Parc Visite</div>
                    <strong></strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="success"
                      value="100"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Debarquement</div>
                    <strong></strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="info"
                      value="100"
                    />
                  </Col>
                  
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Pull Out</div>
                    <strong></strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="danger"
                      value="100"
                    />
                  </Col>
                  
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardApp;
