export const categories = [
  'All',
  'Technology',
  'Temple',
  'Birthday',
  'Wedding',
  'Convention Hall',
  'Music',
  'DJ Night',
  'Corporate',
  'College',
  'Baby Shower',
  'Photography',
  'Catering',
  'Business',
  'Education',
  'Sports',
  'Art',
  'Community'
];

export const fallbackEvents = [

  {
    _id: '1',
    title: 'Murugan Temple Festival',
    description: 'A grand spiritual celebration with chenda melam, cultural dance, and devotional programs.',
    category: 'Temple',
    date: new Date(Date.now() + 86400000 * 10).toISOString(),
    time: '06:00',
    location: 'Palani Murugan Temple',
    price: 299,
    image: 'https://t3.ftcdn.net/jpg/09/38/88/32/360_F_938883273_IQcAdKf476AtxfH9znPOkZJRt7CyOQ61.jpg',
    seatsAvailable: 500,
    status: 'approved'
  },

  {
    _id: '2',
    title: 'Royal Birthday Celebration',
    description: 'Luxury birthday party setup with DJ, catering, balloons, photography, and entertainment.',
    category: 'Birthday',
    date: new Date(Date.now() + 86400000 * 15).toISOString(),
    time: '18:00',
    location: 'Chennai Party Hall',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    seatsAvailable: 120,
    status: 'approved'
  },

  {
    _id: '3',
    title: 'Grand Mahal Convention Center',
    description: 'Premium convention hall booking for weddings, receptions, corporate meetings, and conferences.',
    category: 'Convention Hall',
    date: new Date(Date.now() + 86400000 * 20).toISOString(),
    time: '09:00',
    location: 'Coimbatore',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    seatsAvailable: 800,
    status: 'approved'
  },

  {
    _id: '4',
    title: 'Luxury Wedding Reception',
    description: 'A beautiful wedding reception with floral decorations, live music, and premium dining.',
    category: 'Wedding',
    date: new Date(Date.now() + 86400000 * 25).toISOString(),
    time: '19:00',
    location: 'Madurai Palace Hall',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    seatsAvailable: 600,
    status: 'approved'
  },

  {
    _id: '5',
    title: 'Indie Music Carnival',
    description: 'An open-air evening with independent artists, food stalls, and live performances.',
    category: 'Music',
    date: new Date(Date.now() + 86400000 * 30).toISOString(),
    time: '17:00',
    location: 'Delhi Arts Garden',
    price: 999,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80',
    seatsAvailable: 240,
    status: 'approved'
  }

];