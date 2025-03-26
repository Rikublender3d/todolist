import React,{useState} from "react";
function App() {
  const [tasks,setTasks] = useState([]);
  const [newTask,setnewTask] = useState("");
  const [filter,setFilter] = useState("all");
  const addTask = () => {
    if(newTask.trim() === "") return;
    const newTaskObject = {
      id:Date.now(),
      text:newTask,
      isCompleted:false
    };
    setTasks([...tasks,newTaskObject]);
    setnewTask(""); 
  };
  const toggleTaskCompletion = (id) =>{
    setTasks(
      tasks.map((task) =>
      task.id === id?{...task,isCompleted: !task.isCompleted}:task)
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));  
  };

const filteredTasks = tasks.filter((task) => {
  if (filter === "checked") return task.isCompleted;
  if (filter === "unchecked") return !task.isCompleted;
  return true;
});

  return (
    <div className="App container">
 <select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value)} 
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
      </select>
      <h1 className="text-4xl">To do list</h1>
      <div className="flex justify-between mg-1">
        <input 
        type="text"
        value={newTask}
        onChange={(e) =>setnewTask(e.target.value)}
        placeholder="タスクを入力"
        className="p-[10px] text-[1rem] border-[1px] w-[75%] mb-[10px]"
        />
        <button onClick={addTask} className="text-white bg-green-500 mb-[10px] py-[10px] px-[20px] rounded-[4px] transition hover:opacity-40">追加</button>
      </div>
      <ul>
      {filteredTasks.map((task) => (
          <li key={task.id} className="shadow	rounde-[4px] flex justify-between items-center bg-white p-[10px] mb-[10px] ">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleTaskCompletion(task.id)}
              className="mr-[10px]"
            />
            <span
              className={`mr-[10px] flex-grow ${task.isCompleted ? "completed" : ""}`}
            >
              {task.text}
            </span>
            <button
              className="bg-red-700 px-[10px] py-[5px] rounded-[4px] text-white transition hover:opacity-40"
              onClick={() => deleteTask(task.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
