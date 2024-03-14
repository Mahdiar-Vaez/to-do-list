import React, { useEffect, useState } from "react";
import "./App.css";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

export default function App() {
  const [completeTab, setCompleteTab] = useState(false);
  const [title, setTitle] = useState();
  const [des, setDes] = useState();
  const [list, setList] = useState([]);
  const [Checked,setChecked]=useState([])
 
  const handleDelete=(index)=>{
    //  for list
    let reducesItem=[...list]
    reducesItem.splice(index,1)
    localStorage.setItem("toDoList",JSON.stringify(reducesItem))
    setList(reducesItem)
    //  for checked
    let checkedItems=[...Checked]
    checkedItems.splice(index,1)
    setChecked(checkedItems)
    localStorage.setItem('Checked', JSON.stringify(checkedItems))
  }
  function handleChecked (index){
    if(!Checked.includes(index)){
    let checkedItem=[...Checked]
    let ItemsCheck={
      title:list[index].title,
      description:list[index].description
    }
    checkedItem.push(ItemsCheck)
    localStorage.setItem('Checked',JSON.stringify(checkedItem))
      setChecked(checkedItem)
      list.splice(index,1)

    }
  }
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
    let CheckedItems=JSON.parse(localStorage.getItem('Checked'))
    setList(toDoStorage)
    setChecked(CheckedItems)
  
  },[])
  let CheckedItems=Checked.map((e,index)=>{
    return(
      <div key={index} className="checked">
      <div className="checked-content">
        <h3><del>{e.title}</del></h3>
        <p><del>{e.description}</del></p>
      </div>
      <div className="task-icons">
        <IoTrashBinOutline
        onClick={()=>handleDelete(index)}
          className="bin-icon"
          style={{
            cursor: "pointer",
            fontSize: "40px",
          }}
        />
      </div>
    </div>
    )
  })
  let Items = list.map((e, index) => {
    return (
      <div key={index} className="tasks">
      <div className="task-content">
        <h3>{e.title}</h3>
        <p>{e.description}</p>
      </div>
      <div className="task-icons">
        <FaCheck onClick={()=>handleChecked(index)}
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
        onClick={()=>handleDelete(index)}
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
        {!completeTab?<>{Items}</>:
        <>
        {CheckedItems}
        </>
        }
        
      </div>
    </div>
  );
}
