import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, editTask, deleteTask } from '../redux/actions/taskActions';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import NavScrollExample from '../navbar/navbar';
const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/usertask')
      .then(response => {
        dispatch(fetchTasks(response.data));
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, [dispatch]);

  const handleEditTask = (taskId, title, description) => {
    setEditingTask(taskId);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleSaveTask = (taskId) => {
    const token = sessionStorage.getItem('token'); 
  
    axios.put(`http://localhost:5000/usertask/${taskId}`, {
      title: editedTitle,
      description: editedDescription,
    }, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        dispatch(editTask(response.data));
        setEditingTask(null);
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          console.error('Unauthorized - Insufficient Permissions');
        } else {
          console.error('Error saving task:', error);
        }
      });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const token = sessionStorage.getItem('token');
  
    axios.delete(`http://localhost:5000/usertask/${taskId}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(() => {
        dispatch(deleteTask(taskId));
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          console.error('Unauthorized - Insufficient Permissions');
        } else {
          console.error('Error deleting task:', error);
        }
      });
  };

  return (
    <div>
      <div>
        <NavScrollExample/>
      </div>
      
    <h1 style={{textAlign:'center'}}>Task List</h1>
      <Table striped bordered hover variant="dark" style={{textAlign:'center'}}>
        <thead>
          <tr>
            <th>Sr Number</th>
            <th>Task Name</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>
                {editingTask === task._id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingTask === task._id ? (
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editingTask === task._id ? (
                  <>
                    <button onClick={() => handleSaveTask(task._id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    
                    <img src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png" alt="edit" 
                    onClick={() => handleEditTask(task._id, task.title, task.description)} style={{width:'28px',color:'white'}}/>
                    <img src='https://cdn-icons-png.flaticon.com/128/6861/6861362.png'
                    onClick={() => handleDeleteTask(task._id)} alt='delete' style={{width:'28px',color:'white',marginLeft:'20px'}}/>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
   
  );
};

export default Home;
