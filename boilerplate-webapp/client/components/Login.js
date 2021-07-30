import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { authenticate } from '../store/reducers/authReducer';


const Login = (props) => {
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const initialForm = {
    username: '',
    password: ''
  };
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const updatedForm = { ...form };
    updatedForm[e.target.name] = e.target.value;

    setForm(updatedForm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(authenticate(form));

    if (res && res.auth.error) {
      window.alert(res.auth.error.response.data);
    }
    else {
      window.alert('login success');
    }

    setForm(initialForm);
  }

  return (
    <div className="form container">
      <div className="to-home">
        <Link to="/">HOME</Link>
      </div>
      <form className="form login" onSubmit={handleSubmit} name="login">
        <div className="input username">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" value={form.username} onChange={(e) => handleChange(e)} required />
        </div>
        <div className="input username">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" value={form.password} onChange={(e) => handleChange(e)} required />
        </div>
        <button type="submit" className="login button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
