import React from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { FiSun } from "react-icons/fi";

type NavbarProps = {
  toggleTheme: () => void;
  theme: string;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, theme }) => {
  return (
    <div className="main h-24 w-full flex items-center justify-between dark:bg-gray-700 bg-gray-400 p-1.5 text-slate-100 font-bold select-none">
      <div className="title text-4xl flex-grow text-center">
        <h1 className='inline-block p-2 hover:text-sky-500 cursor-pointer'>
          To Do
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button type="button" className='w-14 h-14 flex items-center justify-center' onClick={toggleTheme}>
          {theme === "light" ? <FaRegMoon size={24} /> : <FiSun size={24} />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;