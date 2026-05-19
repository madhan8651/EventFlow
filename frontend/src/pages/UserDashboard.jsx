import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/format';

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings/my').then(({ data }) => setBookings(data.bookings)).catch(() => setBookings([]));
  }, []);

  return (
    <section className="container-pad py-12">
      <h1 className="text-4xl font-black">User Dashboard</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Hello {user?.name}, track your bookings and confirmations.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-lg p-5"><p className="text-3xl font-black">{bookings.length}</p><p className="text-slate-500">Bookings</p></div>
        <div className="glass rounded-lg p-5"><p className="text-3xl font-black">{bookings.filter((b) => b.paymentStatus === 'paid').length}</p><p className="text-slate-500">Paid</p></div>
        <div className="glass rounded-lg p-5"><p className="text-3xl font-black capitalize">{user?.role}</p><p className="text-slate-500">Role</p></div>
      </div>
      <div className="glass mt-8 overflow-hidden rounded-lg">
        <div className="border-b border-slate-200 p-5 font-bold dark:border-white/10">Recent Bookings</div>
        {bookings.length === 0 ? <p className="p-5 text-slate-500">No bookings yet.</p> : bookings.map((booking) => (
          <div key={booking._id} className="grid gap-2 border-b border-slate-200 p-5 last:border-0 dark:border-white/10 md:grid-cols-4">
            <span className="font-bold">{booking.eventId?.title}</span>
            <span>{formatDate(booking.bookingDate)}</span>
            <span>{booking.confirmationCode}</span>
            <span className="font-bold text-teal-500">{booking.paymentStatus}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserDashboard;
