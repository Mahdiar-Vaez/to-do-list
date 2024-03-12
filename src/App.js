import React from "react";
import "./App.css";
export default function App() {
  return (
    <div>
      <h3 className="title">To Do List </h3>
      <div className="wrapper">
        <div className="inputs">
          <div>
            <label>title</label>
            <input type="text" placeholder="Add Your Title" />
          </div>
          <div>
            <label>Description</label>
            <input type="text" placeholder="Add Your Des" />
          </div>
          <div className="btn">
            <button>Add </button>
          </div>
        </div>

        <div className="btn-area">
          <button>To Do</button>
          <button>Completed</button>
        </div>
      
      </div>
      <div className="tasks">
        
      </div>
    </div>
  );
}
