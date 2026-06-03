import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-20">
      <div className="bg-[#0D0D1A] border-b border-gold-500/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold gold-gradient-text" style={{textShadow:'0 0 30px rgba(201,169,110,0.3)'}}>Contact Us</h1>
            <p className="text-gold-500/40 text-sm mt-4 font-light max-w-xl tracking-wide">Reach out and experience the HAEVN standard of service.</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-royal-blue-500/70 text-sm leading-relaxed mb-10 font-medium">
              Our concierge team is available around the clock to assist with orders, styling advice, and any enquiries.
            </p>
            <div className="space-y-8 bg-white border border-navy-500/10 p-10">
              {[
                { icon: HiOutlineMail, label: 'Email', value: 'concierge@haevn.com' },
                { icon: HiOutlinePhone, label: 'Phone', value: '+91 1800 123 HAEVN' },
                { icon: HiOutlineLocationMarker, label: 'Flagship Store', value: 'HAEVN House, Bandra Kurla Complex, Mumbai — 400051' },
                { icon: HiOutlineClock, label: 'Hours', value: 'Mon — Sat: 10:00 AM – 8:00 PM | Sun: 12:00 PM – 6:00 PM' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold-500/10 border border-gold-500/20 flex-shrink-0 group-hover:bg-gold-500/20 transition-colors duration-300">
                    <Icon className="text-gold-500/80 text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] text-royal-blue-500/30 uppercase tracking-[0.2em] mb-1 font-medium">{label}</p>
                    <p className="text-sm text-royal-blue-500/80 font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="space-y-6 bg-white border border-navy-500/10 p-10 shadow-xl shadow-black/5">
            <h3 className="text-lg font-serif text-royal-blue-500/90 font-semibold">Send a Message</h3>
            <input type="text" placeholder="Your Name" className="input-field w-full text-sm" />
            <input type="email" placeholder="Your Email" className="input-field w-full text-sm" />
            <select className="input-field w-full text-sm text-royal-blue-500/50">
              <option value="">Select Subject</option>
              <option>Order Enquiry</option>
              <option>Product Question</option>
              <option>Returns & Exchanges</option>
              <option>General Feedback</option>
            </select>
            <textarea rows="5" placeholder="Your Message" className="input-field w-full text-sm resize-none"></textarea>
            <button type="submit" className="btn-primary w-full text-sm tracking-[0.2em] py-4">Send Message</button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
