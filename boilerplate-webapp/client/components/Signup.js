import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signup } from '../store/reducers/authReducer';


const Signup = (props) => {
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const initialForm = {
    nameFirst: '',
    nameLast: '',
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
    const res = await dispatch(signup(form, history));

    setForm(initialForm);
    if (res.status < 400) window.alert(res.data);
    history.push('/login');
  }

  return (
    <div className="form container">
      <div className="to-home">
        <Link to="/">HOME</Link>
      </div>
      <form className="form signup" onSubmit={handleSubmit} name="signup">
        <div className="input name first">
          <label htmlFor="nameFirst">First Name: </label>
          <input type="text" name="nameFirst" id="nameFirst" value={form.nameFirst} onChange={(e) => handleChange(e)} required />
        </div>
        <div className="input name last">
          <label htmlFor="nameLast">Last Name: </label>
          <input type="text" name="nameLast" id="nameLast" value={form.nameLast} onChange={(e) => handleChange(e)} required />
        </div>
        <div className="input username">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" value={form.username} onChange={(e) => handleChange(e)} required />
        </div>
        <div className="input username">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" value={form.password} onChange={(e) => handleChange(e)} required />
        </div>
        <button type="submit" className="signup button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
