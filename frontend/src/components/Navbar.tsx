import React from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { FiSun } from "react-icons/fi";

type NavbarProps = {
  onAddTask: () => void;
  toggleTheme: () => void;
  theme: string;
}

// maybe add later animation 'to' drops and 'do' moves to left and next to it drops 'NOW!' and text glows brighter
const Navbar: React.FC<NavbarProps> = ({ onAddTask, toggleTheme, theme }) => {
  return (
    <div className="main h-24 w-full flex items-center justify-between dark:bg-gray-700 bg-gray-400 p-1.5 text-slate-100 font-bold select-none">
      <div className="title text-4xl flex-grow text-center">
        <h1 className='inline-block p-2 hover:text-sky-500 cursor-pointer'>
          To Do
        </h1>
      </div>
      <div className="flex items-center space-x-4">
      <div className="addTask border-2 rounded-lg border-green-500 bg-green-500 hover:bg-green-700 px-2 py-1">
        <button type="button" onClick={onAddTask}>Task +</button>
      </div>
      <div className="toggle">
        <button type="button" className='w-12 h-12 flex items-center justify-center' onClick={toggleTheme}>
          {theme === "light" ? <FaRegMoon size={24} /> : <FiSun size={24} />}
        </button>
      </div>
      </div>
    </div>
  );
}

export default Navbar;