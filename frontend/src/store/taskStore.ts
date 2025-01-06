import { create } from 'zustand';
import axios from 'axios';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TaskStore {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    createTask: (title: string) => Promise<{ success: boolean; message: string; } >;
    updateTask: (id: string, updatedTask: Partial<Task>) => Promise<{ success: boolean; message: string; }>;
    deleteTask: (id: string) => Promise<{ success: boolean; message: string; }>;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    fetchTasks: async () => {
        try {
            const response = await axios.get('/api/todos');
            set({ tasks: response.data });
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    },
    createTask: async (title: string) => {
        try {
            if (title == ''){
                return {success: false, message: "All fields are required"};
            }
            const response = await axios.post('/api/todos', { title });
            set((state) => ({ tasks: [...state.tasks, response.data] }));
            return {success: true, message: "Todo created"};
        } catch (error) {
            console.error('Failed to create task', error);
            return { success: false, message: 'Failed to create task' };
        }
    },
    updateTask: async (id: string, updatedTask: Partial<Task>) => {
        try {
            const response = await axios.put(`/api/todos/${id}`, updatedTask);
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? response.data : task
                ),
            }));
            return { success: true, message: 'Task updated successfully' };
        } catch (error) {
            console.error('Failed to update task', error);
            return { success: false, message: 'Failed to update task' };
        }
    },
    deleteTask: async (id: string) => {
        try {
            await axios.delete(`/api/todos/${id}`);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            }));
            return { success: true, message: 'Task deleted successfully' };
        } catch (error) {
            console.error('Failed to delete task', error);
            return { success: false, message: 'Failed to delete task' };
        }
    },
}));