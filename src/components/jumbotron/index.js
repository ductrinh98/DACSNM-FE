import React from "react";
import './style.css'

function Jumbotron({ children }) {
  return (
    <div className="jumbotron jumbotron-fluid">
      {children}
  </div>
  );
}

export default Jumbotron;