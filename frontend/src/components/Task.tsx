import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import { FaTrash } from 'react-icons/fa';

interface TaskProps {
  task: {
    _id: string;
    text: string;
    completed: boolean;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [updatedTask, setUpdatedTask] = useState(task);
  const {updateTask, deleteTask} = useTaskStore();

  const handleUpdateTask = async (id: string) => {
    if (updatedTask.text !== task.text){
      const {success, message} = await updateTask(id,updatedTask);
      console.log("success ", success);
      console.log("message ", message);  
    } 
  }

  const handleDeleteTask = async (id: string) => {
    const {success, message} = await deleteTask(id);
    console.log("success ", success);
    console.log("message ", message);
  }
  return (
    <div
      className="flex items-center justify-between p-2 border border-gray-300 mb-2 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-0"
    >
      <input
        type="text"
        onBlur={() => handleUpdateTask(task._id)}
        onChange={(e)=> setUpdatedTask({...updatedTask, text: e.target.value})}
        value={updatedTask.text}
        className='bg-transparent outline-0'
      />
      <button type="button" className="text-red-500 hover:text-red-800" onClick={()=> {handleDeleteTask(task._id)}}>
        <FaTrash />
      </button>
    </div>
  );
};

export default Task;