import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMinus, HiOutlinePlus, HiOutlineShoppingBag, HiOutlineHeart, HiStar, HiShieldCheck, HiTruck, HiRefresh } from 'react-icons/hi';
import { productAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { formatINR, formatINRDecimal } from '../utils/currency';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await productAPI.getById(id);
        setProduct(data.product);
        setRelated(data.related || []);
        if (data.product) {
          setSelectedSize(data.product.sizes[0]);
          setSelectedColor(data.product.colors[0]);
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="pt-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-navy-500/5 animate-pulse" />
            <div className="space-y-6">
              <div className="h-4 w-24 bg-navy-500/5 animate-pulse" />
              <div className="h-10 w-3/4 bg-navy-500/5 animate-pulse" />
              <div className="h-6 w-32 bg-navy-500/5 animate-pulse" />
              <div className="h-24 bg-navy-500/5 animate-pulse" />
              <div className="h-12 bg-navy-500/5 animate-pulse" />
              <div className="h-12 bg-navy-500/5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20">
        <div className="max-w-8xl mx-auto px-4 py-20 text-center">
          <p className="text-royal-blue-500/40 text-lg font-light">Product not found</p>
          <Link to="/shop" className="btn-outline mt-6 inline-block text-sm tracking-[0.2em]">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-navy-500/8 bg-warm-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-[10px] text-royal-blue-500/30 tracking-wide">
            <Link to="/" className="hover:text-gold-500/80 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-gold-500/80 transition-colors">Shop</Link>
            <span>/</span>
            <Link to={`/shop/${product.category}`} className="hover:text-gold-500/80 transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-royal-blue-500/50">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-warm-200 overflow-hidden relative group">
              <img src={product.images[0]} alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = `https://placehold.co/800x800/1a1a2e/C9A96E?text=${encodeURIComponent(product.name.substring(0, 20))}`; }} />
              {product.onSale && (
                <div className="absolute top-4 left-4 badge-sale">
                  Sale
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-warm-200 overflow-hidden cursor-pointer border border-transparent hover:border-gold-500/40 transition-colors">
                  <img src={product.images[i] || product.images[0]} alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-gold-500/70 text-[10px] uppercase tracking-[0.3em] font-medium mb-3">{product.subcategory}</p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-royal-blue-500/90">{product.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-gold-500/80' : 'text-royal-blue-500/10'}`} />
                  ))}
                </div>
                <span className="text-royal-blue-500/30 text-xs tracking-wide">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-serif text-gold-500/90 font-bold">{formatINR(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-royal-blue-500/20 line-through">{formatINR(product.originalPrice)}</span>
                  <span className="text-xs text-red-400/80 font-medium">
                    Save {formatINR(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="text-royal-blue-500/50 leading-relaxed text-sm font-light tracking-wide">{product.description}</p>

            {/* Size */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-3">
                Size <span className="text-royal-blue-500/20 normal-case font-light">— {selectedSize}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 text-xs border transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                        : 'border-navy-500/15 text-royal-blue-500/40 hover:border-navy-500/30 hover:text-royal-blue-500/70'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-3">
                Color <span className="text-royal-blue-500/20 normal-case font-light">— {selectedColor}</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative px-5 py-2.5 text-xs border transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                        : 'border-navy-500/15 text-royal-blue-500/40 hover:border-navy-500/30 hover:text-royal-blue-500/70'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-3">Quantity</h4>
              <div className="flex items-center border border-navy-500/15 w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-royal-blue-500/30 hover:text-royal-blue-500/70 transition-colors">
                  <HiOutlineMinus />
                </button>
                <span className="px-6 py-3 text-royal-blue-500/70 border-x border-navy-500/15 min-w-[3rem] text-center text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-royal-blue-500/30 hover:text-royal-blue-500/70 transition-colors">
                  <HiOutlinePlus />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button onClick={handleBuyNow}
                className="btn-primary flex-1 flex items-center justify-center gap-2 text-xs py-4 tracking-[0.2em]">
                Buy Now
              </button>
              <button onClick={handleAddToCart}
                className={`btn-outline flex-1 flex items-center justify-center gap-2 text-xs py-4 tracking-[0.2em] transition-all ${
                  addedToCart ? 'bg-green-500/10 border-green-500/50 text-green-600' : ''
                }`}>
                <HiOutlineShoppingBag />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
              <button className="w-14 h-14 border border-navy-500/15 flex items-center justify-center text-royal-blue-500/30 hover:text-red-400/70 hover:border-red-400/40 transition-all duration-300">
                <HiOutlineHeart className="text-xl" />
              </button>
            </div>

            {/* Details */}
            <div className="pt-6 border-t border-navy-500/8">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold-500/70 font-semibold mb-4">Product Details</h4>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="text-royal-blue-500/40 text-xs flex items-start gap-2 font-light tracking-wide">
                    <span className="text-gold-500/60 mt-1">—</span> {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { icon: HiTruck, text: 'Free Shipping', sub: 'On orders over ₹20,000' },
                { icon: HiShieldCheck, text: 'Authenticity Guarantee', sub: '100% genuine' },
                { icon: HiRefresh, text: '30-Day Returns', sub: 'Hassle-free' },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex items-center gap-3 p-4 bg-white border border-navy-500/10">
                  <Icon className="text-gold-500/70 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-medium text-royal-blue-500/60 uppercase tracking-wider">{text}</p>
                    <p className="text-[9px] text-royal-blue-500/30 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 border-t border-navy-500/8">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-serif text-royal-blue-500/80">Complete the Look</h2>
              <div className="divider-left mt-4" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
