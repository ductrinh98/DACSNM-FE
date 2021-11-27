import React, { Component } from 'react'
import API from '../api';
import './style.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default class Signup extends Component {
    state = {
        username: "",
        password: "",
        passwordConf: "",
        message: "",
    };

    handleSubmit = (event) => {
      event.preventDefault();
      API.Signup(this.state.username, this.state.password, this.state.passwordConf)
      .then(res=>{
          this.setState({message: res.data.message})
      })
      .catch(err=>{
            this.setState({message: err.message})
      })
    };
   render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
            <h1 className="text-center">Đăng kí</h1>
            {this.state.message? 
            <div className="alert alert-primary" role="alert">
                {this.state.message}
            </div>: <div/>}
          <Form.Group size="lg" controlId="username">
            <Form.Label>Tên tài khoản</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.username}
              onChange={(e) => this.setState({username: e.target.value})}
              required 
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Mật Khẩu</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
              required 
            />
          </Form.Group>
          <Form.Group size="lg" controlId="passwordConf">
            <Form.Label>Nhập lại mật Khẩu</Form.Label>
            <Form.Control
              type="password"
              value={this.state.passwordConf}
              onChange={(e) => this.setState({passwordConf: e.target.value})}
              required 
            />
          </Form.Group>
          <Button block size="lg" type="submit">
            Đăng kí
          </Button>
        </Form>
      </div>
    );
   }
  }