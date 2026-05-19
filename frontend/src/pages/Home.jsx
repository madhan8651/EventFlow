import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCalendar,
  FiShield,
  FiTrendingUp
} from 'react-icons/fi';

import EventCard from '../components/EventCard';
import { fallbackEvents } from '../data/mockEvents';
import heroImage from '../assets/hero.jpg';

const stats = [
  ['25K+', 'Tickets Booked'],
  ['600+', 'Events Hosted'],
  ['80+', 'Cities Covered']
];

const Home = () => (

  <>

    {/* HERO SECTION */}

    <section className="relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,.22),transparent_34%),linear-gradient(135deg,rgba(15,23,42,.04),transparent)] dark:bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,.28),transparent_34%)]" />

      <div className="container-pad relative grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr]">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <span className="rounded-full border border-teal-400/40 bg-teal-400/10 px-4 py-2 text-sm font-bold text-teal-600 dark:text-teal-300">
            Premium Event Management Platform
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            Celebrate Every Moment with India’s Premium Event & Venue Booking Platform.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Experience unforgettable weddings, temple festivals, birthday celebrations,
            concerts, luxury venues, and premium events — all in one powerful platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <Link to="/events" className="btn-primary">
              Explore Events <FiArrowRight />
            </Link>

            <Link to="/create-event" className="btn-secondary">
              Create Event
            </Link>

          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">

            {stats.map(([value, label]) => (

              <div
                key={label}
                className="glass rounded-lg p-4"
              >

                <p className="text-2xl font-black">
                  {value}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {label}
                </p>

              </div>

            ))}

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-lg p-4"
        >

          <img
            className="h-[520px] w-full rounded-lg object-cover"
            src={heroImage}
            alt="Wedding Event"
          />

        </motion.div>

      </div>

    </section>

    {/* CATEGORY SECTION */}

    <section className="container-pad py-12">

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Explore Categories
        </h2>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Discover weddings, temple festivals, birthday celebrations,
          concerts, and premium venues.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">

        {[
          ['🏛️', 'Temple'],
          ['💍', 'Wedding'],
          ['🎂', 'Birthday'],
          ['🎵', 'Concert'],
          ['🏢', 'Convention'],
          ['🎉', 'Party']
        ].map(([icon, title]) => (

          <div
            key={title}
            className="glass flex flex-col items-center rounded-2xl p-6 text-center transition hover:scale-105 hover:border-teal-400"
          >

            <span className="text-5xl">
              {icon}
            </span>

            <p className="mt-4 text-lg font-bold">
              {title}
            </p>

          </div>

        ))}

      </div>

    </section>

    {/* FEATURED EVENTS */}

    <section className="container-pad py-16">

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">

        <div>

          <h2 className="text-3xl font-black">
            Featured Events
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Discover trending events, luxury venues, weddings, temple
            festivals, and premium celebrations.
          </p>

        </div>

        <Link to="/events" className="btn-secondary">
          View All
        </Link>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {fallbackEvents.map((event) => (

          <EventCard
            key={event._id}
            event={event}
          />

        ))}

      </div>

    </section>

    {/* FEATURES */}

    <section className="container-pad pb-20">

      <div className="grid gap-5 md:grid-cols-3">

        {[
          [
            FiCalendar,
            'Smart Booking',
            'Reserve seats, book venues, and receive instant confirmations securely.'
          ],

          [
            FiShield,
            'Secure Payments',
            'Integrated Razorpay payments with safe and seamless booking experience.'
          ],

          [
            FiTrendingUp,
            'Premium Experience',
            'Modern UI, analytics dashboard, and professional event management tools.'
          ]

        ].map(([Icon, title, text]) => (

          <div
            key={title}
            className="glass rounded-lg p-6"
          >

            <Icon className="text-3xl text-teal-500" />

            <h3 className="mt-4 text-xl font-bold">
              {title}
            </h3>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {text}
            </p>

          </div>

        ))}

      </div>

    </section>

  </>
);

export default Home;