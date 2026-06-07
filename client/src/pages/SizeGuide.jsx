import { useEffect } from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Headwear',
    sizes: [
      { label: 'S', head: '54 cm', uk: '6¾' },
      { label: 'M', head: '56 cm', uk: '7' },
      { label: 'L', head: '58 cm', uk: '7¼' },
      { label: 'XL', head: '60 cm', uk: '7½' },
    ],
    note: 'Measure around the widest part of your head, just above the ears.',
  },
  {
    name: 'Eyewear',
    sizes: [
      { label: 'S', lens: '48 mm', bridge: '18 mm', temple: '140 mm' },
      { label: 'M', lens: '50 mm', bridge: '20 mm', temple: '145 mm' },
      { label: 'L', lens: '52 mm', bridge: '22 mm', temple: '150 mm' },
    ],
    note: 'Lens width is the key measurement. Check the inner arm of your current frames for reference.',
  },
  {
    name: 'Tops',
    sizes: [
      { label: 'XS', chest: '86–91 cm', waist: '71–76 cm', length: '66 cm' },
      { label: 'S', chest: '91–97 cm', waist: '76–81 cm', length: '68 cm' },
      { label: 'M', chest: '97–102 cm', waist: '81–86 cm', length: '70 cm' },
      { label: 'L', chest: '102–107 cm', waist: '86–91 cm', length: '72 cm' },
      { label: 'XL', chest: '107–112 cm', waist: '91–97 cm', length: '74 cm' },
    ],
    note: 'Measure around the fullest part of your chest, keeping the tape horizontal.',
  },
  {
    name: 'Bottoms',
    sizes: [
      { label: 'XS', waist: '71–76 cm', hip: '86–91 cm', inseam: '76 cm' },
      { label: 'S', waist: '76–81 cm', hip: '91–97 cm', inseam: '78 cm' },
      { label: 'M', waist: '81–86 cm', hip: '97–102 cm', inseam: '80 cm' },
      { label: 'L', waist: '86–91 cm', hip: '102–107 cm', inseam: '82 cm' },
      { label: 'XL', waist: '91–97 cm', hip: '107–112 cm', inseam: '84 cm' },
    ],
    note: 'Waist measurement should be taken at the narrowest point, hip at the fullest.',
  },
  {
    name: 'Footwear',
    sizes: [
      { label: '7', uk: '7', eu: '41', us: '8' },
      { label: '8', uk: '8', eu: '42', us: '9' },
      { label: '9', uk: '9', eu: '43', us: '10' },
      { label: '10', uk: '10', eu: '44', us: '11' },
      { label: '11', uk: '11', eu: '45', us: '12' },
    ],
    note: 'Measure your foot length from heel to longest toe. Add 0.5 cm for optimal fit.',
  },
];

export default function SizeGuide() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-20">
      <div className="bg-[#0D0D1A] border-b border-gold-500/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Fit Guide</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold gold-gradient-text" style={{textShadow:'0 0 30px rgba(201,169,110,0.3)'}}>Size Guide</h1>
            <p className="text-gold-500/80 text-sm mt-4 font-light max-w-xl tracking-wide" style={{textShadow:'0 0 12px rgba(201,169,110,0.15)'}}>
              Find your perfect fit with our detailed measurement guide. All measurements in centimetres unless noted.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {categories.map((cat, i) => (
          <motion.div key={cat.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 gold-gradient" />
              <h2 className="text-2xl font-serif text-warm-50/90 font-semibold">{cat.name}</h2>
            </div>
            <div className="overflow-x-auto bg-navy-500/80 backdrop-blur-xl border border-gold-500/10">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    {Object.keys(cat.sizes[0]).map((key) => (
                      <th key={key} className="px-6 py-4 text-[10px] text-warm-50/60 uppercase tracking-wider text-left font-semibold">
                        {key === 'label' ? 'Size' : key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cat.sizes.map((row, j) => (
                    <tr key={j} className="border-b border-gold-500/10 hover:bg-gold-500/10 transition-colors duration-200">
                      {Object.values(row).map((val, k) => (
                        <td key={k} className={`px-6 py-4 text-sm ${k === 0 ? 'text-warm-50/80 font-semibold' : 'text-warm-50/50'}`}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gold-500/70 mt-4 italic tracking-wide flex items-center gap-2">
              <span className="w-1 h-1 bg-gold-500/70 rounded-full" />{cat.note}
            </p>
          </motion.div>
        ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-gold-500/5 via-gold-500/10 to-gold-500/5 border border-gold-500/20 p-8 text-center">
          <p className="text-sm text-warm-50/70 font-medium">
            Still unsure? Our style advisors are happy to help you find the perfect fit.{' '}
            <a href="mailto:concierge@haevn.com" className="text-gold-500 hover:text-gold-400 underline underline-offset-4 font-semibold">concierge@haevn.com</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
