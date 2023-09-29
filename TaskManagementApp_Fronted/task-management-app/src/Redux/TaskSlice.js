import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.taskId === updatedTask.taskId);

      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.taskId !== taskId);
    },
    toggleTask: (state, action) => {
      const taskId = action.payload;
      const taskToToggle = state.tasks.find((task) => task.taskId === taskId);

      if (taskToToggle) {
        taskToToggle.completed = !taskToToggle.completed;
      }
    },
    setData: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTask, setData } = tasksSlice.actions;
export default tasksSlice.reducer;
