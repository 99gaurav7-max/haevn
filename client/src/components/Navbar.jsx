import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiOutlineUser, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineMenu, HiOutlineX, HiOutlineChevronDown } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const categories = [
  { name: 'Headwear', path: '/shop/Headwear' },
  { name: 'Eyewear', path: '/shop/Eyewear' },
  { name: 'Tops', path: '/shop/Tops' },
  { name: 'Bottoms', path: '/shop/Bottoms' },
  { name: 'Footwear', path: '/shop/Footwear' },
  { name: 'Accessories', path: '/shop/Accessories' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleCartDrawer = () => {
    window.dispatchEvent(new CustomEvent('toggleCart'));
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-[#060610]/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
      }`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              className="lg:hidden btn-ghost text-2xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>

            <div className="hidden lg:flex items-center space-x-10">
              {categories.slice(0, 3).map((cat) => (
                <Link key={cat.name} to={cat.path}
                  className="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-gold-500 transition-colors duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-gold-500 after:transition-all after:duration-300 after:w-0 hover:after:w-full">
                  {cat.name}
                </Link>
              ))}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-xs uppercase tracking-[0.25em] text-white/60 hover:text-gold-500 transition-colors duration-300 font-medium">
                  <span>More</span>
                  <HiOutlineChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#080816]/95 backdrop-blur-2xl border border-white/[0.06] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl shadow-black/50">
                  {categories.slice(3).map((cat) => (
                    <Link key={cat.name} to={cat.path}
                      className="block px-6 py-3 text-xs text-white/50 hover:text-gold-500 hover:bg-white/[0.02] transition-colors duration-200 uppercase tracking-[0.15em]">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-3xl font-serif font-bold gold-gradient-text tracking-[0.15em]">HAEVN</span>
            </Link>

            <div className="flex items-center space-x-1 sm:space-x-3">
              <button onClick={() => setSearchOpen(!searchOpen)}
                className="btn-ghost text-xl">
                <HiOutlineSearch />
              </button>
              {user ? (
                <div className="relative group hidden sm:block">
                  <button className="btn-ghost text-xl">
                    <HiOutlineUser />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#080816]/95 backdrop-blur-2xl border border-white/[0.06] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl shadow-black/50">
                    <div className="px-6 py-3 border-b border-white/5">
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">Welcome</p>
                      <p className="text-sm font-medium text-white/80 mt-1">{user.name}</p>
                    </div>
                    <Link to="/profile" className="block px-6 py-3 text-xs text-white/50 hover:text-gold-500 hover:bg-white/[0.02] uppercase tracking-[0.1em]">My Profile</Link>
                    <Link to="/profile?tab=orders" className="block px-6 py-3 text-xs text-white/50 hover:text-gold-500 hover:bg-white/[0.02] uppercase tracking-[0.1em]">My Orders</Link>
                    <button onClick={logout} className="block w-full text-left px-6 py-3 text-xs text-red-400/70 hover:text-red-400 hover:bg-white/[0.02] uppercase tracking-[0.1em]">Sign Out</button>
                  </div>
                </div>
              ) : (
                <Link to="/auth" className="btn-ghost text-xl hidden sm:block">
                  <HiOutlineUser />
                </Link>
              )}
              <button onClick={toggleCartDrawer}
                className="btn-ghost text-xl relative">
                <HiOutlineShoppingBag />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 gold-gradient rounded-full flex items-center justify-center text-[9px] font-bold text-[#0a0a1a] shadow-lg shadow-gold-500/30">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-t border-white/5 bg-[#080816]/95 backdrop-blur-2xl"
            >
              <div className="max-w-4xl mx-auto px-4 py-6">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search the collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 bg-white/[0.02] border border-gold-500/20 text-white/90 placeholder:text-white/20 focus:outline-none focus:border-gold-500/50 pr-14 text-lg font-light tracking-wide"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-500/70 hover:text-gold-500 text-2xl transition-colors">
                    <HiOutlineSearch />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-80 h-full bg-[#080816]/95 backdrop-blur-2xl border-r border-white/5 p-8 pt-24 overflow-y-auto"
            >
              <div className="space-y-1">
                {categories.map((cat) => (
                  <Link key={cat.name} to={cat.path}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm text-white/60 hover:text-gold-500 hover:bg-white/[0.02] transition-colors duration-200 uppercase tracking-[0.15em]">
                    {cat.name}
                  </Link>
                ))}
                <hr className="border-white/5 my-6" />
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-sm text-white/60 hover:text-gold-500 uppercase tracking-[0.1em]">My Profile</Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }}
                      className="block w-full text-left px-4 py-3 text-sm text-red-400/70 hover:text-red-400 uppercase tracking-[0.1em]">Sign Out</button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm text-white/60 hover:text-gold-500 uppercase tracking-[0.1em]">Sign In</Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
