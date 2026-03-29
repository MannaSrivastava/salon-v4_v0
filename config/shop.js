// ============================================================
//  SHOP CONFIGURATION — Every non-empty value auto-displays
//  Leave any field "" or [] to hide it from the website
// ============================================================
const SHOP = {
  name:    "Glamour Studio",
  tagline: "Premium Unisex Salon — Look Good, Feel Great",
  logo:    "images/logo.png",       // "" for text-only hero

  phone:    "+91 91627 77063",
  whatsapp: "919162777063",          // digits only — no + or spaces
  email:    "hello@glamourstudio.in",
  website:  "https://glamourstudio.in",

  address: {
    line1:   "Shop No. 5, Green Park Complex",
    line2:   "Near City Mall, MG Road",
    city:    "Bangalore",
    state:   "Karnataka",
    pincode: "560001",
  },

  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  googleMapsLink:  "https://maps.google.com/?q=12.9716,77.5946",

  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
    { days: "Sunday",            time: "10:00 AM – 6:00 PM" },
  ],

  social: {
    whatsapp:  "https://wa.me/919876543210",
    instagram: "https://instagram.com/glamourstudio",
    facebook:  "https://facebook.com/glamourstudio",
    youtube:   "",
  },

  currency: "₹",

  homeService: {
    label:       "Home / Doorstep Service",
    extraCharge: 150,
    chargeLabel: "Travel Charge",
  },

  gallery: [
    { image: "images/gallery/salon-interior.jpg",  caption: "Our Salon" },
    { image: "images/gallery/styling-station.jpg", caption: "Styling Station" },
    { image: "images/gallery/women-styling.jpg",   caption: "Hair Styling" },
    { image: "images/gallery/kids-zone.jpg",        caption: "Kids Zone" },
    { image: "images/gallery/men-grooming.jpg",    caption: "Men's Grooming" },
    { image: "images/gallery/products.jpg",        caption: "Products" },
  ],

  // "luxury-burgundy" | "emerald-spa" | "midnight-gold" | "blush-rose"
  theme: "luxury-burgundy",

  // Announcement banner — "" to hide
  announcement: "✨ Special: 20% off all bridal packages this month!",

  // For AI content generator — describes the salon's personality & style
  salonBio: "Glamour Studio is a premium unisex salon in Bangalore offering expert hair, skin, and bridal services. We are known for our warm hospitality, skilled stylists, and use of top international products.",
};
