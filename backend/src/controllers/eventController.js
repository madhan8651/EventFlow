import Event from '../models/Event.js';

const imageUrl = (req) => (req.file ? `/uploads/${req.file.filename}` : req.body.image || '');

export const getEvents = async (req, res, next) => {
  try {
   const { search = '', category = '', page = 1, limit = 9, status = 'all' } = req.query;
    const query = {};
    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (status !== 'all') query.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [events, total] = await Promise.all([
      Event.find(query).populate('organizer', 'name email').sort({ date: 1 }).skip(skip).limit(Number(limit)),
      Event.countDocuments(query)
    ]);

    res.json({ success: true, events, page: Number(page), pages: Math.ceil(total / Number(limit)), total });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email');
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...req.body,
      image: imageUrl(req),
      organizer: req.user._id,
      status: req.user.role === 'admin' ? 'approved' : 'pending'
    });
    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    const ownsEvent = event.organizer.toString() === req.user._id.toString();
    if (!ownsEvent && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('You can update only your own events');
    }
    Object.assign(event, { ...req.body, image: imageUrl(req) || event.image });
    await event.save();
    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    const ownsEvent = event.organizer.toString() === req.user._id.toString();
    if (!ownsEvent && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('You can delete only your own events');
    }
    await event.deleteOne();
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    next(error);
  }
};

export const updateApproval = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};
