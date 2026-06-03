import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="pt-20">
      <div className="border-b border-navy-500/8 bg-warm-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Legal</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue-500/90">Terms of Service</h1>
            <p className="text-royal-blue-500/40 text-xs mt-4 font-light tracking-wide">Last updated: June 2026</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-serif text-royal-blue-500/80 font-medium mb-4">1. Acceptance of Terms</h2>
            <p className="text-sm text-royal-blue-500/55 leading-relaxed font-light">
              By accessing or using the HAEVN website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the website or use our services. These terms constitute a legally binding agreement between you and HAEVN.
            </p>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h2 className="text-xl font-serif text-royal-blue-500/80 font-medium mb-4">2. Account Registration</h2>
            <p className="text-sm text-royal-blue-500/55 leading-relaxed font-light">
              You must be at least 18 years of age to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update it as necessary.
            </p>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xl font-serif text-royal-blue-500/80 font-medium mb-4">3. Orders & Pricing</h2>
            <p className="text-sm text-royal-blue-500/55 leading-relaxed font-light">
              All prices are listed in Indian Rupees (INR) and include applicable taxes. We reserve the right to modify prices at any time without prior notice. Order confirmation constitutes acceptance of your offer to purchase. We reserve the right to cancel any order due to pricing errors, stock unavailability, or suspected fraudulent activity.
            </p>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 className="text-xl font-serif text-royal-blue-500/80 font-medium mb-4">4. Payment</h2>
            <p className="text-sm text-royal-blue-500/55 leading-relaxed font-light">
              Payment must be made in full at the time of purchase. We accept Visa, Mastercard, RuPay, UPI, and Net Banking. By submitting payment information, you represent that you are authorised to use the payment method provided. All transactions are processed through secure, PCI-compliant payment gateways.
            </p>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xl font-serif text-royal-blue-500/80 font-medium mb-4">5. Shipping & Delivery</h2>
            <p className="text-sm text-royal-blue-500/55 leading-relaxed font-light">
              Shipping and delivery are subject to our Shipping & Returns policy, which is incorporated into these terms by reference. Risk of loss and title for items purchased pass to you upon delivery to the carrier. Estimated delivery times are not guaranteed and may be subject to delays beyond our reasonable control.
            </p>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h2 className="text-xl font-serif text-royal-blue-500/80 font-medium mb-4">6. Intellectual Property</h2>
            <p className="text-sm text-royal-blue-500/55 leading-relaxed font-light">
              All content on this website — including text, images, logos, designs, graphics, and software — is the property of HAEVN and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.
            </p>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-xl font-serif text-royal-blue-500/80 font-medium mb-4">7. Limitation of Liability</h2>
            <p className="text-sm text-royal-blue-500/55 leading-relaxed font-light">
              HAEVN shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or purchase of products. Our total liability in connection with any order shall not exceed the purchase price of the products in that order.
            </p>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <h2 className="text-xl font-serif text-royal-blue-500/80 font-medium mb-4">8. Contact</h2>
            <p className="text-sm text-royal-blue-500/55 leading-relaxed font-light">
              For questions about these terms, contact us at legal@haevn.com or write to HAEVN House, Bandra Kurla Complex, Mumbai — 400051.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
