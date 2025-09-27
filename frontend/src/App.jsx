import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchFilter from "./components/SearchFilter";
import ThemeToggle from "./components/ThemeToggle";

const API_BASE = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ status: "", priority: "" });
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch(API_BASE);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    fetchTasks();
  };

  const updateTask = async (id, updates) => {
    await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  // Filter and search tasks
  const filteredTasks = tasks.filter((t) => {
    return (
      (!filter.status || t.status === filter.status) &&
      (!filter.priority || t.priority === filter.priority) &&
      (t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className={darkMode ? "dark bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"}>
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            ☁️ Cloudant Task Manager
          </h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <TaskForm onAdd={addTask} />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
      </div>
    </div>
  );
}

export default App;
