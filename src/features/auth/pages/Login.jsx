import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { setCredentials } from '../../../store/slices/authSlice';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      dispatch(setCredentials(response.data));
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}>
      <h2>CRM Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          style={{ width: '100%', marginBottom: 16 }}
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          style={{ width: '100%', marginBottom: 16 }}
        />
        <button type="submit" style={{ width: '100%' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}