import React from "react"
import { Link } from "react-router-dom"
import API from "../../api"

const onClick = () =>{
  API.Logout()
  .then(res=>{
      localStorage.clear()
      window.location.href="/";
  })
  .catch(err=>{
  })
}

export function Nav() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <Link className="navbar-brand" to="/">Library</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Tìm kiếm </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/saved">Tủ Sách</Link>
            </li>
          </ul>
          {localStorage.getItem("id")?
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
            <span className="nav-link">Chào {localStorage.getItem("name")}</span>
          </li>
          <li className="nav-item active">
            <span to="/signin" onClick={onClick} style={{cursor: "pointer"}} className="nav-link">Đăng xuất</span>
          </li>
        </ul>
            :
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/signin" className="nav-link">Đăng nhập</Link>
            </li>
            <li className="nav-item active">
              <Link to="/signup" className="nav-link">Đăng kí</Link>
            </li>
          </ul>}
        </div>
      </nav>
    );
}