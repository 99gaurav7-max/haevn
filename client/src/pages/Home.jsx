import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineChevronLeft, HiOutlineChevronRight, HiStar, HiShieldCheck, HiTruck, HiRefresh } from 'react-icons/hi';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const heroSlides = [
  {
    title: 'Dress to Command',
    subtitle: 'Curated Luxury for the Modern Gentleman',
    cta: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920',
    align: 'left',
  },
  {
    title: 'From Head to Toe',
    subtitle: 'Every Detail Meticulously Crafted',
    cta: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1920',
    align: 'right',
  },
  {
    title: 'The Art of Luxury',
    subtitle: 'Where Elegance Meets Excellence',
    cta: 'Discover More',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920',
    align: 'center',
  },
];

const categories = [
  { name: 'Headwear', desc: 'Crown your style', image: 'https://images.unsplash.com/photo-1514327605050-0295e3c02d9b?w=600', items: '12 Items' },
  { name: 'Eyewear', desc: 'See the difference', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600', items: '8 Items' },
  { name: 'Tops', desc: 'Define your silhouette', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600', items: '24 Items' },
  { name: 'Bottoms', desc: 'Foundation of style', image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600', items: '18 Items' },
  { name: 'Footwear', desc: 'Step up your game', image: 'https://images.unsplash.com/photo-1614252369475-5f6cb61c0d12?w=600', items: '16 Items' },
  { name: 'Accessories', desc: 'The final touch', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600', items: '32 Items' },
];

const testimonials = [
  { name: 'James R.', text: 'The quality of HAEVN exceeds every expectation. From the packaging to the product itself — pure excellence.', rating: 5, title: 'CEO, Meridian Capital' },
  { name: 'Alexander K.', text: 'Finally, a brand that understands what true luxury means for men. My entire wardrobe is HAEVN now.', rating: 5, title: 'Creative Director' },
  { name: 'Marcus T.', text: 'The attention to detail is remarkable. These pieces don\'t just look good — they feel extraordinary.', rating: 5, title: 'Architect' },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollFeatured = (dir) => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({ left: dir * 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-midnight-900/90 via-midnight-900/60 to-midnight-900/30 z-10" />
            <img src={slide.image} alt="" className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920'; }} />
          </div>
        ))}

        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`max-w-2xl ${
                heroSlides[currentSlide].align === 'right' ? 'ml-auto text-right' :
                heroSlides[currentSlide].align === 'center' ? 'mx-auto text-center' : ''
              }`}
            >
              <p className="text-gold-500 text-sm uppercase tracking-[0.3em] mb-4 font-medium">HAEVN — Premium Collection</p>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-white leading-[1.1]">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg sm:text-xl text-white/60 mt-6 max-w-xl leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex gap-4 mt-10">
                <Link to="/shop" className="btn-primary text-lg px-10 py-4 flex items-center gap-2 group">
                  {heroSlides[currentSlide].cta}
                  <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/shop/Accessories" className="btn-outline text-lg px-10 py-4">
                  Accessories
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 transition-all duration-500 ${
                i === currentSlide ? 'w-12 gold-gradient' : 'w-6 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-white/5 bg-midnight-900/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: HiTruck, title: 'Free Shipping', desc: 'On all orders over ₹20,000' },
              { icon: HiShieldCheck, title: 'Authenticity Guaranteed', desc: '100% genuine luxury products' },
              { icon: HiRefresh, title: '30-Day Returns', desc: 'Hassle-free, no questions asked' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center gold-gradient/20 border border-gold-500/20 flex-shrink-0">
                  <Icon className="text-gold-500 text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">{title}</h4>
                  <p className="text-xs text-white/40">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold-500 text-sm uppercase tracking-[0.3em] mb-3">Categories</p>
            <h2 className="section-title">Shop by Category</h2>
            <div className="divider" />
            <p className="section-subtitle">From head to toe, we have you covered</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/shop/${cat.name}`} className="group block relative h-72 overflow-hidden">
                  <img src={cat.image} alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = `https://placehold.co/600x800/1a1a2e/C9A96E?text=${cat.name}`; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/90 via-midnight-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-1">{cat.items}</p>
                    <h3 className="text-2xl font-serif text-white group-hover:text-gold-500 transition-colors duration-300">{cat.name}</h3>
                    <p className="text-white/50 text-sm mt-1">{cat.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-midnight-900/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-16"
          >
            <div>
              <p className="text-gold-500 text-sm uppercase tracking-[0.3em] mb-3">Editor's Pick</p>
              <h2 className="section-title">Featured Selections</h2>
              <div className="divider mt-4 ml-0" />
            </div>
            <div className="hidden sm:flex space-x-2">
              <button onClick={() => scrollFeatured(-1)}
                className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-500 hover:border-gold-500/50 transition-all">
                <HiOutlineChevronLeft />
              </button>
              <button onClick={() => scrollFeatured(1)}
                className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-500 hover:border-gold-500/50 transition-all">
                <HiOutlineChevronRight />
              </button>
            </div>
          </motion.div>

          <div ref={featuredRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] snap-start">
                  <div className="aspect-[3/4] bg-white/5 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-16 bg-white/5 animate-pulse" />
                    <div className="h-4 w-40 bg-white/5 animate-pulse" />
                    <div className="h-4 w-20 bg-white/5 animate-pulse" />
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
        <section className="py-24">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-gold-500 text-sm uppercase tracking-[0.3em] mb-3">Fresh Collection</p>
              <h2 className="section-title">New Arrivals</h2>
              <div className="divider" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/shop?new=true" className="btn-outline inline-flex items-center gap-2 group">
                View All New Arrivals
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Banner */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1920" alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920'; }} />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-900/90 via-midnight-900/70 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <p className="text-gold-500 text-sm uppercase tracking-[0.3em] mb-4">The HAEVN Standard</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
                Luxury Defined.<br />Style Refined.
              </h2>
              <p className="text-white/60 mt-6 text-lg leading-relaxed">
                Every piece in our collection is hand-selected for its exceptional craftsmanship,
                premium materials, and timeless design. Experience fashion that transcends trends.
              </p>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2 mt-8 group text-lg px-10 py-4">
                Explore the Collection
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-midnight-900/30">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold-500 text-sm uppercase tracking-[0.3em] mb-3">Testimonials</p>
            <h2 className="section-title">What Our Clients Say</h2>
            <div className="divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/[0.02] border border-white/[0.06] relative"
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <HiStar key={j} className="text-gold-500 text-lg" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs mt-1">{t.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold-500 text-sm uppercase tracking-[0.3em] mb-3">Stay Connected</p>
            <h2 className="section-title">Join the Inner Circle</h2>
            <div className="divider" />
            <p className="text-white/50 mt-4 mb-8">
              Be the first to know about exclusive drops, private sales, and curated style guides.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email"
                className="input-field flex-1 text-center sm:text-left" />
              <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
