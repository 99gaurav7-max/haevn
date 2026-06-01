import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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

export default function Shop() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const onSale = searchParams.get('onSale') === 'true';
  const isNew = searchParams.get('new') === 'true';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        if (search) params.search = search;
        if (sort) params.sort = sort;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (onSale) params.onSale = 'true';
        if (isNew) params.new = 'true';

        const { data } = await productAPI.getAll(params);
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search, sort, minPrice, maxPrice, onSale, isNew]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters = search || sort || minPrice || maxPrice || onSale || isNew;

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-warm-200 border-b border-navy-500/8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">
              {category || (search ? 'Search Results' : 'The Collection')}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-royal-blue-500/90">
              {category || (search ? `"${search}"` : 'All Products')}
            </h1>
            {search && (
              <p className="text-royal-blue-500/30 text-sm mt-3 font-light">{products.length} results found</p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-10">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Sort By</h4>
                <select
                  value={sort}
                  onChange={(e) => updateParam('sort', e.target.value)}
                  className="input-field text-xs"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-warm-50">{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={minPrice}
                    onChange={(e) => updateParam('minPrice', e.target.value)}
                    className="input-field text-xs w-full" />
                  <span className="text-royal-blue-500/20">—</span>
                  <input type="number" placeholder="Max" value={maxPrice}
                    onChange={(e) => updateParam('maxPrice', e.target.value)}
                    className="input-field text-xs w-full" />
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Filters</h4>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={onSale}
                      onChange={(e) => updateParam('onSale', e.target.checked ? 'true' : '')}
                      className="w-4 h-4 accent-gold-500" />
                    <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80 transition-colors">On Sale</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={isNew}
                      onChange={(e) => updateParam('new', e.target.checked ? 'true' : '')}
                      className="w-4 h-4 accent-gold-500" />
                    <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80 transition-colors">New Arrivals</span>
                  </label>
                </div>
              </div>

              {hasFilters && (
                <button onClick={clearFilters}
                  className="text-xs text-gold-500/70 hover:text-gold-500 transition-colors flex items-center gap-1">
                  <HiOutlineX className="text-sm" /> Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-navy-500/8">
              <p className="text-xs text-royal-blue-500/30 tracking-wide">
                <span className="text-royal-blue-500/70">{products.length}</span> Products
              </p>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex border border-navy-500/10">
                  <button onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'text-gold-500 bg-navy-500/5' : 'text-royal-blue-500/30 hover:text-royal-blue-500/60'}`}>
                    <HiOutlineViewGrid />
                  </button>
                  <button onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'text-gold-500 bg-navy-500/5' : 'text-royal-blue-500/30 hover:text-royal-blue-500/60'}`}>
                    <HiOutlineViewList />
                  </button>
                </div>
                <button onClick={() => setFilterOpen(!filterOpen)}
                  className="lg:hidden btn-ghost flex items-center gap-2 text-xs uppercase tracking-[0.15em]">
                  <HiOutlineAdjustments /> Filters
                </button>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="aspect-[3/4] bg-navy-500/5 animate-pulse" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 w-16 bg-navy-500/5 animate-pulse" />
                      <div className="h-4 w-40 bg-navy-500/5 animate-pulse" />
                      <div className="h-4 w-20 bg-navy-500/5 animate-pulse" />
                    </div>
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
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-500/70 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-80 bg-warm-100 border-r border-navy-500/10 z-50 lg:hidden p-8 pt-24 overflow-y-auto"
            >
              <button onClick={() => setFilterOpen(false)}
                className="absolute top-6 right-6 text-royal-blue-500/30 hover:text-gold-500 transition-colors">
                <HiOutlineX className="text-xl" />
              </button>
              <h3 className="text-lg font-serif text-royal-blue-500/80 mb-8 font-medium">Filters</h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Sort By</h4>
                  <select value={sort}
                    onChange={(e) => updateParam('sort', e.target.value)}
                    className="input-field text-xs">
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-warm-50">{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" value={minPrice}
                      onChange={(e) => updateParam('minPrice', e.target.value)}
                      className="input-field text-xs w-full" />
                    <span className="text-royal-blue-500/20">—</span>
                    <input type="number" placeholder="Max" value={maxPrice}
                      onChange={(e) => updateParam('maxPrice', e.target.value)}
                      className="input-field text-xs w-full" />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer group mb-4">
                    <input type="checkbox" checked={onSale}
                      onChange={(e) => updateParam('onSale', e.target.checked ? 'true' : '')}
                      className="w-4 h-4 accent-gold-500" />
                    <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80">On Sale</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={isNew}
                      onChange={(e) => updateParam('new', e.target.checked ? 'true' : '')}
                      className="w-4 h-4 accent-gold-500" />
                    <span className="text-xs text-royal-blue-500/50 group-hover:text-royal-blue-500/80">New Arrivals</span>
                  </label>
                </div>

                <button onClick={clearFilters}
                  className="text-xs text-gold-500/70 hover:text-gold-500 transition-colors flex items-center gap-1">
                  <HiOutlineX /> Clear filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
