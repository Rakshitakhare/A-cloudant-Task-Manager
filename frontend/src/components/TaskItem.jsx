import React, { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTask, setEditTask] = useState(task);

  const handleChange = (e) => setEditTask({ ...editTask, [e.target.name]: e.target.value });

  const statusColor = {
    todo: "bg-gray-200 dark:bg-gray-700",
    doing: "bg-blue-200 dark:bg-blue-700",
    done: "bg-green-200 dark:bg-green-700",
  };

  const overdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";

  return (
    <div className={`p-4 rounded mb-2 ${statusColor[task.status]} ${overdue ? "border-red-500 border-2" : ""}`}>
      {editing ? (
        <>
          <input name="title" value={editTask.title} onChange={handleChange} className="border p-1 rounded w-full mb-1 dark:bg-gray-600 dark:text-white"/>
          <textarea name="description" value={editTask.description} onChange={handleChange} className="border p-1 rounded w-full mb-1 dark:bg-gray-600 dark:text-white"/>
          <div className="flex gap-2">
            <select name="priority" value={editTask.priority} onChange={handleChange} className="border p-1 rounded dark:bg-gray-600 dark:text-white">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select name="status" value={editTask.status} onChange={handleChange} className="border p-1 rounded dark:bg-gray-600 dark:text-white">
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
          <button onClick={()=>{onUpdate(task._id, editTask); setEditing(false)}} className="bg-green-500 text-white px-2 py-1 rounded mt-1">Save</button>
        </>
      ) : (
        <>
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <div className="flex justify-between mt-2">
            <span>Status: {task.status}</span>
            <span>Priority: {task.priority}</span>
            <span>Due: {task.dueDate || "-"}</span>
          </div>
          <div className="mt-2 flex gap-2">
            <button onClick={()=>setEditing(true)} className="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
            <button onClick={()=>onDelete(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
