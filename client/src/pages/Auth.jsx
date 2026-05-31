import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      const redirect = searchParams.get('redirect') || '/';
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-warm-200">
      <div className="w-full max-w-md px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-serif text-navy-500/80 mb-2">
            {isLogin ? 'Welcome Back' : 'Join HAEVN'}
          </h1>
          <p className="text-navy-500/30 text-xs font-light tracking-wide">
            {isLogin ? 'Sign in to your account' : 'Create your account to unlock the full experience'}
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex bg-white border border-navy-500/10 mb-8">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-3 text-xs font-medium transition-all duration-300 tracking-wider ${
              isLogin ? 'gold-gradient text-[#0a0a1a]' : 'text-navy-500/40 hover:text-navy-500/70'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-3 text-xs font-medium transition-all duration-300 tracking-wider ${
              !isLogin ? 'gold-gradient text-[#0a0a1a]' : 'text-navy-500/40 hover:text-navy-500/70'
            }`}
          >
            Register
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {!isLogin && (
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-500/20" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field pl-12"
                />
              </div>
            )}

            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-500/20" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field pl-12"
              />
            </div>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-500/20" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="input-field pl-12"
              />
            </div>

            {error && (
              <p className="text-red-400/80 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center text-sm tracking-[0.2em]"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>

            {isLogin && (
              <p className="text-center text-navy-500/20 text-[10px]">
                Demo: demo@haevn.com / password123
              </p>
            )}
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
}
