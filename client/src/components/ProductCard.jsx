import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineShoppingBag, HiStar } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1);
    const event = new CustomEvent('toggleCart');
    window.dispatchEvent(event);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-white/[0.02] border border-white/[0.06] card-hover overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-midnight-900">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://placehold.co/600x800/1a1a2e/C9A96E?text=${encodeURIComponent(product.name.substring(0, 20))}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.new && (
            <div className="absolute top-3 left-3 px-3 py-1 gold-gradient text-midnight-900 text-[10px] uppercase tracking-widest font-semibold">
              New
            </div>
          )}
          {product.onSale && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-red-500/90 text-white text-[10px] uppercase tracking-widest font-semibold"
              style={{ top: product.new ? '3rem' : '0.75rem' }}>
              Sale
            </div>
          )}

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 space-y-2">
            <button onClick={handleQuickAdd}
              className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:text-midnight-900 transition-all duration-200">
              <HiOutlineShoppingBag className="text-lg" />
            </button>
            <button className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:text-midnight-900 transition-all duration-200">
              <HiOutlineHeart className="text-lg" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center space-x-1">
              <HiStar className="text-gold-500 text-xs" />
              <span className="text-white text-xs">{product.rating}</span>
              <span className="text-white/40 text-xs">({product.reviews})</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold-500/70 mb-1.5 font-medium">{product.subcategory}</p>
          <h3 className="text-sm font-medium text-white group-hover:text-gold-500 transition-colors duration-200 truncate">
            {product.name}
          </h3>
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-gold-500 font-semibold">{formatINR(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-white/30 text-xs line-through">{formatINR(product.originalPrice)}</span>
            )}
          </div>
          <div className="flex items-center mt-2 space-x-1">
            {product.colors.slice(0, 4).map((color) => {
              const c = color.toLowerCase();
              const colorMap = {
                'black': '#111', 'white': '#fff', 'navy': '#1a2744',
                'brown': '#654321', 'tan': '#d2b48c', 'cognac': '#800020',
                'burgundy': '#800020', 'charcoal': '#36454f', 'cream': '#fffdd0',
                'grey': '#808080', 'gray': '#808080', 'olive': '#556b2f',
                'green': '#2e8b57', 'blue': '#4169e1', 'beige': '#f5f5dc',
                'red': '#dc2626', 'gold': '#C9A96E', 'silver': '#c0c0c0',
                'vintage wash': '#6b7b8d', 'raw indigo': '#1a2940',
                'signature': '#C9A96E',
              };
              let bg = colorMap[c] || '#C9A96E';
              if (!colorMap[c]) {
                for (const key of Object.keys(colorMap)) {
                  if (c.includes(key)) { bg = colorMap[key]; break; }
                }
              }
              return (
                <span key={color} className="w-3 h-3 rounded-full border border-white/10"
                  style={{ backgroundColor: bg }}
                />
              );
            })}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-white/30">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
