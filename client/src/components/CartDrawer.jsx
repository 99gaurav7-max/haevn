import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineMinus, HiOutlinePlus, HiOutlineShoppingBag } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { formatINRDecimal } from '../utils/currency';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('toggleCart', handler);
    return () => window.removeEventListener('toggleCart', handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-midnight-800 border-l border-white/10 z-50 shadow-2xl shadow-black/40"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div>
                    <h2 className="text-xl font-serif text-white">Your Cart</h2>
                    <p className="text-white/40 text-sm mt-1">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
                  </div>
                  <button onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                    <HiOutlineX className="text-xl" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <HiOutlineShoppingBag className="text-3xl text-white/20" />
                      </div>
                      <p className="text-white/50 text-lg">Your cart is empty</p>
                      <p className="text-white/30 text-sm mt-2">Add some luxury to your life</p>
                      <Link to="/shop" onClick={() => setIsOpen(false)}
                        className="btn-primary mt-6 inline-block">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 card-hover">
                        <div className="w-20 h-24 flex-shrink-0 bg-white/5 flex items-center justify-center overflow-hidden">
                          <img src={item.images?.[0]} alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                          <p className="text-xs text-white/40 mt-1">
                            {item.size && `${item.size} / `}{item.color}
                          </p>
                          <p className="text-gold-500 font-semibold mt-2">{formatINRDecimal(item.price)}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-white/10">
                              <button onClick={() => updateQuantity(index, item.quantity - 1)}
                                className="px-2 py-1 text-white/50 hover:text-white transition-colors">
                                <HiOutlineMinus className="w-3 h-3" />
                              </button>
                              <span className="px-3 py-1 text-sm text-white border-x border-white/10">{item.quantity}</span>
                              <button onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="px-2 py-1 text-white/50 hover:text-white transition-colors">
                                <HiOutlinePlus className="w-3 h-3" />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(index)}
                              className="text-red-400/60 hover:text-red-400 text-xs transition-colors">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-white/10 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Total</span>
                      <span className="text-2xl font-serif text-gold-500">{formatINRDecimal(cartTotal)}</span>
                    </div>
                    <Link to="/checkout"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary w-full text-center block">
                      Checkout
                    </Link>
                    <Link to="/cart" onClick={() => setIsOpen(false)}
                      className="btn-outline w-full text-center block">
                      View Cart
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
