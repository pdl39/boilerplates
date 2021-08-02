import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/reducers/authReducer';

const Dashboard = (props) => {
  const { name } = props;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div>
      <h3>Welcome, {name}</h3>
      <button type="button" class="logout" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard;
