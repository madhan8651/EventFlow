import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: 'rzp_test_SrDaSPBze6Qnum',
  key_secret: '05ERr3Run8D9jl6rcqLmJPN6'
});

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};