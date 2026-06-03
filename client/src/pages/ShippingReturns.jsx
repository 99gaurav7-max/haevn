import { motion } from 'framer-motion';
import { HiOutlineTruck, HiOutlineRefresh, HiOutlineShieldCheck, HiOutlineCurrencyRupee } from 'react-icons/hi';

const policies = [
  {
    icon: HiOutlineTruck,
    title: 'Shipping Policy',
    items: [
      'Free shipping on all orders over Rs.1,000 across India.',
      'Metro cities: 3–5 business days. Other locations: 5–7 business days.',
      'International shipping available to select countries — shipping calculated at checkout.',
      'All orders are shipped via premium courier partners with real-time tracking.',
      'Orders placed before 2:00 PM IST are dispatched the same business day.',
    ],
  },
  {
    icon: HiOutlineRefresh,
    title: 'Returns & Exchanges',
    items: [
      '30-day return window from the date of delivery — no questions asked.',
      'Items must be unworn, unwashed, and with all original tags and packaging.',
      'Footwear and intimate apparel must be tried on indoors only.',
      'Exchange requests are processed within 2–3 business days of receipt.',
      'Refunds are credited to the original payment method within 5–7 business days.',
      'Return shipping is complimentary for domestic orders.',
    ],
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Quality Assurance',
    items: [
      'Every product undergoes a 16-point quality check before dispatch.',
      'HAEVN certifies all items as 100% genuine and authentic.',
      'Defective or incorrect items are replaced immediately at no cost.',
    ],
  },
  {
    icon: HiOutlineCurrencyRupee,
    title: 'Payment & Pricing',
    items: [
      'We accept Visa, Mastercard, RuPay, UPI, Net Banking, and EMI options.',
      'All prices are inclusive of applicable taxes unless stated otherwise.',
      'Price matching is not available on limited-edition and collaboration drops.',
    ],
  },
];

export default function ShippingReturns() {
  return (
    <div className="pt-20">
      <div className="border-b border-navy-500/8 bg-warm-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Information</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue-500/90">Shipping & Returns</h1>
          </motion.div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {policies.map(({ icon: Icon, title, items }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-navy-500/10 p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-gold-500/10"><Icon className="text-gold-500/80 text-xl" /></div>
                <h2 className="text-lg font-serif text-royal-blue-500/80 font-medium">{title}</h2>
              </div>
              <ul className="space-y-3">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-royal-blue-500/60 leading-relaxed">
                    <span className="text-gold-500/60 mt-1.5 w-1 h-1 bg-gold-500/60 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
