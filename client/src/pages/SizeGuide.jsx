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
  return (
    <div className="pt-20">
      <div className="border-b border-navy-500/8 bg-warm-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Fit Guide</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue-500/90">Size Guide</h1>
            <p className="text-royal-blue-500/40 text-sm mt-4 font-light max-w-xl">
              Find your perfect fit with our detailed measurement guide. All measurements are in centimetres unless noted.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {categories.map((cat, i) => (
          <motion.div key={cat.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <h2 className="text-2xl font-serif text-royal-blue-500/80 font-medium mb-6">{cat.name}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-navy-500/5">
                    {Object.keys(cat.sizes[0]).map((key) => (
                      <th key={key} className="px-6 py-4 text-[10px] text-royal-blue-500/40 uppercase tracking-wider text-left font-medium">
                        {key === 'label' ? 'Size' : key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cat.sizes.map((row, j) => (
                    <tr key={j} className="border-b border-navy-500/8 hover:bg-navy-500/5 transition-colors">
                      {Object.values(row).map((val, k) => (
                        <td key={k} className={`px-6 py-4 text-sm ${k === 0 ? 'text-royal-blue-500/80 font-medium' : 'text-royal-blue-500/50'}`}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gold-500/60 mt-4 italic tracking-wide">{cat.note}</p>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-warm-200 border border-navy-500/10 p-8 text-center">
          <p className="text-sm text-royal-blue-500/60 font-light">
            Still unsure? Our style advisors are happy to help you find the perfect fit.{' '}
            <a href="mailto:concierge@haevn.com" className="text-gold-500/80 hover:text-gold-500 underline underline-offset-4">concierge@haevn.com</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
