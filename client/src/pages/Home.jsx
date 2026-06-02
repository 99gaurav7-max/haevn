import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineChevronLeft, HiOutlineChevronRight, HiShieldCheck, HiTruck, HiRefresh } from 'react-icons/hi';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const heroSlides = [
  {
    title: 'The Pursuit of Excellence',
    subtitle: 'Where Discipline Meets Distinction',
    quote: '— Excellence is not a skill. It is an attitude. —',
    cta: 'Explore Performance',
    image: 'https://unsplash.com/photos/Ed2NUyrUwmI/download?force=true&w=1920&h=1080&fit=crop',
    align: 'left',
    pos: 'center 45%',
    link: '/shop?category=Footwear',
  },
  {
    title: 'Architect of Success',
    subtitle: 'Impeccable Tailoring for Those Who Command the Room',
    quote: '— Dress for the position you want, not the one you have. —',
    cta: 'Discover Formal',
    image: 'https://unsplash.com/photos/gpBchDCXVlU/download?force=true&w=1920&h=1080&fit=crop',
    align: 'right',
    pos: 'center 40%',
    link: '/shop?category=Tops',
  },
  {
    title: 'Effortless Refinement',
    subtitle: 'Luxury Casual for Life\'s Unscripted Moments',
    quote: '— Style is a way to say who you are without having to speak. —',
    cta: 'Shop Casual',
    image: 'https://unsplash.com/photos/36vvo7t_7y4/download?force=true&w=1920&h=1080&fit=crop',
    align: 'left',
    pos: 'center 35%',
    link: '/shop?category=Tops',
  },
  {
    title: 'The New Guard',
    subtitle: 'Bold Ambition. Fearless Style.',
    quote: '— Youth is the spirit of adventure waking up. —',
    cta: 'Shop Youth Collection',
    image: 'https://unsplash.com/photos/DZhSsCoeNGo/download?force=true&w=1920&h=1080&fit=crop',
    align: 'right',
    pos: 'center 45%',
    link: '/shop',
  },
  {
    title: 'A Life Well Lived',
    subtitle: 'Timeless Elegance for the Distinguished Gentleman',
    quote: '— Wisdom wears its years with grace. —',
    cta: 'Explore Heritage',
    image: 'https://unsplash.com/photos/FML0kjSSmQc/download?force=true&w=1920&h=1080&fit=crop',
    align: 'left',
    pos: 'center 40%',
    link: '/shop',
  },
];

const categories = [
  { name: 'Headwear', desc: 'Crown your style', image: 'https://unsplash.com/photos/t8HiP3e5abg/download?force=true&w=600&h=800&fit=crop', items: '12 Items' },
  { name: 'Eyewear', desc: 'See the difference', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=800&fit=crop', items: '8 Items' },
  { name: 'Tops', desc: 'Define your silhouette', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop', items: '24 Items' },
  { name: 'Bottoms', desc: 'Foundation of style', image: 'https://unsplash.com/photos/d54wbtjedog/download?force=true&w=600&h=800&fit=crop', items: '18 Items' },
  { name: 'Footwear', desc: 'Step up your game', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop', items: '16 Items' },
  { name: 'Accessories', desc: 'The final touch', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop', items: '32 Items' },
];



export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, newRes] = await Promise.all([
          productAPI.getAll({ featured: 'true', _t: Date.now() }),
          productAPI.getAll({ new: 'true', _t: Date.now() }),
        ]);
        setFeatured(featuredRes.data.products || []);
        setNewArrivals(newRes.data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const scrollFeatured = (dir) => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({ left: dir * 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] lg:h-screen lg:min-h-[700px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        {heroSlides.map((slide, i) => {
          const gradDir = slide.align === 'right' ? 'to left' : 'to right';
              const gradBase = slide.align === 'center'
            ? 'rgba(13,13,26,0.65) 0%, rgba(201,169,110,0.35) 30%, rgba(201,169,110,0.35) 70%, rgba(13,13,26,0.65) 100%'
            : slide.align === 'right'
              ? 'rgba(13,13,26,0.78) 0%, rgba(201,169,110,0.30) 40%, rgba(201,169,110,0.08) 70%, transparent 100%'
              : 'rgba(13,13,26,0.78) 0%, rgba(201,169,110,0.30) 40%, rgba(201,169,110,0.08) 70%, transparent 100%';
          return (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-1500 ease-out ${
                i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <div className="absolute inset-0 z-10"
                style={{
                    background: `
                    linear-gradient(to top, rgba(13,13,26,0.92) 0%, rgba(13,13,26,0.65) 25%, rgba(201,169,110,0.20) 45%, transparent 68%),
                    linear-gradient(${gradDir}, ${gradBase})
                  `
                }}
              />
              <img src={slide.image} alt="" loading={i === 0 ? 'eager' : 'lazy'} className="w-full h-full object-cover"
                style={{ objectPosition: slide.pos || 'center' }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920'; }} />
            </div>
          );
        })}

        <div className="relative z-20 h-full flex items-end sm:items-center pb-20 sm:pb-0">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`max-w-xl lg:max-w-2xl ${
                heroSlides[currentSlide].align === 'right' ? 'ml-auto text-right' :
                heroSlides[currentSlide].align === 'center' ? 'mx-auto text-center' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="h-px w-8 sm:w-12 gold-gradient" />
                <p className="text-gold-500/80 text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium">HAEVN Premium Collection</p>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-warm-50 leading-[1.05] tracking-tight" style={{textShadow:'0 2px 12px rgba(0,0,0,0.5)'}}>
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-warm-50/90 mt-3 sm:mt-6 max-w-xl leading-relaxed font-medium tracking-wide" style={{textShadow:'0 2px 10px rgba(0,0,0,0.6)'}}>
                {heroSlides[currentSlide].subtitle}
              </p>
              <p className="text-xs sm:text-sm text-gold-400 mt-4 italic font-semibold tracking-wider" style={{textShadow:'0 2px 8px rgba(0,0,0,0.5)'}}>
                {heroSlides[currentSlide].quote}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-10">
                <Link to={heroSlides[currentSlide].link || '/shop'}
                  className="btn-primary text-xs sm:text-sm px-6 sm:px-10 py-3 sm:py-4 flex items-center justify-center gap-2 group tracking-[0.2em]">
                  {heroSlides[currentSlide].cta}
                  <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform hidden sm:inline" />
                </Link>
                <Link to="/shop"
                  className="btn-outline text-xs sm:text-sm px-6 sm:px-10 py-3 sm:py-4 tracking-[0.2em] text-center">
                  All Collections
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 sm:gap-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-500 ${
                i === currentSlide ? 'w-10 sm:w-16 h-[2px] gold-gradient' : 'w-5 sm:w-8 h-[1px] bg-warm-50/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-navy-500/8 bg-warm-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: HiTruck, title: 'Free Shipping', desc: 'On all orders over â‚¹20,000' },
              { icon: HiShieldCheck, title: 'Authenticity Guaranteed', desc: '100% genuine luxury products' },
              { icon: HiRefresh, title: '30-Day Returns', desc: 'Hassle-free, no questions asked' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gold-500/10 border border-gold-500/20 flex-shrink-0">
                  <Icon className="text-gold-500/80 text-xl" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-royal-blue-500/80 font-medium">{title}</h4>
                  <p className="text-[10px] text-royal-blue-500/40 mt-1 tracking-wide">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-28 section-premium">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-4 font-medium">Categories</p>
            <h2 className="section-title">Shop by Category</h2>
            <div className="crown-divider" />
            <p className="section-subtitle">From head to toe, we have you covered</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link to={`/shop/${cat.name}`} className="group block relative h-80 overflow-hidden">
                  <img src={cat.image} alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = `https://placehold.co/600x800/1a1a2e/C9A96E?text=${cat.name}`; }} />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A]/60 via-gold-500/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-gold-500/60 text-[9px] uppercase tracking-[0.25em] mb-2 font-medium">{cat.items}</p>
                    <h3 className="text-3xl font-serif text-warm-50/90 group-hover:text-gold-500 transition-colors duration-300">{cat.name}</h3>
                    <p className="text-warm-50/60 text-sm mt-2 font-light tracking-wide">{cat.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-28 section-premium">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-16"
          >
            <div>
              <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-4 font-medium">Editor's Pick</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue-500/90">Featured Selections</h2>
              <div className="divider-left mt-4" />
            </div>
            <div className="hidden sm:flex space-x-2">
              <button onClick={() => scrollFeatured(-1)}
                className="w-12 h-12 border border-navy-500/10 flex items-center justify-center text-royal-blue-500/30 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300">
                <HiOutlineChevronLeft />
              </button>
              <button onClick={() => scrollFeatured(1)}
                className="w-12 h-12 border border-navy-500/10 flex items-center justify-center text-royal-blue-500/30 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300">
                <HiOutlineChevronRight />
              </button>
            </div>
          </motion.div>

          <div ref={featuredRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] snap-start">
                  <div className="aspect-[3/4] bg-navy-500/5 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-16 bg-navy-500/5 animate-pulse" />
                    <div className="h-4 w-40 bg-navy-500/5 animate-pulse" />
                    <div className="h-4 w-20 bg-navy-500/5 animate-pulse" />
                  </div>
                </div>
              ))
            ) : (
              featured.map((product, i) => (
                <div key={product.id} className="flex-shrink-0 w-[280px] snap-start">
                  <ProductCard product={product} index={i} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-28">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-4 font-medium">Fresh Collection</p>
              <h2 className="section-title">New Arrivals</h2>
              <div className="crown-divider" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/shop?new=true" className="btn-outline inline-flex items-center gap-2 group text-sm tracking-[0.2em]">
                View All New Arrivals
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Banner */}
      <section className="relative h-[550px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1920" alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920'; }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D1A]/70 via-[#0D0D1A]/40 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-5 font-medium">The HAEVN Standard</p>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-warm-50/95 leading-tight animate-text-sparkle">
                Luxury Defined.<br />Style Refined.
              </h2>
              <p className="text-warm-50/55 mt-6 text-lg leading-relaxed font-light tracking-wide animate-text-glow-pulse">
                Every piece in our collection is hand-selected for its exceptional craftsmanship,
                premium materials, and timeless design. Experience fashion that transcends trends.
              </p>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2 mt-8 text-sm px-10 py-4 tracking-[0.2em]">
                Explore the Collection
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Newsletter */}
      <section className="py-28 border-t border-navy-500/8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-4 font-medium">Stay Connected</p>
            <h2 className="section-title">Join the Inner Circle</h2>
            <div className="crown-divider" />
            <p className="text-royal-blue-500/40 mt-6 mb-10 text-sm font-light tracking-wide max-w-md mx-auto">
              Be the first to know about exclusive drops, private sales, and curated style guides.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.elements[0].value.trim();
              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setNewsletterStatus('error');
                return;
              }
              setNewsletterStatus('success');
              e.target.reset();
              setTimeout(() => setNewsletterStatus(null), 4000);
            }} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email"
                className="input-field flex-1 text-center sm:text-left text-sm" />
              <button type="submit" className="btn-primary whitespace-nowrap text-sm tracking-[0.2em] px-10">Subscribe</button>
            </form>
            {newsletterStatus === 'success' && (
              <p className="text-green-400 text-xs mt-4 tracking-wide">Thank you! You've been subscribed.</p>
            )}
            {newsletterStatus === 'error' && (
              <p className="text-red-400 text-xs mt-4 tracking-wide">Please enter a valid email address.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
