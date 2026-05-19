import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const LoginRegister = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password || (mode === 'register' && !form.name)) return toast.error('Please fill all required fields');
    try {
      const user = mode === 'login' ? await login({ email: form.email, password: form.password }) : await register(form);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <section className="container-pad grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <form onSubmit={handleSubmit} className="glass w-full max-w-md rounded-lg p-6">
        <h1 className="text-3xl font-black">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
        <div className="mt-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1 dark:bg-white/10">
          {['login', 'register'].map((item) => (
            <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-md py-2 font-bold capitalize ${mode === item ? 'bg-teal-500 text-slate-950' : ''}`}>{item}</button>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {mode === 'register' && <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
          <input className="input" type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {mode === 'register' && (
            <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>
          )}
        </div>
        <button disabled={loading} className="btn-primary mt-6 w-full">{loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
    </section>
  );
};

export default LoginRegister;
