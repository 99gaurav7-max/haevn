import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-midnight-900 border-t border-white/5">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <span className="text-3xl font-serif font-bold gold-gradient bg-clip-text text-transparent">HAEVN</span>
            <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-md">
              Curating the finest men's fashion from head to toe. Every piece selected for the
              discerning gentleman who demands nothing but the best. Luxury isn't just what you wear —
              it's who you are.
            </p>
            <div className="mt-6 flex space-x-4">
              {['IG', 'TW', 'FB', 'YT'].map((s) => (
                <span key={s} className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 text-xs hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300 cursor-pointer">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-gold-500 font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              {['Headwear', 'Eyewear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <Link to={`/shop/${cat}`} className="text-white/40 hover:text-gold-500 text-sm transition-colors duration-200">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-gold-500 font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping & Returns', 'Size Guide', 'FAQ', 'Care Instructions'].map((label) => (
                <li key={label}>
                  <span className="text-white/40 hover:text-gold-500 text-sm transition-colors duration-200 cursor-pointer">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">&copy; 2024 HAEVN. All rights reserved. Premium Men's Fashion.</p>
          <div className="flex space-x-6">
            <span className="text-white/30 text-xs hover:text-white/50 cursor-pointer">Privacy Policy</span>
            <span className="text-white/30 text-xs hover:text-white/50 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
