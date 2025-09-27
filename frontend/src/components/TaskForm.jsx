import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title) return alert("Title required");
    onAdd(task);
    setTask({ title: "", description: "", priority: "medium", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        className="border p-2 rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
      />
      <div className="flex gap-2 mb-2">
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="border p-2 rounded flex-1 dark:bg-gray-700 dark:text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="border p-2 rounded flex-1 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
}
