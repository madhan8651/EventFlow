import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { formatCurrency, formatDate, resolveImage } from '../utils/format';

const EventCard = ({ event }) => (
  <article className="glass overflow-hidden rounded-lg transition hover:-translate-y-1 hover:shadow-glow">
    <img src={resolveImage(event.image)} alt={event.title} className="h-52 w-full object-cover" />
    <div className="p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-teal-500/15 px-3 py-1 text-xs font-bold text-teal-700 dark:text-teal-300">{event.category}</span>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-slate-950">{event.status || 'approved'}</span>
      </div>
      <h3 className="line-clamp-1 text-xl font-bold">{event.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{event.description}</p>
      <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        <p className="flex items-center gap-2"><FiCalendar /> {formatDate(event.date)} at {event.time}</p>
        <p className="flex items-center gap-2"><FiMapPin /> {event.location}</p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-lg font-black">{formatCurrency(event.price)}</span>
        <Link to={`/events/${event._id}`} className="btn-primary px-4 py-2">View</Link>
      </div>
    </div>
  </article>
);

export default EventCard;
