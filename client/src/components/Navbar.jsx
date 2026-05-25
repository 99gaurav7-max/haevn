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
    const event = new CustomEvent('toggleCart');
    window.dispatchEvent(event);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-midnight-500/95 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              className="lg:hidden btn-ghost text-2xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>

            <div className="hidden lg:flex items-center space-x-8">
              {categories.slice(0, 3).map((cat) => (
                <Link key={cat.name} to={cat.path}
                  className="text-sm uppercase tracking-widest text-white/70 hover:text-gold-500 transition-colors duration-300 font-medium">
                  {cat.name}
                </Link>
              ))}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm uppercase tracking-widest text-white/70 hover:text-gold-500 transition-colors duration-300 font-medium">
                  <span>More</span>
                  <HiOutlineChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-midnight-800/95 backdrop-blur-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {categories.slice(3).map((cat) => (
                    <Link key={cat.name} to={cat.path}
                      className="block px-6 py-3 text-sm text-white/70 hover:text-gold-500 hover:bg-white/5 transition-colors duration-200">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-serif font-bold gold-gradient bg-clip-text text-transparent tracking-wider">HAEVN</span>
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
                  <div className="absolute right-0 top-full mt-2 w-56 bg-midnight-800/95 backdrop-blur-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="px-6 py-3 border-b border-white/10">
                      <p className="text-sm text-white/50">Welcome</p>
                      <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    </div>
                    <Link to="/profile" className="block px-6 py-3 text-sm text-white/70 hover:text-gold-500 hover:bg-white/5">My Profile</Link>
                    <Link to="/profile?tab=orders" className="block px-6 py-3 text-sm text-white/70 hover:text-gold-500 hover:bg-white/5">My Orders</Link>
                    <button onClick={logout} className="block w-full text-left px-6 py-3 text-sm text-red-400 hover:bg-white/5">Sign Out</button>
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
                  <span className="absolute -top-1 -right-1 w-5 h-5 gold-gradient rounded-full flex items-center justify-center text-[10px] font-bold text-midnight-900">
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
              className="border-t border-white/10 bg-midnight-800/95 backdrop-blur-xl"
            >
              <div className="max-w-4xl mx-auto px-4 py-6">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search for luxury... e.g., 'Italian leather shoes'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-gold-500/30 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500 pr-14 text-lg"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-500 text-2xl hover:text-gold-400">
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
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative w-80 h-full bg-midnight-800/95 backdrop-blur-xl border-r border-white/10 p-8 pt-24 overflow-y-auto">
              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link key={cat.name} to={cat.path}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-lg text-white/70 hover:text-gold-500 hover:bg-white/5 transition-colors duration-200">
                    {cat.name}
                  </Link>
                ))}
                <hr className="border-white/10 my-4" />
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-lg text-white/70 hover:text-gold-500">My Profile</Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }}
                      className="block w-full text-left px-4 py-3 text-lg text-red-400">Sign Out</button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-lg text-white/70 hover:text-gold-500">Sign In</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
