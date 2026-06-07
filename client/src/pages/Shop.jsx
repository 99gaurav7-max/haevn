import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineAdjustments, HiOutlineX, HiOutlineChevronDown, HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  { value: '', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name: A-Z' },
];

const categorySubcategories = {
  Headwear: ['Hats', 'Caps', 'Beanies'],
  Eyewear: ['Sunglasses', 'Glasses'],
  Tops: ['Shirts', 'Sweaters', 'Blazers', 'Jackets', 'Polos'],
  Bottoms: ['Trousers', 'Jeans', 'Chinos'],
  Footwear: ['Formal Shoes', 'Boots', 'Loafers', 'Sneakers'],
  Accessories: ['Watches', 'Cufflinks', 'Belts', 'Wallets', 'Ties', 'Bracelets', 'Fragrance', 'Rings', 'Bags', 'Chains'],
};

const typePageNames = ['sports', 'formal', 'casual', 'youth', 'heritage'];

const typePages = {
  sports: { label: 'Performance', subtitle: 'Explore our athletic and sportswear collection' },
  formal: { label: 'Formal', subtitle: 'Discover impeccable tailoring for those who command the room' },
  casual: { label: 'Casual', subtitle: 'Luxury casual for life\'s unscripted moments' },
  youth: { label: 'Youth', subtitle: 'Bold ambition. Fearless style for the new guard' },
  heritage: { label: 'Heritage', subtitle: 'Timeless elegance for the distinguished gentleman' },
};

const shopCategories = [
  { name: 'Headwear', desc: 'Crown your style', image: 'https://unsplash.com/photos/t8HiP3e5abg/download?force=true&w=600&h=800&fit=crop', items: '12 Items' },
  { name: 'Eyewear', desc: 'See the difference', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=800&fit=crop', items: '8 Items' },
  { name: 'Tops', desc: 'Define your silhouette', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop', items: '24 Items' },
  { name: 'Bottoms', desc: 'Foundation of style', image: 'https://unsplash.com/photos/d54wbtjedog/download?force=true&w=600&h=800&fit=crop', items: '18 Items' },
  { name: 'Footwear', desc: 'Step up your game', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop', items: '16 Items' },
  { name: 'Accessories', desc: 'The final touch', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop', items: '32 Items' },
];

export default function Shop() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentType = pathSegments.length === 2 && typePageNames.includes(pathSegments[1]) ? pathSegments[1] : null;
  const [products, setProducts] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => { window.scrollTo(0, 0); }, [category, searchParams.toString(), currentType]);

  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const onSale = searchParams.get('onSale') === 'true';
  const isNew = searchParams.get('new') === 'true';
  const activeSubcategory = searchParams.get('subcategory') || '';

  useEffect(() => {
    productAPI.getAll({}).then(({ data }) => {
      setAllSubcategories(data.subcategories || []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category && !currentType) params.category = category;
        if (activeSubcategory) params.subcategory = activeSubcategory;
        if (search) params.search = search;
        if (sort) params.sort = sort;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (onSale) params.onSale = 'true';
        if (isNew) params.new = 'true';
        const { data } = await productAPI.getAll(params);
        setProducts(data.products || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, currentType, activeSubcategory, search, sort, minPrice, maxPrice, onSale, isNew]);

  const updateParam = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) { params.set(key, value); } else { params.delete(key); }
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const clearFilters = () => {
    if (currentType) { setSearchParams({}); } else if (category) { setSearchParams({}); } else { setSearchParams({}); }
  };
  const hasFilters = search || sort || minPrice || maxPrice || onSale || isNew || activeSubcategory;

  const subcategories = category ? (categorySubcategories[category] || []) : [];

  const headerLabel = currentType ? typePages[currentType].label : (category || (search ? 'Search Results' : 'The Collection'));
  const headerTitle = currentType ? typePages[currentType].label : (category || (search ? `"${search}"` : 'All Products'));

  if (currentType) {
    return (
      <div className="pt-20">
        <div className="bg-[#0D0D1A] border-b border-gold-500/10">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">{currentType.charAt(0).toUpperCase() + currentType.slice(1)} Collection</p>
              <h1 className="text-4xl md:text-6xl font-serif font-bold gold-gradient-text" style={{textShadow:'0 0 30px rgba(201,169,110,0.3)'}}>{typePages[currentType].label}</h1>
              <p className="text-gold-500/80 text-sm mt-4 font-light max-w-xl tracking-wide" style={{textShadow:'0 0 12px rgba(201,169,110,0.15)'}}>{typePages[currentType].subtitle}</p>
            </motion.div>
          </div>
        </div>

        <div className="border-b border-navy-500/8 bg-white">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gold-500/60 text-[10px] uppercase tracking-[0.3em] mb-8 font-semibold">Shop by Type</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopCategories.map((cat, i) => (
                  <motion.div key={cat.name} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                    <Link to={`/shop/${cat.name}`} className="group block relative h-72 overflow-hidden">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = `https://placehold.co/600x800/1a1a2e/C9A96E?text=${cat.name}`; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A]/60 via-gold-500/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-gold-500/60 text-[9px] uppercase tracking-[0.25em] mb-1.5 font-medium">{cat.items}</p>
                        <h3 className="text-2xl font-serif text-warm-50/90 group-hover:text-gold-500 transition-colors duration-300">{cat.name}</h3>
                        <p className="text-warm-50/60 text-sm mt-1 font-light tracking-wide">{cat.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-8">
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28 space-y-10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Sort By</h4>
                  <select value={sort} onChange={(e) => updateParam('sort', e.target.value)} className="input-field text-xs">
                    {sortOptions.map((opt) => (<option key={opt.value} value={opt.value} className="bg-warm-50">{opt.label}</option>))}
                  </select>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" value={minPrice} onChange={(e) => updateParam('minPrice', e.target.value)} className="input-field text-xs w-full" />
                    <span className="text-royal-blue-500/20">—</span>
                    <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => updateParam('maxPrice', e.target.value)} className="input-field text-xs w-full" />
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Filters</h4>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={onSale} onChange={(e) => updateParam('onSale', e.target.checked ? 'true' : '')} className="w-4 h-4 accent-gold-500" />
                      <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80 transition-colors">On Sale</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={isNew} onChange={(e) => updateParam('new', e.target.checked ? 'true' : '')} className="w-4 h-4 accent-gold-500" />
                      <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80 transition-colors">New Arrivals</span>
                    </label>
                  </div>
                </div>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-gold-500/70 hover:text-gold-500 transition-colors flex items-center gap-1">
                    <HiOutlineX className="text-sm" /> Clear all filters
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-navy-500/8">
                <p className="text-xs text-royal-blue-500/30 tracking-wide">
                  <span className="text-royal-blue-500/70">{products.length}</span> Products
                </p>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex border border-navy-500/10">
                    <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'text-gold-500 bg-navy-500/5' : 'text-royal-blue-500/30 hover:text-royal-blue-500/60'}`}><HiOutlineViewGrid /></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'text-gold-500 bg-navy-500/5' : 'text-royal-blue-500/30 hover:text-royal-blue-500/60'}`}><HiOutlineViewList /></button>
                  </div>
                  <button onClick={() => setFilterOpen(!filterOpen)} className="lg:hidden btn-ghost flex items-center gap-2 text-xs uppercase tracking-[0.15em]">
                    <HiOutlineAdjustments /> Filters
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i}>
                      <div className="aspect-[3/4] bg-navy-500/5 animate-pulse" />
                      <div className="p-4 space-y-2"><div className="h-3 w-16 bg-navy-500/5 animate-pulse" /><div className="h-4 w-40 bg-navy-500/5 animate-pulse" /><div className="h-4 w-20 bg-navy-500/5 animate-pulse" /></div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-royal-blue-500/40 text-lg font-light">No products found</p>
                  <p className="text-royal-blue-500/20 text-sm mt-2 font-light">Try adjusting your filters</p>
                  <button onClick={clearFilters} className="btn-outline mt-8 text-sm tracking-[0.2em]">Clear Filters</button>
                </div>
              ) : (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {products.map((product, i) => (<ProductCard key={product.id} product={product} index={i} />))}
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {filterOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-500/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setFilterOpen(false)} />
              <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 h-full w-80 bg-warm-100 border-r border-navy-500/10 z-50 lg:hidden p-8 pt-24 overflow-y-auto">
                <button onClick={() => setFilterOpen(false)} className="absolute top-6 right-6 text-royal-blue-500/30 hover:text-gold-500 transition-colors"><HiOutlineX className="text-xl" /></button>
                <h3 className="text-lg font-serif text-royal-blue-500/80 mb-8 font-medium">Filters</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Sort By</h4>
                    <select value={sort} onChange={(e) => updateParam('sort', e.target.value)} className="input-field text-xs">
                      {sortOptions.map((opt) => (<option key={opt.value} value={opt.value} className="bg-warm-50">{opt.label}</option>))}
                    </select>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Price Range</h4>
                    <div className="flex items-center gap-2">
                      <input type="number" placeholder="Min" value={minPrice} onChange={(e) => updateParam('minPrice', e.target.value)} className="input-field text-xs w-full" />
                      <span className="text-royal-blue-500/20">—</span>
                      <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => updateParam('maxPrice', e.target.value)} className="input-field text-xs w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer group mb-4">
                      <input type="checkbox" checked={onSale} onChange={(e) => updateParam('onSale', e.target.checked ? 'true' : '')} className="w-4 h-4 accent-gold-500" />
                      <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80">On Sale</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={isNew} onChange={(e) => updateParam('new', e.target.checked ? 'true' : '')} className="w-4 h-4 accent-gold-500" />
                      <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80">New Arrivals</span>
                    </label>
                  </div>
                  <button onClick={clearFilters} className="text-xs text-gold-500/70 hover:text-gold-500 transition-colors flex items-center gap-1"><HiOutlineX /> Clear filters</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="bg-warm-200 border-b border-navy-500/8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">{headerLabel}</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-royal-blue-500/90">{headerTitle}</h1>
            {search && <p className="text-royal-blue-500/50 text-sm mt-3 font-light">{products.length} results found</p>}
          </motion.div>
        </div>
      </div>

      {category && subcategories.length > 0 && (
        <div className="border-b border-navy-500/8 bg-white">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gold-500/60 text-[10px] uppercase tracking-[0.3em] mb-5 font-semibold">Shop by Type</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => updateParam('subcategory', '')}
                  className={`px-6 py-3 text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 border ${
                    !activeSubcategory ? 'gold-gradient text-[#0a0a1a] border-gold-500/50 shadow-lg shadow-gold-500/20' : 'border-navy-500/10 text-royal-blue-500/50 hover:text-gold-500 hover:border-gold-500/30 bg-transparent'
                  }`}>Shop All</button>
                {subcategories.map((sub) => (
                  <button key={sub} onClick={() => updateParam('subcategory', sub)}
                    className={`px-6 py-3 text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 border ${
                      activeSubcategory === sub ? 'gold-gradient text-[#0a0a1a] border-gold-500/50 shadow-lg shadow-gold-500/20' : 'border-navy-500/10 text-royal-blue-500/50 hover:text-gold-500 hover:border-gold-500/30 bg-transparent'
                    }`}>{sub}</button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-10">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Sort By</h4>
                <select value={sort} onChange={(e) => updateParam('sort', e.target.value)} className="input-field text-xs">
                  {sortOptions.map((opt) => (<option key={opt.value} value={opt.value} className="bg-warm-50">{opt.label}</option>))}
                </select>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={minPrice} onChange={(e) => updateParam('minPrice', e.target.value)} className="input-field text-xs w-full" />
                  <span className="text-royal-blue-500/20">—</span>
                  <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => updateParam('maxPrice', e.target.value)} className="input-field text-xs w-full" />
                </div>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Filters</h4>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={onSale} onChange={(e) => updateParam('onSale', e.target.checked ? 'true' : '')} className="w-4 h-4 accent-gold-500" />
                    <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80 transition-colors">On Sale</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={isNew} onChange={(e) => updateParam('new', e.target.checked ? 'true' : '')} className="w-4 h-4 accent-gold-500" />
                    <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80 transition-colors">New Arrivals</span>
                  </label>
                </div>
              </div>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-gold-500/70 hover:text-gold-500 transition-colors flex items-center gap-1">
                  <HiOutlineX className="text-sm" /> Clear all filters
                </button>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-navy-500/8">
              <p className="text-xs text-royal-blue-500/30 tracking-wide">
                <span className="text-royal-blue-500/70">{products.length}</span> Products
                {activeSubcategory && <span className="text-gold-500/60 ml-2">— {activeSubcategory}</span>}
              </p>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex border border-navy-500/10">
                  <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'text-gold-500 bg-navy-500/5' : 'text-royal-blue-500/30 hover:text-royal-blue-500/60'}`}><HiOutlineViewGrid /></button>
                  <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'text-gold-500 bg-navy-500/5' : 'text-royal-blue-500/30 hover:text-royal-blue-500/60'}`}><HiOutlineViewList /></button>
                </div>
                <button onClick={() => setFilterOpen(!filterOpen)} className="lg:hidden btn-ghost flex items-center gap-2 text-xs uppercase tracking-[0.15em]">
                  <HiOutlineAdjustments /> Filters
                </button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="aspect-[3/4] bg-navy-500/5 animate-pulse" />
                    <div className="p-4 space-y-2"><div className="h-3 w-16 bg-navy-500/5 animate-pulse" /><div className="h-4 w-40 bg-navy-500/5 animate-pulse" /><div className="h-4 w-20 bg-navy-500/5 animate-pulse" /></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-royal-blue-500/40 text-lg font-light">No products found</p>
                <p className="text-royal-blue-500/20 text-sm mt-2 font-light">Try adjusting your filters</p>
                <button onClick={clearFilters} className="btn-outline mt-8 text-sm tracking-[0.2em]">Clear Filters</button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {products.map((product, i) => (<ProductCard key={product.id} product={product} index={i} />))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-500/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setFilterOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 h-full w-80 bg-warm-100 border-r border-navy-500/10 z-50 lg:hidden p-8 pt-24 overflow-y-auto">
              <button onClick={() => setFilterOpen(false)} className="absolute top-6 right-6 text-royal-blue-500/30 hover:text-gold-500 transition-colors"><HiOutlineX className="text-xl" /></button>
              <h3 className="text-lg font-serif text-royal-blue-500/80 mb-8 font-medium">Filters</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Sort By</h4>
                  <select value={sort} onChange={(e) => updateParam('sort', e.target.value)} className="input-field text-xs">
                    {sortOptions.map((opt) => (<option key={opt.value} value={opt.value} className="bg-warm-50">{opt.label}</option>))}
                  </select>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" value={minPrice} onChange={(e) => updateParam('minPrice', e.target.value)} className="input-field text-xs w-full" />
                    <span className="text-royal-blue-500/20">—</span>
                    <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => updateParam('maxPrice', e.target.value)} className="input-field text-xs w-full" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-3 cursor-pointer group mb-4">
                    <input type="checkbox" checked={onSale} onChange={(e) => updateParam('onSale', e.target.checked ? 'true' : '')} className="w-4 h-4 accent-gold-500" />
                    <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80">On Sale</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={isNew} onChange={(e) => updateParam('new', e.target.checked ? 'true' : '')} className="w-4 h-4 accent-gold-500" />
                    <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80">New Arrivals</span>
                  </label>
                </div>
                <button onClick={clearFilters} className="text-xs text-gold-500/70 hover:text-gold-500 transition-colors flex items-center gap-1"><HiOutlineX /> Clear filters</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
