import React from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { FiSun } from "react-icons/fi";

type NavbarProps = {
  onAddTask: () => void;
  toggleTheme: () => void;
  theme: string;
}

// To Do - bigger(https://dribbble.com/shots/15574940-Fitness-app - right page), hover - text on blue
// maybe add later animation 'to' drops and 'do' moves to left and next to it drops 'NOW!' and text glows brighter
const Navbar: React.FC<NavbarProps> = ({ onAddTask, toggleTheme, theme }) => {
  return (
    <div className="h-24 w-full flex justify-center items-center dark:bg-gray-800 bg-gray-400 p-1.5 text-slate-100 font-bold select-none">
      <div className="title text-4xl">
        <h1 className='hover:text-green-300 px-1 cursor-pointer'>
          To Do
        </h1>
      </div>
      <div className="space w-24"></div>
      <div className="addTask border-2 rounded-lg border-green-500 bg-green-500 hover:bg-green-700 px-2 py-1">
        <button type="button" onClick={onAddTask}>Add Task +</button>
      </div>
      <div className="space w-24"></div>
      <div className="darkMode">
        <button type="button" className='' onClick={toggleTheme}>
          {theme === "light" ? <FaRegMoon /> : <FiSun />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;