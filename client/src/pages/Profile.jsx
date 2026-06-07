import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineCube, HiOutlineLocationMarker, HiOutlineLogout } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../utils/api';
import { formatINRDecimal } from '../utils/currency';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const activeTab = searchParams.get('tab') || 'profile';

  useEffect(() => {
    if (!user) {
      navigate('/auth?redirect=/profile');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && activeTab === 'orders') {
      const fetchOrders = async () => {
        try {
          const { data } = await orderAPI.getAll();
          setOrders(data.orders || []);
        } catch (err) {
          console.error('Failed to fetch orders:', err);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [user, activeTab]);

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: HiOutlineUser },
    { id: 'orders', label: 'Orders', icon: HiOutlineCube },
    { id: 'addresses', label: 'Addresses', icon: HiOutlineLocationMarker },
  ];

  return (
    <div className="pt-20">
      <div className="border-b border-gold-500/10 bg-navy-600">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Account</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-warm-50/90">My Account</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSearchParams({ tab: id })}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-xs transition-all duration-200 tracking-wider ${
                    activeTab === id
                      ? 'gold-gradient text-[#0a0a1a] font-semibold'
                      : 'text-warm-50/40 hover:text-warm-50/70 hover:bg-white/5'
                  }`}
                >
                  <Icon className="text-lg" />
                  {label}
                </button>
              ))}
              <hr className="border-gold-500/10 my-4" />
              <button onClick={() => { logout(); navigate('/'); }}
                className="w-full flex items-center gap-3 px-5 py-3 text-xs text-red-400/40 hover:text-red-400 hover:bg-white/5 transition-all tracking-wider">
                <HiOutlineLogout className="text-lg" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-navy-500/80 backdrop-blur-xl border border-gold-500/10"
              >
                <h3 className="text-lg font-serif text-warm-50/90 mb-6 font-medium">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-warm-50/50 uppercase tracking-[0.2em]">Name</label>
                    <p className="text-warm-50/70 text-sm mt-1">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] text-warm-50/50 uppercase tracking-[0.2em]">Email</label>
                    <p className="text-warm-50/70 text-sm mt-1">{user.email}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-serif text-warm-50/90 mb-6 font-medium">Order History</h3>
                {loadingOrders ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-8 bg-navy-500/80 backdrop-blur-xl border border-gold-500/10 text-center">
                    <p className="text-warm-50/40 text-sm font-light">No orders yet</p>
                    <button onClick={() => navigate('/shop')}
                      className="btn-outline mt-6 text-xs tracking-[0.2em]">Start Shopping</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 bg-navy-500/80 backdrop-blur-xl border border-gold-500/10">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] text-warm-50/50 uppercase tracking-wider">Order #{order.id.slice(0, 8)}</p>
                          <span className="px-3 py-1 text-[9px] bg-green-500/10 text-green-500/80 border border-green-500/20 uppercase tracking-wider">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-warm-50/70">{formatINRDecimal(order.total)}</p>
                        <p className="text-[10px] text-warm-50/50 mt-1 tracking-wide">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-navy-500/80 backdrop-blur-xl border border-gold-500/10"
              >
                <h3 className="text-lg font-serif text-warm-50/90 mb-6 font-medium">Saved Addresses</h3>
                <p className="text-warm-50/40 text-xs font-light">No saved addresses yet.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
