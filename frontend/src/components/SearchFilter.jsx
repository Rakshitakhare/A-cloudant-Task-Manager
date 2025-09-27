import React from "react";

export default function SearchFilter({ search, setSearch, filter, setFilter }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded flex-1 dark:bg-gray-700 dark:text-white"
      />
      <select value={filter.status} onChange={(e)=>setFilter({...filter,status:e.target.value})} className="border p-2 rounded dark:bg-gray-700 dark:text-white">
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <select value={filter.priority} onChange={(e)=>setFilter({...filter,priority:e.target.value})} className="border p-2 rounded dark:bg-gray-700 dark:text-white">
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
