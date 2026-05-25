import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCheck, HiOutlineCreditCard, HiOutlineLocationMarker, HiOutlineUser, HiOutlineDeviceMobile } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../utils/api';
import { formatINR, formatINRDecimal } from '../utils/currency';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'India',
    paymentMethod: 'upi',
    cardName: '', cardNumber: '', expDate: '', cvv: '',
    upiId: '',
  });

  const updateForm = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth?redirect=/checkout');
      return;
    }
    setSubmitting(true);
    try {
      await orderAPI.create({
        items: cart,
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
        paymentMethod: form.paymentMethod,
        total: cartTotal,
      });
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Order failed:', err);
      alert('Order failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="pt-20">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6"
          >
            <HiOutlineCheck className="text-3xl text-midnight-900" />
          </motion.div>
          <h1 className="text-3xl font-serif text-white mb-4">Order Confirmed</h1>
          <p className="text-white/50 mb-2">Thank you for your purchase.</p>
          <p className="text-white/50 mb-8">A confirmation email has been sent to {form.email || user?.email}</p>
          <Link to="/shop" className="btn-primary inline-block">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-20">
        <div className="max-w-8xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-serif text-white mb-4">Your cart is empty</h1>
          <Link to="/shop" className="btn-primary inline-block">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="border-b border-white/5 bg-midnight-900/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500 text-sm uppercase tracking-[0.3em] mb-2">Secure Checkout</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Complete Your Order</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {!user && (
              <div className="mb-8 p-6 bg-gold-500/10 border border-gold-500/20">
                <p className="text-gold-500 text-sm">Already have an account? <Link to="/auth?redirect=/checkout" className="underline font-medium">Sign in</Link> for faster checkout.</p>
              </div>
            )}

            <div className="mb-8 p-4 bg-gold-500/5 border border-gold-500/10 flex items-center gap-3">
              <HiOutlineDeviceMobile className="text-gold-500 text-xl flex-shrink-0" />
              <p className="text-xs text-white/60">
                We accept <strong className="text-gold-500">UPI (GPay, PhonePe, Paytm)</strong>, 
                Credit/Debit Cards, Net Banking & <strong className="text-gold-500">Cash on Delivery</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Steps */}
              <div className="flex items-center gap-4 mb-10">
                {['Shipping', 'Payment', 'Review'].map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      step > i + 1 ? 'gold-gradient text-midnight-900' :
                      step === i + 1 ? 'border-2 border-gold-500 text-gold-500' :
                      'border border-white/20 text-white/30'
                    }`}>
                      {step > i + 1 ? <HiOutlineCheck /> : i + 1}
                    </div>
                    <span className={`text-sm hidden sm:inline ${
                      step === i + 1 ? 'text-gold-500' : 'text-white/40'
                    }`}>{label}</span>
                    {i < 2 && <div className="w-8 h-px bg-white/10" />}
                  </div>
                ))}
              </div>

              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-serif text-white flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-gold-500" /> Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input disabled={submitting} required placeholder="First Name" value={form.firstName} onChange={updateForm('firstName')} className="input-field" />
                    <input disabled={submitting} required placeholder="Last Name" value={form.lastName} onChange={updateForm('lastName')} className="input-field" />
                    <input disabled={submitting} required type="email" placeholder="Email" value={form.email} onChange={updateForm('email')} className="input-field" />
                    <input disabled={submitting} required placeholder="Phone" value={form.phone} onChange={updateForm('phone')} className="input-field" />
                    <div className="sm:col-span-2">
                      <input disabled={submitting} required placeholder="Address" value={form.address} onChange={updateForm('address')} className="input-field" />
                    </div>
                    <input disabled={submitting} required placeholder="City" value={form.city} onChange={updateForm('city')} className="input-field" />
                    <select disabled={submitting} required value={form.state} onChange={updateForm('state')} className="input-field">
                      <option value="" disabled>Select State</option>
                      {['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Chandigarh','Puducherry'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <input disabled={submitting} required placeholder="PIN Code" value={form.zip} onChange={updateForm('zip')} maxLength={6} className="input-field" />
                    <input disabled={submitting} required placeholder="Country" value={form.country} onChange={updateForm('country')} className="input-field" />
                  </div>
                  <button type="button" onClick={() => setStep(2)}
                    className="btn-primary">Continue to Payment</button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-serif text-white flex items-center gap-2">
                    <HiOutlineCreditCard className="text-gold-500" /> Payment Method
                  </h3>

                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: HiOutlineDeviceMobile },
                      { id: 'card', label: 'Credit / Debit Card', icon: HiOutlineCreditCard },
                      { id: 'cod', label: 'Cash on Delivery', icon: HiOutlineLocationMarker },
                    ].map(({ id, label, icon: Icon }) => (
                      <label key={id} className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
                        form.paymentMethod === id
                          ? 'border-gold-500 bg-gold-500/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                      }`}>
                        <input type="radio" name="payment" value={id}
                          checked={form.paymentMethod === id}
                          onChange={updateForm('paymentMethod')}
                          className="accent-gold-500 w-4 h-4" />
                        <Icon className={`text-lg ${form.paymentMethod === id ? 'text-gold-500' : 'text-white/40'}`} />
                        <span className="text-sm text-white">{label}</span>
                      </label>
                    ))}
                  </div>

                  {form.paymentMethod === 'upi' && (
                    <div className="mb-6">
                      <input disabled={submitting} placeholder="UPI ID (e.g., name@upi)" value={form.upiId} onChange={updateForm('upiId')} className="input-field" />
                      <p className="text-[10px] text-white/30 mt-1">Enter your UPI ID to receive payment request</p>
                    </div>
                  )}

                  {form.paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="sm:col-span-2">
                        <input disabled={submitting} required placeholder="Name on Card" value={form.cardName} onChange={updateForm('cardName')} className="input-field" />
                      </div>
                      <div className="sm:col-span-2">
                        <input disabled={submitting} required placeholder="Card Number" maxLength={19} value={form.cardNumber} onChange={updateForm('cardNumber')} className="input-field" />
                      </div>
                      <input disabled={submitting} required placeholder="MM/YY" maxLength={5} value={form.expDate} onChange={updateForm('expDate')} className="input-field" />
                      <input disabled={submitting} required placeholder="CVV" maxLength={4} value={form.cvv} onChange={updateForm('cvv')} className="input-field" />
                    </div>
                  )}

                  {form.paymentMethod === 'cod' && (
                    <div className="mb-6 p-4 bg-gold-500/5 border border-gold-500/10">
                      <p className="text-sm text-white/70">Pay with cash when your order is delivered. Please keep the exact amount ready.</p>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)}
                      className="btn-outline">Back</button>
                    <button type="button" onClick={() => setStep(3)}
                      className="btn-primary flex-1">Review Order</button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-serif text-white flex items-center gap-2">
                    <HiOutlineUser className="text-gold-500" /> Review Your Order
                  </h3>

                  <div className="p-6 bg-white/[0.02] border border-white/5 space-y-4">
                    <h4 className="text-sm text-gold-500 uppercase tracking-widest font-semibold">Shipping To</h4>
                    <p className="text-white text-sm">{form.firstName} {form.lastName}</p>
                    <p className="text-white/60 text-sm">{form.address}, {form.city}, {form.state} {form.zip}</p>
                  </div>

                  <div className="p-6 bg-white/[0.02] border border-white/5 space-y-3">
                    <h4 className="text-sm text-gold-500 uppercase tracking-widest font-semibold">Payment Method</h4>
                    <p className="text-white text-sm capitalize">{form.paymentMethod === 'upi' ? 'UPI — ' + form.upiId : form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
                  </div>

                  <div className="p-6 bg-white/[0.02] border border-white/5 space-y-3">
                    <h4 className="text-sm text-gold-500 uppercase tracking-widest font-semibold">Items ({cart.length})</h4>
                    {cart.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-white/70">{item.name} × {item.quantity}</span>
                        <span className="text-white">{formatINRDecimal(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(2)}
                      className="btn-outline">Back</button>
                    <button type="submit" disabled={submitting}
                      className="btn-primary flex-1 flex items-center justify-center gap-2">
                      {submitting ? 'Processing...' : `Pay ${formatINRDecimal(cartTotal + (cartTotal > 20000 ? 0 : 499) + cartTotal * 0.12)}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-8 bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-lg font-serif text-white mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-12 h-14 flex-shrink-0 bg-midnight-900 overflow-hidden">
                      <img src={item.images?.[0]} alt="" className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-white/40">{item.size} / {item.color} × {item.quantity}</p>
                      <p className="text-xs text-gold-500 font-medium mt-1">{formatINRDecimal(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="border-white/10 mb-4" />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white">{formatINRDecimal(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Shipping</span>
                  <span className="text-green-400">{cartTotal > 20000 ? 'Free' : formatINR(499)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">GST (12%)</span>
                  <span className="text-white">{formatINRDecimal(cartTotal * 0.12)}</span>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-xl font-serif text-gold-500 font-bold">
                    {formatINRDecimal(cartTotal + (cartTotal > 20000 ? 0 : 499) + cartTotal * 0.12)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
