import React, { Component } from "react";
import API from "../api";
import Jumbotron from "../components/jumbotron";
import { Form, Select, Input, Btn } from "../components/form";
import { Link } from "react-router-dom";

const menu = [
    { value: 'def', label: 'Mặc định' },
    { value: 'title', label: 'Tên Sách' },
    { value: 'year', label: 'Năm' },
    { value: 'publisher', label: 'Nhà x/bản' }
  ];

export default class Home extends Component {
    state = {
        clickSearch: false,
        loading: false,
        bookInput: "",
        bookSearched: "",
        books: [],
        orderBy: "def",
        isadd: "",
        title: ""
    }

    saveBook = book =>{
      let id = localStorage.getItem("id");
      API.SaveBook(book, id)
      .then(res => {
        this.setState({isadd: `${book.title} được thêm vào tủ sách!`})
        this.setState({title: book.title})
      })
      .catch(err => {
        console.log(err)
      })
    }

    handleChange = event => {
      // Destructure the name and value properties off of event.target
      // Update the appropriate state
      const { name, value } = event.target;
      this.setState({
        
        [name]: value
      });
    };

    handleFormSubmit = async event => {
      // When the form is submitted, prevent its default behavior, get recipes update the recipes state
      event.preventDefault();
      if(this.state.bookInput ){
        this.setState({loading: true, clickSearch: true});
        this.setState({bookSearched: this.state.bookInput});
        API.searchBooks(this.state.bookInput, this.state.orderBy)
        .then(res => {
          console.log(res)
          this.setState({books: res.data,  loading: false});
        })
      }
    };


    render() {
      return (
        <div className="container">
          <Jumbotron>
                {this.state.books.length ?
                <div>
                <h1 className="center">Kết quả tìm kiếm cho: </h1>
                <h2>"{this.state.bookSearched}"</h2>
                </div>
                :
                <div>
                <h1 className="center">Chào mừng bạn đến với Library</h1>
                <hr/>
                <p className="lead">Những cuốn sách hay từ nguồn:<a href="http://gen.lib.rus.ec/" className="lib-page">LibGen</a></p>
                </div>
              }
          </Jumbotron>
          <Form>
                <Select 
                    data= {menu}
                    onChange = {this.handleChange}
                    name = "orderBy"
                > </Select>
                <Input
                    onChange = {this.handleChange}
                    name = "bookInput"
                ></Input>
                <Btn
                    onClick = {this.handleFormSubmit}
                ></Btn>

          </Form>
          
        <div>
            {this.state.clickSearch ?
             
             this.state.loading ? 
             <div className="text-center">
             <div className="spinner-border" role="status">
               <span className="sr-only">Loading...</span>
             </div>
           </div>
            :this.state.books.length ? 
            <ul className="list-group">
                {this.state.books.map(book => {
                    const {title, authors, description, imageLinks, downloadLink} = book;
                    return(
                        <li className="list-group-item" key={title}>
                          {this.state.isadd && book.title === this.state.title? 
                          <div className="alert alert-primary" role="alert">
                              {this.state.isadd}
                          </div>: <div/>}
                          {localStorage.getItem("id")?
                            <button className="btn btn-success m-2 text-white float-right" 
                            onClick={() => this.saveBook(book)}>
                              Lưu sách
                            </button>
                            :
                            <Link to='./signin'>
                              <button className="btn btn-success m-2 text-white float-right" 
                               >
                              Lưu sách
                            </button>
                            </Link>}
                            <a className="btn btn-primary m-2 text-white float-right"  href={downloadLink} target="_blank"  rel="noreferrer">Tải về</a>
                            <h2 >{title}</h2>
                            {authors ?
                            <h4>Tác giả: {authors}</h4>
                            : <h4>Không có tác giả</h4>}
                            <div className="align-items-center row">
                                <div className="col-lg-2 col-md-3 col-sm-6">
                                    <img className="m-3" style={{ height: 192, width:128 }} src={imageLinks}  alt="book-cover"  />
                                </div>
                                <div className="col-lg-10 col-md-9 col-sm-6">
                                    <p className="my-3">{description ? description : "Không có mô tả"}</p>
                                </div>
                            </div>
                        </li>)
                    }
                    
                )}
            </ul>
            : <h1 className="text-center">Không tìm thấy sách!</h1>
            : <div></div>
            }
        </div>

        </div>
      )
    }
}