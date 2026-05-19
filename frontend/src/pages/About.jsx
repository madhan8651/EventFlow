import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const About = () => (
  <section className="container-pad py-12">
    <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
      <div>
        <h1 className="text-4xl font-black">About EventFlow</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">EventFlow is a complete full-stack project that demonstrates modern frontend UI, secure REST APIs, MongoDB relationships, role-based access, booking flows, and admin analytics.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {['Modern UI', 'Secure APIs', 'Admin Ready'].map((item) => <div key={item} className="glass rounded-lg p-5 font-bold">{item}</div>)}
        </div>
      </div>
      <div className="glass rounded-lg p-6">
        <h2 className="text-2xl font-black">Contact</h2>
        <div className="mt-5 space-y-4 text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-3"><FiMail /> hello@eventflow.dev</p>
          <p className="flex items-center gap-3"><FiPhone /> +91 98765 43210</p>
          <p className="flex items-center gap-3"><FiMapPin /> Bengaluru, India</p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
