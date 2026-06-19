 
import React, { useState,useEffect } from 'react'
import "./Todo.css";
 

const Todo = () => {
    const [task,setTask]=useState("")  ; 
    const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
    }); 
     useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
   }, [tasks]);
   
    const [filter, setFilter] = useState("all");
    const[editIndex,setEditIndex]=useState(null);   
    const[editText,setEditText]=useState("");
 







     const addTask=()=>{
      if(task==="") return;
      setTasks([...tasks,{text:task,completed:false}]);
      setTask("");
     };

     const removeTask=(index)=>{

      const newTasks=tasks.filter((_,i)=>
     i!==index );
      setTasks(newTasks);


     }; 
   const editTask=(index)=>{
          setEditIndex(index);
          setEditText(tasks[index].text);

    
   };

const saveEdit=()=>{

    const updatedTasks=[...tasks];
    updatedTasks[editIndex].text=editText;

  setTasks(updatedTasks);
  setEditIndex(null);
  setEditText("")



  }
     const toggleCompleted =(index)=>{
      const newTasks=[...tasks];
      newTasks[index].completed=!newTasks[index].completed;
      setTasks(newTasks);

     }
    
  const filteredTasks = tasks.filter((t) => {
  if (filter === "completed") return t.completed;




  if (filter === "pending") return !t.completed;
  return true;
});

const completedTask=tasks.filter((t)=>t.completed);
const pendingTask=tasks.filter((t)=>!t.completed);










    
   


   return (
    <div className="container">
      <div className="todo-cart">
      <h1>Todo List App</h1>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add</button>
        <div className="filters">
      <button onClick={()=>setFilter("all")}>All</button>
            <button onClick={()=>setFilter("completed")}>Completed</button>
                <button onClick={()=>setFilter("pending")}>Pending</button> 
                </div>
                <div className="task-summary">
              <h3>Total Tasks:{tasks.length}</h3>
                <h3>completed: {completedTask.length}</h3>
                <h3>pending:{pendingTask.length}</h3>
                </div>


      <ul>
        {filteredTasks.map((t, index) => (
          <li key={index}>
           {editIndex === index ? (
  <input
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
  />
) : (
  <span
    style={{
      textDecoration: t.completed ? "line-through" : "none"
    }}
    onClick={() => toggleCompleted(index)}
  >
    {t.text}
  </span>
)}  

    {editIndex === index ? (
    <button onClick={saveEdit}>Save</button>
  ) : (
    <button onClick={() => editTask(index)}>
      Edit
    </button>
  )}
            <button onClick={() => removeTask(index)}> Delete
            </button>
             


              
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default Todo;

