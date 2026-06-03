import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Terms() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-20">
      <div className="bg-[#0D0D1A] border-b border-gold-500/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Legal</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold gold-gradient-text" style={{textShadow:'0 0 30px rgba(201,169,110,0.3)'}}>Terms of Service</h1>
            <p className="text-gold-500/40 text-xs mt-4 font-light tracking-wide">Last updated: June 2026</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {[
            { title: '1. Acceptance of Terms', content: 'By accessing or using the HAEVN website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the website or use our services. These terms constitute a legally binding agreement between you and HAEVN.' },
            { title: '2. Account Registration', content: 'You must be at least 18 years of age to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update it as necessary.' },
            { title: '3. Orders & Pricing', content: 'All prices are listed in Indian Rupees (INR) and include applicable taxes. We reserve the right to modify prices at any time without prior notice. Order confirmation constitutes acceptance of your offer to purchase. We reserve the right to cancel any order due to pricing errors, stock unavailability, or suspected fraudulent activity.' },
            { title: '4. Payment', content: 'Payment must be made in full at the time of purchase. We accept Visa, Mastercard, RuPay, UPI, Net Banking, and Cash on Delivery on selected orders. By submitting payment information, you represent that you are authorised to use the payment method provided. All transactions are processed through secure, PCI-compliant payment gateways.' },
            { title: '5. Shipping & Delivery', content: 'Shipping and delivery are subject to our Shipping & Returns policy, which is incorporated into these terms by reference. Risk of loss and title for items purchased pass to you upon delivery to the carrier. Estimated delivery times are not guaranteed and may be subject to delays beyond our reasonable control.' },
            { title: '6. Intellectual Property', content: 'All content on this website — including text, images, logos, designs, graphics, and software — is the property of HAEVN and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.' },
            { title: '7. Limitation of Liability', content: 'HAEVN shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or purchase of products. Our total liability in connection with any order shall not exceed the purchase price of the products in that order.' },
            { title: '8. Contact', content: 'For questions about these terms, contact us at legal@haevn.com or write to HAEVN House, Bandra Kurla Complex, Mumbai — 400051.' },
          ].map(({ title, content }, i) => (
            <motion.section key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
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
