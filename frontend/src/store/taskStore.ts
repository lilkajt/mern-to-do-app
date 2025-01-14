import { create } from 'zustand';
import axios from 'axios';

interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

interface TaskStore {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    createTask: (text: string) => Promise<{ success: boolean; message: string; } >;
    updateTask: (_id: string, updatedTask: Partial<Task>) => Promise<{ success: boolean; message: string; }>;
    deleteTask: (_id: string) => Promise<{ success: boolean; message: string; }>;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    fetchTasks: async () => {
        const response = await axios.get('/api/todos');
        set({ tasks: response.data.data });
    },
    createTask: async (text: string) => {
        if (text == '') {
            return {success: false, message: "All fields are required"};
        }
        const response = await axios.post('/api/todos', { text });
        set((state) => ({ tasks: [...state.tasks, response.data.data] }));
        return {success: true, message: "Todo created"};
    },
    updateTask: async (_id: string, updatedTask: Partial<Task>) => {
        const response = await axios.put(`/api/todos/${_id}`, updatedTask);
        if (!response.data.success){
            return {success: false, message: "Task couldnt be updated"};
        }
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task._id === _id){
                    return response.data.data;
                }
                return task;
            }),
        }));
        return { success: true, message: 'Task updated successfully' };
    },
    deleteTask: async (_id: string) => {
        const response = await axios.delete(`/api/todos/${_id}`);
        if (!response.data.success){
            return { success: false, message: "Task couldnt be deleted"};
        }
        set((state) => ({tasks: state.tasks.filter((task) => task._id !== _id)}));
        return { success: true, message: 'Task deleted successfully' };
    },
}));