import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineRemoveDone } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
interface TaskProps {
  task: {
    _id: string;
    text: string;
    completed: boolean;
  };
  setToast: (toast: { message: string; type: 'success' | 'error' } | null) => void;
}

const Task: React.FC<TaskProps> = ({ task, setToast}) => {
  const [updatedTask, setUpdatedTask] = useState(task);
  const {updateTask, deleteTask} = useTaskStore();

  const handleUpdateTask = async (id: string) => {
    if (updatedTask.text !== task.text){
      const {success, message} = await updateTask(id,updatedTask);
      setToast({message, type: success ? 'success' : 'error'});
    }
  };

  const handleDeleteTask = async (id: string) => {
    const { message} = await deleteTask(id);
    setToast({message, type: 'error'});
  };

  const handleCompletedTask = async (id: string) =>{
    const {success, message} = await updateTask(id, { ...updatedTask, completed: true });
    setToast({message: success ? "Task completed" : message, type: success ? 'success' : 'error'});
  };
  
  const handleIncompletedTask = async (id: string) =>{
    const { success, message } = await updateTask(id, { ...updatedTask, completed: false });
    setToast({message: success ? "Task incomplete" : message, type: 'error'});
  };

  return (
    <>
      <div
        className="flex items-center justify-between p-2 mb-2 hover:bg-gray-500 dark:bg-gray-700 bg-gray-400 dark:hover:bg-gray-600 border-0 rounded-md"
      >
        <input
          type="text"
          onBlur={() => handleUpdateTask(task._id)}
          onChange={(e)=> setUpdatedTask({...updatedTask, text: e.target.value})}
          value={updatedTask.text}
          className={`bg-transparent outline-0 ${task.completed? 'line-through decoration-2 decoration-sky-500': ''}`}
          />
          <div>
          <button type="button" className="text-red-500 hover:text-red-800" onClick={()=> {handleDeleteTask(task._id)}}>
            <FaTrash size={20} />
          </button>
          {
            task.completed && 
            <button type="button" className="ml-3 text-gray-500 hover:text-gray-800" onClick={()=> {handleIncompletedTask(task._id)}}>
              <MdOutlineRemoveDone size={22} />
            </button>
          }
          {
            !task.completed && 
            <button type="button" className="ml-3 text-green-500 hover:text-green-800" onClick={()=> {handleCompletedTask(task._id)}}>
              <FaCheck size={22} />
            </button>
          }
          </div>
      </div>
    </>
  );
};

export default Task;