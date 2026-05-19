import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { formatCurrency } from '../utils/format';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  const load = async () => {
    try {
      const [statsRes, eventsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/events', { params: { status: 'all' } }),
        api.get('/admin/users')
      ]);
      setStats(statsRes.data.stats);
      setEvents(eventsRes.data.events);
      setUsers(usersRes.data.users);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Admin data unavailable');
    }
  };

  useEffect(() => { load(); }, []);

  const approve = async (id, status) => {
    await api.patch(`/events/${id}/approval`, { status });
    toast.success(`Event ${status}`);
    load();
  };

  return (
    <section className="container-pad py-12">
      <h1 className="text-4xl font-black">Admin Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {[
          ['Users', stats?.users || 0],
          ['Events', stats?.events || 0],
          ['Bookings', stats?.bookings || 0],
          ['Pending', stats?.pendingEvents || 0],
          ['Revenue', formatCurrency(stats?.revenue || 0)]
        ].map(([label, value]) => (
          <div key={label} className="glass rounded-lg p-5"><p className="text-2xl font-black">{value}</p><p className="text-sm text-slate-500">{label}</p></div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="glass rounded-lg p-5">
          <h2 className="mb-4 text-xl font-black">Category Analytics</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats?.categoryBreakdown || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass rounded-lg p-5">
          <h2 className="mb-4 text-xl font-black">Event Approvals</h2>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event._id} className="flex flex-col gap-3 rounded-lg bg-slate-100 p-4 dark:bg-white/10 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-bold">{event.title}</p>
                  <p className="text-sm text-slate-500">{event.category} - {event.status}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => approve(event._id, 'approved')} className="btn-primary px-3 py-2">Approve</button>
                  <button onClick={() => approve(event._id, 'rejected')} className="btn-secondary px-3 py-2">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="glass mt-8 rounded-lg p-5">
        <h2 className="mb-4 text-xl font-black">Users</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {users.map((user) => <div key={user._id} className="rounded-lg bg-slate-100 p-4 dark:bg-white/10"><p className="font-bold">{user.name}</p><p className="text-sm text-slate-500">{user.email} - {user.role}</p></div>)}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
