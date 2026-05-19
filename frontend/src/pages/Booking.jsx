import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { fallbackEvents } from '../data/mockEvents';
import { formatCurrency } from '../utils/format';

const Booking = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    api
      .get(`/events/${id}`)
      .then(({ data }) => setEvent(data.event))
      .catch(() =>
        setEvent(
          fallbackEvents.find((item) => item._id === id) ||
          fallbackEvents[0]
        )
      );

  }, [id]);

  const book = async () => {

    try {

      setLoading(true);

      // Create Razorpay Order
      const { data } = await api.post('/payment/create-order', {
        amount: event.price * seats
      });

      const options = {

        key: 'rzp_test_SrDaSPBze6Qnum',

        amount: data.order.amount,

        currency: data.order.currency,

        name: 'EventFlow',

        description: event.title,

        order_id: data.order.id,

        prefill: {
          name: 'Madhan',
          email: '6871madhan@gmail.com'
        },

        modal: {
          ondismiss: function () {
            toast.error('Payment cancelled');
          }
        },

        handler: async function (response) {

          try {

            console.log(response);

            await api.post('/bookings', {
              eventId: event._id,
              seats,
              paymentStatus: 'paid'
            });

            toast.success('Payment Successful!');

            navigate('/dashboard');

          } catch (error) {

            console.log(error);

            toast.error('Booking failed');
          }
        },

        theme: {
          color: '#14b8a6'
        }
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message || 'Payment failed'
      );

    } finally {

      setLoading(false);
    }
  };

  if (!event) return null;

  return (

    <section className="container-pad py-12">

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_.8fr]">

        <div className="glass rounded-lg p-6">

          <h1 className="text-3xl font-black">
            Confirm Booking
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {event.title}
          </p>

          <label className="mt-6 block text-sm font-bold">
            Seats
          </label>

          <input
            className="input mt-2"
            type="number"
            min="1"
            max={event.seatsAvailable}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
          />

          <div className="mt-6 rounded-lg bg-slate-100 p-4 dark:bg-white/10">

            <p className="font-bold">
              Razorpay Payment
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Secure online payment powered by Razorpay.
            </p>

          </div>
        </div>

        <div className="glass rounded-lg p-6">

          <h2 className="text-2xl font-black">
            Order Summary
          </h2>

          <div className="mt-5 space-y-3 text-slate-600 dark:text-slate-300">

            <p className="flex justify-between">
              <span>Ticket price</span>
              <span>{formatCurrency(event.price)}</span>
            </p>

            <p className="flex justify-between">
              <span>Seats</span>
              <span>{seats}</span>
            </p>

            <p className="flex justify-between text-xl font-black text-slate-950 dark:text-white">

              <span>Total</span>

              <span>
                {formatCurrency(event.price * seats)}
              </span>

            </p>
          </div>

          <button
            onClick={book}
            disabled={loading}
            className="btn-primary mt-8 w-full"
          >

            {loading ? 'Processing...' : 'Pay with Razorpay'}

          </button>
        </div>
      </div>
    </section>
  );
};

export default Booking;