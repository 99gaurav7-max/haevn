import { Link } from 'react-router-dom';

const socialLinks = {
  IG: 'https://instagram.com', TW: 'https://twitter.com',
  FB: 'https://facebook.com', YT: 'https://youtube.com',
};

export default function Footer() {
  return (
    <footer className="bg-navy-600 border-t border-gold-500/10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <span className="text-4xl font-serif font-bold gold-gradient-text tracking-[0.15em]">HAEVN</span>
            <p className="mt-6 text-warm-50/60 text-sm leading-relaxed max-w-md font-medium tracking-wide">
              The pinnacle of men's fashion. Every piece in our collection is hand-selected for its 
              exceptional craftsmanship, premium materials, and timeless design. Experience fashion 
              that transcends trends — where elegance meets excellence.
            </p>
            <div className="mt-8 flex space-x-3">
              {['IG', 'TW', 'FB', 'YT'].map((s) => (
                  <a key={s} href={socialLinks[s]} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-gold-500/30 text-warm-50/60 text-[10px] hover:border-gold-500/50 hover:text-gold-500 transition-all duration-500 uppercase tracking-widest font-semibold"
                  aria-label={`Follow us on ${s}`}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-500/80 font-bold mb-8">Categories</h4>
            <ul className="space-y-4">
              {['Headwear', 'Eyewear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <Link to={`/shop/${cat}`} className="text-warm-50/60 hover:text-gold-500 text-sm transition-colors duration-300 font-medium tracking-wide">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-500/80 font-bold mb-8">Support</h4>
            <ul className="space-y-4">
              {['Contact Us', 'Shipping & Returns', 'Size Guide', 'FAQ', 'Care Instructions'].map((label) => (
                <li key={label}>
                  <Link to={`/${label.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`} className="text-warm-50/60 hover:text-gold-500 text-sm transition-colors duration-300 font-medium tracking-wide">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gold-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-50/50 text-[10px] uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} HAEVN. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="text-warm-50/50 text-[10px] uppercase tracking-[0.2em] hover:text-warm-50/80 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-warm-50/50 text-[10px] uppercase tracking-[0.2em] hover:text-warm-50/80 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
