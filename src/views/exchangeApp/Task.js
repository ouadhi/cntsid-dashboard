import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  InputGroup,
  InputGroupAddon,
  Badge
} from "reactstrap";
import ConfigService from "../../data/ConfigService";
import { AppSwitch } from "@coreui/react";
import PropTypes from "prop-types";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      isSuccess:false, 
      isWarning:false
    };


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.runTaskHandler = this.runTaskHandler.bind(this)
  }

  async runTaskHandler() {
    this.setState({
      isSuccess:false, 
      isWarning:false
    })
      await ConfigService.runTaskService(this.state.task.title) .then(response =>{
        if(response.status==200){
          this.setState({
            isSuccess:true, 
            isWarning:false
          })
        }else{
          this.setState({
            isSuccess:false, 
            isWarning:true
          })
        }
      })
      console.log("runtask");
  }

  handleInputChange(event) {
   
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    const newTask = {
        [name]: value,
        title: this.state.task.title,
        url: this.state.task.url,
        enable: this.state.task.enable,
    }

    this.setState({
        task:newTask
    },()=>console.log(this.state.task))
    this.props.funUpdate(newTask)
  } ; 


  handleSwitchChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    const newTask = {
        [name]: value,
        title: this.state.task.title,
        url: this.state.task.url,
        cron: this.state.task.cron,
    }
    this.setState({
        task:newTask
    },()=>console.log(this.state.task));
    this.props.funUpdate(newTask)
    
  }

  badgeResult(result){
    console.log(result)
    let badg=""
    switch(result){
      case 200:
       badg=<Badge className="mr-1" color="primary">Primary</Badge>  
        break;
      case 400:
        badg=<Badge className="mr-1" color="primary">Primary</Badge>  
        break
      default:
        badg=""
    }

    return badg

  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong >{this.state.task.title}</strong>
                <small> Task</small>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                      <Label htmlFor="url">Task URL</Label>
                      <Input type="text" id="url" value={this.state.task.url}/>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="time">Cron Time </Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          Min
                        </InputGroupAddon>
                        <Input type="select" name="cron" id="cron" value={this.state.task.cron}onChange={this.handleInputChange} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input> 
                      </InputGroup>
                      
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Active</Label>
                      <AppSwitch
                        name="enable"
                        className={"mx-1"}
                        variant={"3d"}
                        outline={"alt"}
                        color={"primary"}
                        label
                        dataOn={"\u2713"}
                        dataOff={"\u2715"}                          
                        checked={this.state.task.enable}
                        onChange={this.handleSwitchChange}
                      />  
                    </FormGroup>
                  </Col>
                </Row>
               
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <Button
                          block
                          color="primary"
                          onClick={this.runTaskHandler}
                        >
                          Run Task
                        </Button>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                  {this.state.isSuccess ? <Badge className="mr-1" color="success">success</Badge> : null }
                  {this.state.isWarning? <Badge className="mr-1" color="warning">warning</Badge> : null }
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
