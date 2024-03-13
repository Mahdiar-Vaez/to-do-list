import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

export default function App() {
  const [completeTab, setCompleteTab] = useState(true);
  const [title, setTitle] = useState();
  const [des, setDes] = useState();
  const [list, setList] = useState([]);
  const handleAddTodo = () => {
    if (title && des) {
      let newToDoItem = {
        title: title,
        description: des,
      };
      let updateToDo = [...list];
      updateToDo.push(newToDoItem);
      setList(updateToDo);
      localStorage.setItem('toDoList', JSON.stringify(updateToDo));
      setTitle("");
      setDes("");
    }
  };
  useEffect(()=>{
    let toDoStorage=JSON.parse(localStorage.getItem('toDoList'))
    if(toDoStorage)
    setList(toDoStorage)
  },[])
  let Items = list.map((e, index) => {
    return (
      <div key={index} className="tasks">
      <div className="task-content">
        <h3>{e.title}</h3>
        <p>{e.description}</p>
      </div>
      <div className="task-icons">
        <FaCheck
          className="check-icon"
          style={{
            cursor: "pointer",
            fontSize: "40px",
            "&:hover": {
              color: "red !important",
            },
          }}
        />
        <IoTrashBinOutline
          className="bin-icon"
          style={{
            cursor: "pointer",
            fontSize: "40px",
          }}
        />
      </div>
      
    </div>
    );
  });
  return (
    <div>
      <h3 className="title">To Do List </h3>
      <div className="wrapper">
        <div className="inputs">
          <div>
            <label>title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Add Your Title"
            />
          </div>
          <div>
            <label>Description</label>
            <input
              value={des}
              onChange={(e) => setDes(e.target.value)}
              type="text"
              placeholder="Add Your Des"
            />
          </div>
          <div className="btn">
            <button onClick={handleAddTodo}>Add </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            onClick={() => setCompleteTab(false)}
            className={!completeTab ? "active-tab" : ""}
          >
            To Do
          </button>
          <button
            onClick={() => setCompleteTab(true)}
            className={completeTab ? "active-tab" : ""}
          >
            Completed
          </button>
        </div>
        {Items}
      
      </div>
    </div>
  );
}
