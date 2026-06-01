import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash, HiOutlineShoppingBag, HiOutlineArrowLeft } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { formatINRDecimal, formatINR } from '../utils/currency';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-20">
        <div className="max-w-8xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 rounded-full bg-warm-200 border border-navy-500/10 flex items-center justify-center mx-auto mb-6">
              <HiOutlineShoppingBag className="text-4xl text-royal-blue-500/15" />
            </div>
            <h1 className="text-3xl font-serif text-royal-blue-500/80 mb-4">Your Cart is Empty</h1>
            <p className="text-royal-blue-500/30 text-sm font-light mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2 text-sm tracking-[0.2em] px-10">
              <HiOutlineArrowLeft /> Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="border-b border-navy-500/8 bg-warm-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Your Selection</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue-500/90">Shopping Cart</h1>
            <p className="text-royal-blue-500/30 text-xs mt-3 tracking-wide">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-6 p-6 bg-white border border-navy-500/10 card-hover"
              >
                <Link to={`/product/${item.id}`} className="w-28 h-32 flex-shrink-0 bg-warm-200 overflow-hidden">
                  <img src={item.images?.[0]} alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }} />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[9px] text-gold-500/60 uppercase tracking-[0.2em] mb-1 font-medium">{item.subcategory}</p>
                      <Link to={`/product/${item.id}`} className="text-base font-medium text-royal-blue-500/80 hover:text-gold-500 transition-colors">
                        {item.name}
                      </Link>
                      <p className="text-xs text-royal-blue-500/30 mt-1 tracking-wide">{item.size} / {item.color}</p>
                    </div>
                    <p className="text-xl font-serif text-gold-500/90 font-semibold">{formatINRDecimal(item.price * item.quantity)}</p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-navy-500/15">
                      <button onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="px-3 py-2 text-royal-blue-500/30 hover:text-royal-blue-500/70 transition-colors">
                        <HiOutlineMinus />
                      </button>
                      <span className="px-5 py-2 text-royal-blue-500/60 border-x border-navy-500/15 min-w-[3rem] text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="px-3 py-2 text-royal-blue-500/30 hover:text-royal-blue-500/70 transition-colors">
                        <HiOutlinePlus />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(index)}
                      className="flex items-center gap-2 text-red-400/40 hover:text-red-400 transition-colors text-xs uppercase tracking-wider">
                      <HiOutlineTrash /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 p-8 bg-white border border-navy-500/10">
              <h3 className="text-lg font-serif text-royal-blue-500/80 mb-6 font-medium">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-royal-blue-500/30">Subtotal</span>
                  <span className="text-royal-blue-500/70">{formatINRDecimal(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-royal-blue-500/30">Shipping</span>
                  <span className="text-green-600/80">{cartTotal > 20000 ? 'Free' : formatINR(499)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-royal-blue-500/30">GST (12%)</span>
                  <span className="text-royal-blue-500/70">{formatINRDecimal(Math.round(cartTotal * 0.12))}</span>
                </div>
                <hr className="border-navy-500/8" />
                <div className="flex justify-between">
                  <span className="text-royal-blue-500/60 text-sm font-medium">Total</span>
                  <span className="text-2xl font-serif text-gold-500/90 font-bold">
                    {formatINRDecimal(cartTotal + (cartTotal > 20000 ? 0 : 499) + Math.round(cartTotal * 0.12))}
                  </span>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center block mt-8 text-sm py-4 tracking-[0.2em]">
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="btn-ghost w-full text-center block mt-3 text-xs flex items-center justify-center gap-1 tracking-wide">
                <HiOutlineArrowLeft /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
