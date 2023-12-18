export const fetchTasks = (tasks) => {
  return {
    type: 'FETCH_TASKS',
    payload: tasks,
  };
};

export const addTask = (task) => {
  return {
    type: 'ADD_TASK',
    payload: task,
  };
};

export const editTask = (task) => {
  return {
    type: 'EDIT_TASK',
    payload: task,
  };
};

export const deleteTask = (taskId) => {
  return {
    type: 'DELETE_TASK',
    payload: taskId,
  };
};
