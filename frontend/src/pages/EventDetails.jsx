import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMapPin, FiUsers } from 'react-icons/fi';
import api from '../api/axios';
import Countdown from '../components/Countdown';
import LoadingSpinner from '../components/LoadingSpinner';
import { fallbackEvents } from '../data/mockEvents';
import { formatCurrency, formatDate, resolveImage } from '../utils/format';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(({ data }) => setEvent(data.event))
      .catch(() => {
        setEvent(fallbackEvents.find((item) => item._id === id) || fallbackEvents[0]);
        toast.error('Showing demo event details');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!event) return null;

  return (
    <section className="container-pad py-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <img src={resolveImage(event.image)} alt={event.title} className="h-[520px] w-full rounded-lg object-cover" />
        <div className="glass rounded-lg p-6">
          <span className="rounded-full bg-teal-500/15 px-3 py-1 text-sm font-bold text-teal-600 dark:text-teal-300">{event.category}</span>
          <h1 className="mt-4 text-4xl font-black">{event.title}</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{event.description}</p>
          <div className="mt-6 space-y-3 text-slate-700 dark:text-slate-200">
            <p>{formatDate(event.date)} at {event.time}</p>
            <p className="flex items-center gap-2"><FiMapPin /> {event.location}</p>
            <p className="flex items-center gap-2"><FiUsers /> {event.seatsAvailable} seats available</p>
          </div>
          <div className="mt-6">
            <Countdown date={event.date} />
          </div>
          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-3xl font-black">{formatCurrency(event.price)}</p>
            <Link to={`/booking/${event._id}`} className="btn-primary">Book Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
