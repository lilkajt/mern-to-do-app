import React, { useEffect, useState } from 'react';
import { FaTasks } from "react-icons/fa";
import Task from '../components/Task';
import { useTaskStore } from '../store/taskStore';
import Toast from '../components/Toast';

const HomePage: React.FC = () => {
  const [taskInput, setTaskInput]= useState('');
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' } | null>(null);
  const { fetchTasks, createTask, tasks } = useTaskStore();
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if ( taskInput == null || taskInput.trim().length === 0){
      return;
    }
    const {success, message} = await createTask(taskInput);
    if (success) {
      setTaskInput('');
    }
    setToast({message, type: success ? 'success' : 'error'});
  }
  return (
    <div className="w-full dark:bg-slate-800">
      <div className="container mx-auto">
        <div className="py-5 flex flex-row justify-center">
          <form onSubmit={handleCreateTask} className="flex items-center">
          <label className='relative block pr-6'>
            <span className='sr-only'></span>
            <span className="absolute inset-y-0 top-0.5 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 text-gray-400 dark:text-slate-100" viewBox="0 0 20 20"><FaTasks /></svg>
            </span>
            <input type="text" 
            className='block dark:bg-slate-800 border-b-2 border-neutral-300 placeholder:italic placeholder:text-slate-400 py-2 pl-9 pr-3 w-96 rounded-md dark:rounded-none focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 text-base focus:rounded-md dark:text-inherit text-gray-800'
            placeholder='Add new ToDo' name="taskInput" id="taskInput" value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            />
          </label>
          <input type="submit" className='block rounded-lg dark:bg-gray-700 ring-2 dark:ring-gray-700 ring-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:ring-sky-500 px-3 py-2 shadow cursor-pointer text-base dark:text-inherit text-gray-700' name='taskAdd' id='taskAdd' value="Add" />
          </form>
        </div>
        <div className="sm:w-4/6 lg:w-1/2 xl:w-1/3 w-full mx-auto">
          {tasks.map(task => (
            <Task key={task._id} task={task} setToast={setToast} />
          ))}
        </div>
        {tasks.length === 0 &&
        <p className='text-center text-xl py-5 dark:text-sky-500'>No tasks found</p>
        }
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HomePage;