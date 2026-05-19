import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-slate-950">
    <div className="container-pad flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xl font-black">Event<span className="text-teal-500">Flow</span></p>
        <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">A complete event discovery, creation, booking, and analytics platform for college projects and portfolios.</p>
      </div>
      <div className="flex gap-3 text-2xl">
        <a aria-label="GitHub" href="https://github.com" className="hover:text-teal-500"><FaGithub /></a>
        <a aria-label="LinkedIn" href="https://linkedin.com" className="hover:text-teal-500"><FaLinkedin /></a>
        <a aria-label="Instagram" href="https://instagram.com" className="hover:text-teal-500"><FaInstagram /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
