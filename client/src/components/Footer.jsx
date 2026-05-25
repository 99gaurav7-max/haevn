import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#05050f] border-t border-white/5">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <span className="text-4xl font-serif font-bold gold-gradient-text tracking-[0.15em]">HAEVN</span>
            <p className="mt-6 text-white/30 text-sm leading-relaxed max-w-md font-light tracking-wide">
              The pinnacle of men's fashion. Every piece in our collection is hand-selected for its 
              exceptional craftsmanship, premium materials, and timeless design. Experience fashion 
              that transcends trends — where elegance meets excellence.
            </p>
            <div className="mt-8 flex space-x-3">
              {['IG', 'TW', 'FB', 'YT'].map((s) => (
                <span key={s} className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/30 text-[10px] hover:border-gold-500/50 hover:text-gold-500 transition-all duration-500 cursor-pointer uppercase tracking-widest font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-500/80 font-medium mb-8">Categories</h4>
            <ul className="space-y-4">
              {['Headwear', 'Eyewear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <Link to={`/shop/${cat}`} className="text-white/30 hover:text-gold-500 text-sm transition-colors duration-300 font-light tracking-wide">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-500/80 font-medium mb-8">Support</h4>
            <ul className="space-y-4">
              {['Contact Us', 'Shipping & Returns', 'Size Guide', 'FAQ', 'Care Instructions'].map((label) => (
                <li key={label}>
                  <span className="text-white/30 hover:text-gold-500 text-sm transition-colors duration-300 cursor-pointer font-light tracking-wide">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">&copy; 2024 HAEVN. All rights reserved.</p>
          <div className="flex space-x-8">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.2em] hover:text-white/40 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-white/20 text-[10px] uppercase tracking-[0.2em] hover:text-white/40 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
