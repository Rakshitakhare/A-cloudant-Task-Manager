import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) return <p className="text-gray-500 dark:text-gray-300">No tasks found</p>;
  return tasks.map((task) => (
    <TaskItem key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
  ));
}
