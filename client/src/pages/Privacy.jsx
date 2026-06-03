import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Privacy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-20">
      <div className="bg-[#0D0D1A] border-b border-gold-500/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Legal</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold gold-gradient-text" style={{textShadow:'0 0 30px rgba(201,169,110,0.3)'}}>Privacy Policy</h1>
            <p className="text-gold-500/80 text-xs mt-4 font-light tracking-wide" style={{textShadow:'0 0 12px rgba(201,169,110,0.15)'}}>Last updated: June 2026</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {[
            { title: '1. Information We Collect', content: 'We collect information you provide directly: name, email address, shipping address, phone number, and payment details when you place an order or create an account. We also automatically collect certain technical data including IP address, browser type, device information, and browsing behaviour on our site through cookies and similar technologies.' },
            { title: '2. How We Use Your Information', content: 'We use your data to process and fulfil orders, communicate order status and updates, provide customer support, personalise your shopping experience, send marketing communications (with your consent), improve our website and services, and detect and prevent fraudulent transactions.' },
            { title: '3. Data Sharing & Disclosure', content: 'We do not sell your personal information. We may share data with trusted third-party service providers who assist in payment processing, shipping and delivery, email communications, and analytics. These providers are contractually bound to protect your data and use it only for the services they perform on our behalf.' },
            { title: '4. Data Security', content: 'We implement industry-standard security measures including 256-bit SSL encryption, secure tokenisation of payment data, and regular security audits. Your account is protected by your password — we recommend using a strong, unique password for your HAEVN account.' },
            { title: '5. Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time. You may opt out of marketing communications, disable non-essential cookies, and request a copy of the data we hold about you. To exercise these rights, contact us at privacy@haevn.com.' },
            { title: '6. Contact', content: 'For privacy-related enquiries, write to us at HAEVN House, Bandra Kurla Complex, Mumbai — 400051 or email privacy@haevn.com.' },
          ].map(({ title, content }, i) => (
            <motion.section key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white border border-navy-500/10 p-10 shadow-lg shadow-black/5">
              <h2 className="text-xl font-serif text-royal-blue-500/90 font-semibold mb-4">{title}</h2>
              <p className="text-sm text-royal-blue-500/55 leading-relaxed font-light">{content}</p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
