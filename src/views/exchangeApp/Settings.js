import React, { Component } from "react";
import Task from "./Task";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import ConfigService from "../../data/ConfigService";
import { AppSwitch } from "@coreui/react";
import { element } from "prop-types";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: null,
    };
    this.saveAllAction = this.saveAllAction.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const response = await ConfigService.getConfiguration();
    const json = await response.data;
    this.setState({
      data: json,
      isLoading: false,
    });
  }

  updateState = (configItem) => {
    const elementsIndex = this.state.data.findIndex(
      (element) => element.title == configItem.title
    );
    let newArray = [...this.state.data];
    newArray[elementsIndex] = configItem;
    this.setState({ data: newArray }, () => {});
  };

  saveAllAction = () => {
    ConfigService.updateConfiguration(this.state.data)
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    if (this.state.isLoading || this.state.data == null) {
      return this.loading;
    }
    return (
      <div>
        <Row>
          {this.state.data.map((item, i) => (
            <Col sm="6" key={i}>
              <Task task={item} funUpdate={this.updateState}></Task>
            </Col>
          ))}
        </Row>
        <Button block color="primary" onClick={this.saveAllAction}></Button>
      </div>
    );
  }
}
