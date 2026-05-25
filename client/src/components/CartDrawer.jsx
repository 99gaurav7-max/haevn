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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#060610] border-l border-white/5 z-50 shadow-2xl shadow-black/60"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <div>
                    <h2 className="text-xl font-serif text-white/90 tracking-wide">Your Cart</h2>
                    <p className="text-white/30 text-xs mt-1 uppercase tracking-[0.15em]">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
                  </div>
                  <button onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-gold-500 transition-colors">
                    <HiOutlineX className="text-xl" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                        <HiOutlineShoppingBag className="text-4xl text-white/10" />
                      </div>
                      <p className="text-white/40 text-lg font-light">Your cart is empty</p>
                      <p className="text-white/20 text-sm mt-2 font-light">Add some luxury to your life</p>
                      <Link to="/shop" onClick={() => setIsOpen(false)}
                        className="btn-primary mt-8 inline-block text-sm px-10 py-3">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 card-hover"
                      >
                        <div className="w-20 h-24 flex-shrink-0 bg-white/[0.02] flex items-center justify-center overflow-hidden">
                          <img src={item.images?.[0]} alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white/80 truncate">{item.name}</h4>
                          <p className="text-[10px] text-white/30 mt-1 uppercase tracking-[0.1em]">
                            {item.size && `${item.size} / `}{item.color}
                          </p>
                          <p className="text-gold-500/90 font-medium mt-2 text-sm">{formatINRDecimal(item.price)}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-white/10">
                              <button onClick={() => updateQuantity(index, item.quantity - 1)}
                                className="px-2 py-1 text-white/30 hover:text-white transition-colors">
                                <HiOutlineMinus className="w-3 h-3" />
                              </button>
                              <span className="px-3 py-1 text-xs text-white/70 border-x border-white/10">{item.quantity}</span>
                              <button onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="px-2 py-1 text-white/30 hover:text-white transition-colors">
                                <HiOutlinePlus className="w-3 h-3" />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(index)}
                              className="text-red-400/40 hover:text-red-400 text-[10px] uppercase tracking-wider transition-colors">
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-white/5 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs uppercase tracking-widest">Total</span>
                      <span className="text-2xl font-serif text-gold-500/90">{formatINRDecimal(cartTotal)}</span>
                    </div>
                    <Link to="/checkout"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary w-full text-center block text-sm py-3.5">
                      Checkout
                    </Link>
                    <Link to="/cart" onClick={() => setIsOpen(false)}
                      className="btn-outline w-full text-center block text-sm py-3.5">
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
