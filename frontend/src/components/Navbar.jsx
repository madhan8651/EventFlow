import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/create-event', label: 'Create' },
  { to: '/about', label: 'About' }
];

const Navbar = ({ dark, setDark }) => {

  const [open, setOpen] = useState(false);

  const { user, logout, isAdmin } = useAuth();

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-teal-500 text-slate-950'
        : 'hover:bg-slate-200 dark:hover:bg-white/10'
    }`;

  return (

    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">

      <nav className="container-pad flex h-16 items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">

          <img
            src={logo}
            alt="EventFlow Logo"
            className="h-14 w-auto"
          />

        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-2 md:flex">

          {navItems.map((item) => (

            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
            >
              {item.label}
            </NavLink>

          ))}

          {user && (
            <NavLink
              to={isAdmin ? '/admin' : '/dashboard'}
              className={linkClass}
            >
              Dashboard
            </NavLink>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-2 md:flex">

          <button
            aria-label="Toggle theme"
            onClick={() => setDark((value) => !value)}
            className="rounded-lg p-3 hover:bg-slate-200 dark:hover:bg-white/10"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>

          {user ? (

            <button
              onClick={logout}
              className="btn-secondary py-2"
            >
              Logout
            </button>

          ) : (

            <Link
              to="/login"
              className="btn-primary py-2"
            >
              Login
            </Link>

          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="rounded-lg p-3 md:hidden"
        >
          <FiMenu />
        </button>

      </nav>

      {/* MOBILE MENU */}
      {open && (

        <div className="fixed inset-0 z-50 bg-slate-950/70 md:hidden">

          <div className="ml-auto h-full w-72 bg-white p-5 dark:bg-slate-900">

            <div className="mb-6 flex items-center justify-between">

              <img
                src={logo}
                alt="EventFlow Logo"
                className="h-14 w-auto"
              />

              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <FiX size={22} />
              </button>

            </div>

            <div className="flex flex-col gap-2">

              {navItems.map((item) => (

                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={linkClass}
                >
                  {item.label}
                </NavLink>

              ))}

              {user && (

                <NavLink
                  to={isAdmin ? '/admin' : '/dashboard'}
                  onClick={() => setOpen(false)}
                  className={linkClass}
                >
                  Dashboard
                </NavLink>

              )}

              {user ? (

                <button
                  onClick={logout}
                  className="btn-secondary mt-4"
                >
                  Logout
                </button>

              ) : (

                <Link
                  to="/login"
                  className="btn-primary mt-4"
                >
                  Login
                </Link>

              )}

            </div>

          </div>

        </div>

      )}

    </header>
  );
};

export default Navbar;