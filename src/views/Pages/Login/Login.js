import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Button ,  Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {

  constructor(props){
    super(props)  ; 
    this.state = {
      username: '',
      password: '',
     };

     this.onChange  = this.onChange.bind(this)  ; 
     this.login = this.login.bind(this)  ; 
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
    console.log(this.state)
  }

  login(){
    console.log(this.state) ; 
  }

  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="username" placeholder="Username" autoComplete="username" onChange={this.onChange}  />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.onChange} />
                      </InputGroup>
                     
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.login} >Login</Button>
                        </Col>
                        {/*
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                         */}
                      </Row>
                    
                    </Form>
                  </CardBody>
                
                </Card>
                {/* 
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
                */}
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
