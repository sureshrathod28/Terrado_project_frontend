import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/redux/store/taskStore';
import Login from './components/loginPage/login';
import Signup from './components/signUpPage/signUp';
import ForgotPassword from './components/forgotPassword/forgotPassword';
import ResetPassword from './components/resetPassword/resetPassword';
import Protectedroute from './components/protectedRoute/protectedRoute';
import Home from './components/homePage/homePage';
import CreateTask from './components/createTaskPage/createTask';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/home"  element={<Protectedroute Component={Home}/>}/>
          <Route path='/create-task' element={<Protectedroute Component={CreateTask}/>}/>
       </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
