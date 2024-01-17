import axios from "axios";
import { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const addTask = async () => {
    alert(newTaskText);
    axios
      .post("http://localhost:4000/api/tasks", { text: newTaskText })
    
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTaskText("");
      })
    
      .catch((error) => {
        console.error("Error adding a task:", error);
      });
    console.log(tasks);
  };

  return (
    <div>
      <h1>A To-Do List App.</h1>
      <div>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
