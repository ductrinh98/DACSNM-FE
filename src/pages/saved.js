import React, { Component } from 'react'
import API from '../api';
import Jumbotron from "../components/jumbotron";

export default class Saved extends Component {
    state={
        books: [],
        isdelete: "",
        title: ""
    }

    componentWillMount(){
        this.getSavedBooks();
    }

    getSavedBooks = () => {
        API.getBook()
        .then(res => {
            this.setState({ books: Object.values(res.data) })
        })
        .catch(err => console.log(err));
    }

    deleteBook = (book) => {
        API.deleteBook(book._id)
        .then(() => {
            this.setState({isdelete: `${book.title} đã bị xoá khỏi tủ sách!`})
            this.setState({title: book.title})
            this.getSavedBooks();
        })
        .catch(err => console.log(err));
    }

    render() {
      return (
        <div className="container">
            <Jumbotron>
                <h1>Tủ sách của bạn</h1>
                <hr/>
                <p className="lead">Hiển thị những cuốn sách bạn đã lưu lại!</p>
            </Jumbotron>

                <div>
                {localStorage.getItem("id")?this.state.books.length ? 
                   <ul className="list-group">
                       {this.state.books.map(book => {
                           const {title, authors, description, imageLinks, downloadLink} = book;
                           return(
                               <li className="list-group-item" key={title}>
                                   {this.state.isdelete&& book.title === this.state.title? 
                                        <div className="alert alert-primary" role="alert">
                                            {this.state.isdelete}
                                        </div>: <div/>}
                                   <button className="btn btn-danger m-2 text-white float-right"
                                    onClick={() => this.deleteBook(book)}
                                    >
                                    Xoá
                                    </button>
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
                   : 
                   <div>
                   <h1 className="text-center">Không có cuốn sách nào!</h1>
                   <p className="text-center">Hãy tìm kiếm cuốn sách yêu thích và thêm nó vào đây!</p>
                   </div>
                   :
                   <div>
                   <p className="text-center">Hãy đăng nhập để có thể sử dụng chức năng này!</p>
                   </div>
                   }
               </div>
       
            </div>
      )
    }
}