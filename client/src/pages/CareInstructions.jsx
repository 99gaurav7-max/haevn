import { motion } from 'framer-motion';
import { HiOutlineEmojiHappy, HiOutlineSparkles, HiOutlineColorSwatch, HiOutlineShieldCheck } from 'react-icons/hi';

const careGuides = [
  {
    icon: HiOutlineEmojiHappy,
    title: 'General Care',
    items: [
      'Always check the care label inside your garment before washing.',
      'Sort by colour — wash dark and light garments separately to prevent colour transfer.',
      'Turn garments inside out before washing to protect prints, embellishments, and fabric finish.',
      'Use a mild, pH-neutral detergent. Avoid bleach and fabric softeners on premium fabrics.',
    ],
  },
  {
    icon: HiOutlineSparkles,
    title: 'Washing & Drying',
    items: [
      'Hand wash or machine wash on a gentle cycle with cold water (30°C max).',
      'Do not wring or twist — gently press out excess water instead.',
      'Dry flat on a clean towel away from direct sunlight. Avoid tumble drying.',
      'Iron on the reverse side at the temperature appropriate for the fabric: cotton (high), polyester (medium), silk (low).',
    ],
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'Fabric-Specific',
    items: [
      'Cotton & Linen: Machine washable, may shrink slightly on first wash. Iron while damp for best results.',
      'Silk: Dry clean only. If hand washing, use a silk-specific shampoo and cold water.',
      'Wool & Cashmere: Hand wash in cold water with wool detergent. Dry flat — never hang.',
      'Synthetics (Polyester, Nylon): Machine wash gentle, low heat iron. Avoid high heat drying.',
      'Leather & Suede: Professional clean only. Store in a breathable dust bag away from heat.',
    ],
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Storage & Longevity',
    items: [
      'Store in a cool, dry place away from direct sunlight to prevent fading.',
      'Use padded hangers for jackets, blazers, and coats. Fold knits and heavy sweaters to prevent stretching.',
      'Keep shoes in their original dust bags and stuff with tissue paper to retain shape.',
      'Use a cedar block or lavender sachet in your wardrobe to deter moths naturally.',
      'Rotate your wardrobe regularly — garments last longer when given rest between wears.',
    ],
  },
];

export default function CareInstructions() {
  return (
    <div className="pt-20">
      <div className="border-b border-navy-500/8 bg-warm-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Maintenance</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue-500/90">Care Instructions</h1>
            <p className="text-royal-blue-500/40 text-sm mt-4 font-light max-w-xl">
              Preserve the beauty and longevity of your HAEVN pieces with proper care. Follow these guidelines to keep every garment looking its finest.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careGuides.map(({ icon: Icon, title, items }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-navy-500/10 p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-gold-500/10"><Icon className="text-gold-500/80 text-xl" /></div>
                <h2 className="text-lg font-serif text-royal-blue-500/80 font-medium">{title}</h2>
              </div>
              <ul className="space-y-3">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-royal-blue-500/55 leading-relaxed font-light">
                    <span className="text-gold-500/50 mt-1.5 w-1 h-1 bg-gold-500/60 rounded-full flex-shrink-0" />
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
