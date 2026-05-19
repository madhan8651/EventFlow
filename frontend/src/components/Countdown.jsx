import { useEffect, useState } from 'react';

const getRemaining = (date) => {
  const total = new Date(date).getTime() - Date.now();
  return {
    total,
    days: Math.max(0, Math.floor(total / 86400000)),
    hours: Math.max(0, Math.floor((total / 3600000) % 24)),
    minutes: Math.max(0, Math.floor((total / 60000) % 60))
  };
};

const Countdown = ({ date }) => {
  const [remaining, setRemaining] = useState(getRemaining(date));

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining(date)), 60000);
    return () => clearInterval(timer);
  }, [date]);

  if (remaining.total <= 0) return <span className="font-bold text-rose-500">Started</span>;

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        ['Days', remaining.days],
        ['Hours', remaining.hours],
        ['Mins', remaining.minutes]
      ].map(([label, value]) => (
        <div key={label} className="rounded-lg bg-slate-100 p-3 text-center dark:bg-white/10">
          <p className="text-2xl font-black">{value}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
