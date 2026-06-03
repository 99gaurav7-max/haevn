import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';

export default function Contact() {
  return (
    <div className="pt-20">
      <div className="border-b border-navy-500/8 bg-warm-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue-500/90">Contact Us</h1>
          </motion.div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-royal-blue-500/60 text-sm leading-relaxed mb-10">
              Our concierge team is available around the clock to assist with orders, styling advice, and any enquiries. Reach out and experience the HAEVN standard of service.
            </p>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <HiOutlineMail className="text-gold-500/80 text-xl mt-0.5" />
                <div>
                  <p className="text-xs text-royal-blue-500/30 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm text-royal-blue-500/80">concierge@haevn.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <HiOutlinePhone className="text-gold-500/80 text-xl mt-0.5" />
                <div>
                  <p className="text-xs text-royal-blue-500/30 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-sm text-royal-blue-500/80">+91 1800 123 HAEVN</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <HiOutlineLocationMarker className="text-gold-500/80 text-xl mt-0.5" />
                <div>
                  <p className="text-xs text-royal-blue-500/30 uppercase tracking-wider mb-1">Flagship Store</p>
                  <p className="text-sm text-royal-blue-500/80">HAEVN House, Bandra Kurla Complex, Mumbai — 400051</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <HiOutlineClock className="text-gold-500/80 text-xl mt-0.5" />
                <div>
                  <p className="text-xs text-royal-blue-500/30 uppercase tracking-wider mb-1">Hours</p>
                  <p className="text-sm text-royal-blue-500/80">Mon — Sat: 10:00 AM – 8:00 PM | Sun: 12:00 PM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="space-y-6 bg-white border border-navy-500/10 p-10">
            <h3 className="text-lg font-serif text-royal-blue-500/80 font-medium">Send a Message</h3>
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
