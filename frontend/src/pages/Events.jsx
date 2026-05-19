import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { categories, fallbackEvents } from '../data/mockEvents';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { data } = await api.get('/events', { params: { search, category: category === 'All' ? '' : category } });
        setEvents(data.events);
      } catch {
        setEvents(fallbackEvents);
        toast.error('Using demo events until backend is connected');
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(loadEvents, 350);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <section className="container-pad py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Explore Events</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Search by name, city, topic, or choose a category.</p>
      </div>
      <div className="glass mb-8 grid gap-3 rounded-lg p-4 md:grid-cols-[1fr_auto]">
        <input className="input" placeholder="Search events..." value={search} onChange={(event) => setSearch(event.target.value)} />
        <select className="input md:w-56" value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      {loading ? <LoadingSpinner /> : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => <EventCard key={event._id} event={event} />)}
        </div>
      )}
    </section>
  );
};

export default Events;
