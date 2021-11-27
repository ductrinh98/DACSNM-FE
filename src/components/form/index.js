import React from "react";
const st = {
    marginLeft : '5px',
}

export function Select({data, onChange, name}) {
      return (
          <div className="input-group-prepend">
          <select className="custom-select"  name= {name} onChange = {onChange}>
            <option value="alooo">Sắp xếp:</option>
            {data.map(data => {
                return(
                    <option key={data.value} value={data.value}>{data.label}</option>
                )
            })}
          </select>
          </div>
    );
}
export function Form({children}) {
    return(
        <div>
        <div className="input-group mb-3">
        {children}
        </div>
        </div>
    );
}

export function Input(props) {
    return(
        <input type="text" className="form-control"  placeholder="Tìm kiếm sách" {...props}/>
    );
}

export function Btn(props) {
    return (
        <button type="button" className="btn btn-primary" style={st} {...props}>Tìm Kiếm</button>
    );
}
