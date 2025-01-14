import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { FaTrash } from 'react-icons/fa';
import Toast from './Toast';
import { IoIosUnlock } from 'react-icons/io';
interface TaskProps {
  task: {
    _id: string;
    text: string;
    completed: boolean;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [updatedTask, setUpdatedTask] = useState(task);
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' } | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const {updateTask, deleteTask} = useTaskStore();

  const handleUpdateTask = async (id: string) => {
    if (updatedTask.text !== task.text){
      const {success, message} = await updateTask(id,updatedTask);
      setToast({message, type: success ? 'success' : 'error'});
    }
  };
  // no toast - fix
  const handleDeleteTask = async (id: string) => {
    const {success, message} = await deleteTask(id);
    console.log('success', success);
    console.log('message', message);
    setToast({message, type: success ? 'success' : 'error'});
  };
  // when i leave timer is not cleared
  const handleCompletedTask = async (id: string) =>{
    const tId = setTimeout(async () => {
      const {success, message} = await updateTask(id, { ...updatedTask, completed: true });
      console.log('success',success);
      console.log('message',message);
      setToast({message, type: success ? 'success' : 'error'});
    }, 3000);
    setTimeoutId(tId);
  };

  const handleMouseLeave = () =>{
    if (timeoutId){
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  const handleUncompletedTask = async (id: string) =>{
    const { success, message } = await updateTask(id, { ...updatedTask, completed: false });
    setToast({message, type: success ? 'success' : 'error'});
  }

  return (
    <div
      className="flex items-center justify-between p-2 mb-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-0 "
    >
      <input
        type="text"
        onBlur={() => handleUpdateTask(task._id)}
        onMouseOver={() => handleCompletedTask(task._id)}
        onMouseOut={() => handleMouseLeave}
        onChange={(e)=> setUpdatedTask({...updatedTask, text: e.target.value})}
        value={updatedTask.text}
        className={`bg-transparent outline-0 ${task.completed? 'line-through': ''}`}
        />
        <div>
        <button type="button" className="text-red-500 hover:text-red-800" onClick={()=> {handleDeleteTask(task._id)}}>
          <FaTrash />
        </button>
        {
          task.completed && 
          <button type="button" className="ml-3 text-gray-500 hover:text-gray-800" onClick={()=> {handleUncompletedTask(task._id)}}>
            <IoIosUnlock />
          </button>
        }
        </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Task;