import axios from "axios";
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;
//  axios.defaults.baseURL = process.env.REACT_APP_LOCAL_URL;
const API = {
    searchBooks: function (query, orderby) {
        let data = {
            q: query,
            o: orderby
        }
        data = JSON.stringify(data)
        return axios({
            method: 'post',
            url: '/api/book/searchbook',
            headers: {
                "Content-Type": "application/json"
            },
            data: data
        })
    },
    Signin: function(username, password) {
        let data = {
            username: username,
            password: password
        }
        data = JSON.stringify(data)
        return axios({
            method: 'post',
            url: '/api/user/signin',
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
            data: data,
        });
    },
    Signup: function(username, password, passwordConf) {
        let data = {
            username: username,
            password: password,
            passwordConf: passwordConf
        }
        data = JSON.stringify(data)
        return axios({
            method: 'post',
            url: '/api/user/signup',
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
            data: data,
        });
    },
    getBook: function() {
        return axios({
            method: "get",
            url : "/api/book",
        });
    },
    deleteBook: function(id) {
        return axios({
            method: 'delete',
            url: 'api/book/'+id,
        });
  },
  Logout: function() {
    return axios({
        method: "get",
        url : "/api/user/logout",
    });
},
SaveBook: function(book, id) {
    let data = {
        title: book.title,
        authors: book.authors,
        description: book.description,
        imageLinks: book.imageLinks,
        downloadLink: book.downloadLink,
        userId: id
    }
    data = JSON.stringify(data)
    return axios({
        method: 'post',
        url: '/api/book/',
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        },
        data: data,
    });
},
};
export default API;