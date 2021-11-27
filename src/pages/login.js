import React, { Component } from 'react'
import API from '../api';
import './style.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";


export default class Login extends Component {
    state = {
        username: "",
        password: "",
        message: ""
    };

    handleSubmit = (event) => {
        event.preventDefault();
        API.Signin(this.state.username, this.state.password)
        .then(res=>{
            this.setState({message: res.data.message})
            if(res.data.id && res.data.name) {
                localStorage.setItem("id", res.data.id)
                localStorage.setItem("name", res.data.name)
                // console.log(res.headers)
                // window.location.href="/"
            }
        })
        .catch(err=>{
              this.setState({message: err.message})
        })
      };
   render() {
    return (
      <div className="Login">
          { localStorage.getItem("id") ? <Redirect to="/" />:
        <Form onSubmit={this.handleSubmit}>
            <h1 className="text-center">Đăng nhập</h1>
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
          <Button block size="lg" type="submit">
            Đăng nhập
          </Button>
        </Form>
        }
      </div>
    );
   }
  }