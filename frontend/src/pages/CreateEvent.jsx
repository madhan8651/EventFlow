import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { categories } from '../data/mockEvents';

const initialForm = {
  title: '',
  description: '',
  category: 'Technology',
  date: '',
  time: '',
  location: '',
  price: '',
  seatsAvailable: ''
};

const CreateEvent = () => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title || !form.description || !form.date || !form.location) return toast.error('Please complete all required fields');
    setLoading(true);
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      if (image) payload.append('image', image);
      await api.post('/events', payload);
      toast.success('Event submitted for admin approval');
      setForm(initialForm);
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-pad py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black">Create Event</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Submit a new event for admin approval.</p>
        <form onSubmit={handleSubmit} className="glass mt-8 grid gap-4 rounded-lg p-6">
          <input className="input" name="title" placeholder="Event title" value={form.title} onChange={handleChange} />
          <textarea className="input min-h-32" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <div className="grid gap-4 md:grid-cols-2">
            <select className="input" name="category" value={form.category} onChange={handleChange}>
              {categories.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}
            </select>
            <input className="input" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
            <input className="input" type="date" name="date" value={form.date} onChange={handleChange} />
            <input className="input" type="time" name="time" value={form.time} onChange={handleChange} />
            <input className="input" type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
            <input className="input" type="number" name="seatsAvailable" placeholder="Seats available" value={form.seatsAvailable} onChange={handleChange} />
          </div>
          <input className="input" type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0])} />
          <button className="btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit Event'}</button>
        </form>
      </div>
    </section>
  );
};

export default CreateEvent;
