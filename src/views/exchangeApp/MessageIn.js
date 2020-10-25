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
} from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

const Widget05 = lazy(() => import("../Widgets/Widget05"));
const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
};

const variant =['facebook', 'twitter', 'google-plus' ,'linkedin']
const url  = "http://localhost:8881/api/v1/message/"

export default class MessageIn extends Component {


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
      },
      {
        label: "My Seconds dataset",
        backgroundColor: "rgb(103, 235, 52)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  products = [
    {
      id: 1,
      type: "Debarquemnt",
      company:"Dpworld",
      date:"2020/01/03",
      size:34
    },

    {
      id: 2,
      type: "viste",
      company:"Dpworld",
      date:"2020/01/03",
      size:6
    },

    {
      id: 3,
      type: "Pull Out",
      company:"Dpworld",
      date:"2020/01/03",
      size:55
    },
    
  ];

  constructor(props){
    super(props) ; 

    this.state={
      isLoading: false, 
      data : null , 
      liste:[] , 
      items:[] , 
      debarquement : null ,
      park : null , 
      pullout :  null 
      
    }
   
  }


  async componentDidMount() {

    this.setState({ isLoading: true });
    
    const response = await fetch(url);
    console.log(response)
    const json = await response.json();
    this.setState({
      data: json.In ,
      isLoading: false,
      liste:json.In.liste , 
      items:json.In.stat.items ,

      debarquement:this.filtter_val(json.In.stat.items,"debarquement"),
      park:this.filtter_val(json.In.stat.items,"parc visite"), 
      pullout:this.filtter_val(json.In.stat.items,"pullout") , 
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

   options = {
   // you can change the dropdown list for size per page
    sizePerPage: 5,  // which size per page you want to locate as default
    pageStartIndex: 0, // where to start counting the pages
    paginationSize: 3,  // the pagination bar size.
    prePage: 'Prev', // Previous page button text
    nextPage: 'Next', // Next page button text
    firstPage: 'First', // First page button text
    lastPage: 'Last', // Last page button text
    paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
    paginationPosition: 'top'  // default is bottom, top and both is all available
    // hideSizePerPage: true > You can hide the dropdown for sizePerPage
    // alwaysShowAllBtns: true // Always show next and previous button
    // withFirstAndLast: false > Hide the going to First and Last page button
  };

  filtter_val(arr, type) {
    return arr.find((item) => {
      return item.title === type;
    });
  }

  render() {
     
    if (this.state.isLoading  || this.state.data== null ) {
      
      return this.loading ; 
    }
  
    return (
      <div>
  
        <Row>

          {
            this.state.items.map((item, i)=>
            <Col xs="6" sm="6" lg="4">
            <Suspense fallback={this.loading()}>
              <Widget05
                dataBox={() => ({
                  variant: variant[i],
                  All: item.count_all,
                  ToDay: item.count_today,
                  title:item.title,
                })}
              ></Widget05>
            </Suspense>
          </Col>
            )
          }
        </Row>

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
                                                           