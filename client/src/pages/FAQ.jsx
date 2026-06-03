import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChevronDown } from 'react-icons/hi';

const faqData = [
  {
    q: 'How do I place an order?',
    a: 'Browse our collection, select your desired size and colour, and add items to your cart. Proceed to checkout, enter your shipping details, and complete payment. You will receive an order confirmation via email within minutes.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Visa, Mastercard, RuPay, UPI (GPay, PhonePe, Paytm), Net Banking, and EMI options on select cards. All transactions are secured with 256-bit SSL encryption.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Metro cities: 3–5 business days. Other locations across India: 5–7 business days. International shipping timelines vary and are displayed at checkout.',
  },
  {
    q: 'Do you offer free shipping?',
    a: 'Yes, shipping is free on all orders over Rs.1,000 within India. A nominal fee of Rs.499 applies to orders below this threshold.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day return window from the date of delivery. Items must be unworn, unwashed, and in original condition with all tags attached. Return shipping is free for domestic orders.',
  },
  {
    q: 'How do I initiate a return?',
    a: 'Log in to your account, go to My Orders, and select the item you wish to return. Follow the on-screen instructions to generate a return label. Alternatively, contact our concierge team at concierge@haevn.com.',
  },
  {
    q: 'How long do refunds take?',
    a: 'Refunds are processed within 5–7 business days after we receive your return. The amount is credited back to the original payment method.',
  },
  {
    q: 'Can I exchange an item for a different size?',
    a: 'Yes, exchanges are processed within 2–3 business days of receiving your return. We recommend placing a fresh order for the desired size while the exchange is in progress to avoid sell-outs.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship to select countries. International shipping costs and estimated delivery times are calculated at checkout. Duties and taxes are the responsibility of the recipient.',
  },
  {
    q: 'How do I know which size to order?',
    a: 'Refer to our Size Guide page for detailed measurements for each category. You can also contact our style advisors at concierge@haevn.com for personalised fitting advice.',
  },
  {
    q: 'Are all products authentic?',
    a: 'Absolutely. Every item sold on HAEVN undergoes a rigorous 16-point quality check and is certified 100% genuine. We source directly from the finest manufacturers and brands.',
  },
  {
    q: 'Can I cancel or modify my order?',
    a: 'Orders can be cancelled or modified within 60 minutes of placement, provided they have not yet been dispatched. Contact our concierge team immediately for assistance.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="pt-20">
      <div className="border-b border-navy-500/8 bg-warm-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.35em] mb-3 font-medium">Help Centre</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue-500/90">Frequently Asked Questions</h1>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-3">
          {faqData.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="border border-navy-500/10 bg-white overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-8 py-5 text-left transition-colors hover:bg-navy-500/5">
                <span className="text-sm text-royal-blue-500/80 font-medium pr-4">{faq.q}</span>
                <HiOutlineChevronDown className={`text-gold-500/60 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                <p className="px-8 pb-5 text-sm text-royal-blue-500/50 leading-relaxed font-light">{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
