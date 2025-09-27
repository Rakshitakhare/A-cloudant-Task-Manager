import React from "react";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={()=>setDarkMode(!darkMode)}
      className="bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
