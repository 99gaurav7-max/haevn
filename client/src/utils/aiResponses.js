const responses = {
  greeting: [
    "Namaste, sir! Welcome to HAEVN. I'm your personal style assistant. How can I help you today?",
    "Greetings, gentleman! Ready to elevate your wardrobe? I'm here for you.",
    "Hello! Looking for something extraordinary? Tell me what you need.",
  ],
  farewell: [
    "Thank you for visiting HAEVN. Have a magnificent day!",
    "Pleasure assisting you, sir. Do come back if you need style advice.",
    "Goodbye! Remember — true luxury is in the details.",
  ],
  default: [
    "I'd love to help you find the perfect piece. Could you tell me more about what you're looking for?",
    "At HAEVN, we curate the finest men's fashion from head to toe. Are you looking for something specific?",
    "I can help with outfit recommendations, size guidance, or styling tips. What do you need?",
  ],
  headwear: [
    "A gentleman's style begins at the top. Our fedoras and flat caps are handcrafted from premium materials.",
    "Our beanie collection features ultra-soft cashmere blends — perfect for Indian winters in the north.",
    "Top off your look with our signature headwear. The Sovereign Fedora is a timeless classic.",
  ],
  eyewear: [
    "Our Aviator Legacy Sunglasses with Carl Zeiss lenses offer unparalleled clarity and style.",
    "Protect your eyes in style. Our collection features handcrafted titanium and acetate frames.",
    "The Executive Optical Frame is perfect for the modern Indian professional.",
  ],
  shirts: [
    "Our Emperor Dress Shirt in Egyptian cotton is the cornerstone of any gentleman's wardrobe.",
    "For formal occasions, our tailored fit shirts with mother-of-pearl buttons are unmatched.",
    "Looking for something casual? The Heritage Oxford Shirt in Sea Island cotton is a must-have.",
  ],
  suits: [
    "The Aristocrat Blazer in Super 150s Italian wool — power dressing redefined for the Indian gentleman.",
    "For weddings and galas, our blazer collection will ensure you're the best-dressed man in the room.",
  ],
  jeans: [
    "The Duke Selvedge Denim — 14oz Japanese raw denim with pure copper rivets. Built to last a lifetime.",
    "Our selvedge denim collection is perfect for the discerning gentlemen who appreciates craftsmanship.",
  ],
  shoes: [
    "The Imperial Oxford — bench-made Goodyear welted, from Northampton, England. The cornerstone of elegance.",
    "Our Venetian Loafers in Italian suede offer effortless sophistication for any occasion.",
    "For the urban explorer, the Commando Boots in Horween Chromexcel leather combine ruggedness with luxury.",
  ],
  watches: [
    "The Celestial Chronograph — Swiss-made automatic movement with sapphire crystal. Timekeeping as art.",
    "A fine watch completes a gentleman's attire. Our collection features Swiss precision and timeless design.",
  ],
  accessories: [
    "From the Sovereign Leather Wallet in Japanese shell cordovan to the Ambassador Silk Tie from Como.",
    "Our accessory collection includes belts, cufflinks, bracelets, rings, and fragrances — the finishing touches.",
  ],
  fragrance: [
    "The Regent Fragrance — a sophisticated blend of bergamot, oud, and amber. The scent of confidence.",
    "A signature fragrance is the invisible accessory. Our collection is curated for the modern Indian man.",
  ],
  wedding: [
    "For your special day, our sherwani-inspired blazers and premium dress shirts will make you unforgettable.",
    "HAEVN's wedding collection features the finest suits, shirts, and accessories for the groom and his party.",
    "Congratulations! We have everything you need — from the blazer to the cufflinks to the fragrance.",
  ],
  festival: [
    "This festive season, elevate your style with our premium ethnic-fusion blazers and accessories.",
    "Diwali, Eid, or Pongal — celebrate in style with HAEVN's festive collection.",
  ],
  size: [
    "We offer sizes from S to XXL for most apparel, and 7 to 13 for footwear. Each product has a detailed size guide.",
    "For the perfect fit, check the individual product details. Our tailored pieces can be adjusted by your local tailor.",
    "If you're unsure between two sizes, we recommend the larger size for a more comfortable fit.",
  ],
  shipping: [
    "We ship to all cities across India — free shipping on orders above Rs.1,000.",
    "Expected delivery is 5-7 business days across India. Metro cities typically receive orders in 3-5 days.",
    "We use premium courier services to ensure your HAEVN package arrives in perfect condition.",
  ],
  payment: [
    "We accept UPI (Google Pay, PhonePe, Paytm), Net Banking, Credit/Debit Cards, and Cash on Delivery on selected orders.",
    "All payments are 100% secure. You can pay via UPI, cards, net banking, or COD.",
    "For COD orders, please keep the exact amount ready. Our delivery partner will collect the payment.",
  ],
  return: [
    "We offer a 30-day hassle-free return policy. If you're not completely satisfied, we'll arrange a pickup.",
    "Returns are free within 30 days of delivery. Items must be unworn with tags attached.",
  ],
  thanks: [
    "You're most welcome, sir! It's my pleasure to assist you.",
    "Happy to help! That's what I'm here for.",
    "Anytime! Your satisfaction is our priority at HAEVN.",
  ],
};

const keywords = {
  headwear: ['hat', 'cap', 'beanie', 'fedora', 'headwear', 'head', 'crown'],
  eyewear: ['sunglasses', 'glasses', 'eyewear', 'spectacles', 'sun', 'uv'],
  shirts: ['shirt', 'shirts', 'oxford', 'dress shirt', 'formal shirt', 'polo'],
  suits: ['suit', 'blazer', 'jacket', 'suiting', 'formal', 'sherwani', 'ethnic'],
  jeans: ['jeans', 'denim', 'selvedge', 'trouser', 'chinos', 'pants', 'bottoms'],
  shoes: ['shoe', 'shoes', 'sneakers', 'boots', 'loafers', 'oxford', 'footwear', 'sandal'],
  watches: ['watch', 'chronograph', 'timepiece', 'wrist'],
  accessories: ['belt', 'wallet', 'tie', 'cufflink', 'bracelet', 'ring', 'chain', 'accessories'],
  fragrance: ['fragrance', 'perfume', 'cologne', 'scent', 'oud', 'attar', 'itrr'],
  wedding: ['wedding', 'groom', 'marriage', 'shaadi', 'engagement', 'reception'],
  festival: ['diwali', 'festival', 'pongal', 'eid', 'holi', 'festive', 'celebrate', 'dusshera'],
  size: ['size', 'fit', 'measurement', 'sizing', 'larger', 'smaller', 'measure'],
  shipping: ['shipping', 'delivery', 'ship', 'courier', 'shipment', 'track', 'arrive'],
  payment: ['payment', 'pay', 'upi', 'card', 'cod', 'cash', 'netbanking', 'phonepe', 'paytm', 'gpay'],
  return: ['return', 'refund', 'exchange', 'replace', 'money back', 'cancel'],
  thanks: ['thanks', 'thank', 'appreciate', 'grateful', 'welcome'],
  greeting: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'howdy'],
  farewell: ['bye', 'goodbye', 'see you', 'later', 'cya', 'exit'],
};

function matchKeyword(input) {
  const lower = input.toLowerCase();
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(w => lower.includes(w))) {
      return category;
    }
  }
  return null;
}

export function getAIResponse(input, userName) {
  const msg = input.trim();
  if (!msg) {
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  }

  if (msg.length < 3) {
    return "I didn't quite catch that. Could you tell me more about what you're looking for?";
  }

  const category = matchKeyword(msg);
  if (category) {
    const cat = responses[category];
    return cat[Math.floor(Math.random() * cat.length)];
  }

  const questions = msg.endsWith('?');
  if (questions) {
    const qa = [
      "Great question! We have a curated collection of men's fashion from head to toe. What category interests you?",
      "I'd be happy to answer that. Our collection includes premium headwear, eyewear, tops, bottoms, footwear, and accessories — all hand-selected for the discerning Indian gentleman.",
      "Excellent question! Let me help you find exactly what you need.",
    ];
    return qa[Math.floor(Math.random() * qa.length)];
  }

  if (msg.includes('recommend') || msg.includes('suggestion') || msg.includes('what should')) {
    const recs = [
      "I recommend starting with our signature pieces: The Emperor Dress Shirt and The Sovereign Leather Wallet. They're the foundation of a luxurious wardrobe.",
      "For a complete look, pair The Aristocrat Blazer with The Tailored Trousers and The Imperial Oxford Shoes. Pure sophistication.",
      "Every gentleman needs a signature fragrance. Our Regent Fragrance (bergamot, oud, and amber) is our most popular choice.",
    ];
    return recs[Math.floor(Math.random() * recs.length)];
  }

  const fallbacks = [
    "Intriguing! At HAEVN, we specialize in premium men's fashion — from handcrafted Italian shoes to Swiss watches. What catches your eye?",
    "Tell me more about your style. Are you looking for something formal, casual, or perhaps a statement accessory?",
    "I'm here to help you discover the perfect addition to your wardrobe. Browse our collection or ask me about specific categories!",
    "Whether you need a complete wardrobe refresh or just the perfect finishing touch, HAEVN has you covered. What are you looking for?",
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export function getCategoryLinks(category) {
  const links = {
    headwear: '/shop/Headwear',
    eyewear: '/shop/Eyewear',
    shirts: '/shop/Tops',
    jeans: '/shop/Bottoms',
    shoes: '/shop/Footwear',
    accessories: '/shop/Accessories',
    suits: '/shop/Tops',
    fragrance: '/shop/Accessories',
    watches: '/shop/Accessories',
  };
  return links[category] || '/shop';
}
