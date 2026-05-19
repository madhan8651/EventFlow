import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="container-pad grid min-h-[60vh] place-items-center text-center">
    <div>
      <h1 className="text-5xl font-black">404</h1>
      <p className="mt-3 text-slate-500">Page not found.</p>
      <Link to="/" className="btn-primary mt-6">Go Home</Link>
    </div>
  </section>
);

export default NotFound;
