// ============================================================
//  SERVICES CONFIGURATION
//  Add/remove services freely — empty category auto-hides tab
//  tag: "Most Popular" | "Best Value" | "" — shown as badge
// ============================================================
const SERVICES = {

  male: [
    { id:"m1", name:"Men's Haircut",       price:150,  desc:"Precision cut styled to your preference",          image:"images/mens-haircut.jpg",   duration:30,  icon:"✂️",  tag:"" },
    { id:"m2", name:"Beard Trim & Shape",  price:100,  desc:"Clean shape-up with straight razor finish",        image:"images/beard-trim.jpg",     duration:20,  icon:"🪒",  tag:"" },
    { id:"m3", name:"Hair + Beard Combo",  price:220,  desc:"Full groom — haircut and beard together",          image:"images/combo-m.jpg",        duration:50,  icon:"💈",  tag:"Most Popular" },
    { id:"m4", name:"Head Massage",        price:199,  desc:"Deep relaxing scalp massage with warm oil",        image:"images/head-massage.jpg",   duration:30,  icon:"🧖‍♂️", tag:"" },
    { id:"m5", name:"Face Clean-up",       price:249,  desc:"Cleansing, scrub & moisturizing for men",          image:"images/face-cleanup-m.jpg", duration:30,  icon:"✨",  tag:"" },
    { id:"m6", name:"Hair Colour",         price:499,  desc:"Single colour application with toning",            image:"images/hair-colour-m.jpg",  duration:60,  icon:"🎨",  tag:"" },
  ],

  female: [
    { id:"f1", name:"Women's Haircut",        price:299,  desc:"Expert cut tailored to your face shape",        image:"images/womens-haircut.jpg", duration:45,  icon:"✂️",  tag:"" },
    { id:"f2", name:"Blow Dry & Styling",     price:349,  desc:"Professional blow-out for any occasion",        image:"images/blowdry.jpg",        duration:40,  icon:"💨",  tag:"" },
    { id:"f3", name:"Hair Colour (Global)",   price:1499, desc:"Full head colour with premium products",        image:"images/hair-colour-f.jpg",  duration:90,  icon:"🎨",  tag:"" },
    { id:"f4", name:"Highlights / Balayage",  price:2499, desc:"Sun-kissed highlights or balayage effect",      image:"images/highlights.jpg",     duration:120, icon:"🌟",  tag:"Best Value" },
    { id:"f5", name:"Facial",                price:799,  desc:"Deep cleansing facial with glow mask",           image:"images/facial.jpg",         duration:60,  icon:"🌸",  tag:"Most Popular" },
    { id:"f6", name:"Waxing (Full Arms)",     price:299,  desc:"Smooth finish full arm waxing",                 image:"images/waxing-arms.jpg",    duration:30,  icon:"🌿",  tag:"" },
    { id:"f7", name:"Manicure",              price:399,  desc:"Nail shaping, cuticle care & polish",            image:"images/manicure.jpg",       duration:40,  icon:"💅",  tag:"" },
    { id:"f8", name:"Pedicure",              price:499,  desc:"Foot soak, scrub, massage & nail finish",        image:"images/pedicure.jpg",       duration:50,  icon:"🦶",  tag:"" },
  ],

  kids: [
    { id:"k1", name:"Kids' Haircut (Boy)",    price:99,  desc:"Fun & friendly cut for boys up to 12 yrs",      image:"images/kids-boy-cut.jpg",  duration:20, icon:"👦",  tag:"" },
    { id:"k2", name:"Kids' Haircut (Girl)",   price:149, desc:"Neat trim or full cut for girls up to 12 yrs",  image:"images/kids-girl-cut.jpg", duration:25, icon:"👧",  tag:"" },
    { id:"k3", name:"Kids' Hair Wash & Dry",  price:99,  desc:"Gentle shampoo, condition & blow-dry",          image:"images/kids-wash.jpg",     duration:20, icon:"🚿",  tag:"" },
    { id:"k4", name:"Baby's First Haircut",   price:199, desc:"Special first haircut with a keepsake lock",    image:"images/baby-cut.jpg",      duration:30, icon:"👶",  tag:"Most Popular" },
  ],

  occasions: [
    { id:"o1", name:"Bridal Makeup",              price:4999, desc:"Complete bridal look — makeup, hair styling, draping & finishing touch", image:"images/bridal-makeup.jpg",   duration:180, icon:"👰", tag:"Most Popular" },
    { id:"o2", name:"Groom Grooming Package",      price:1999, desc:"Haircut, beard sculpt, facial, clean-up — total pre-wedding groom prep", image:"images/groom-package.jpg",   duration:120, icon:"🤵", tag:"" },
    { id:"o3", name:"Pre-Bridal Package",          price:8999, desc:"3-session pre-bridal — facial, body polishing, hair treatment & trial makeup", image:"images/pre-bridal.jpg", duration:240, icon:"💍", tag:"Best Value" },
    { id:"o4", name:"Party / Function Makeup",     price:2499, desc:"HD makeup for weddings, receptions, birthdays & special events",       image:"images/party-makeup.jpg",    duration:90,  icon:"🎉", tag:"" },
    { id:"o5", name:"Engagement Look",             price:3499, desc:"Elegant engagement-ready look with hair styling & makeup",             image:"images/engagement-look.jpg", duration:120, icon:"💎", tag:"" },
    { id:"o6", name:"Mehendi / Haldi Prep",        price:1499, desc:"Skin brightening treatment & blowout for pre-wedding ceremonies",      image:"images/mehendi-prep.jpg",    duration:90,  icon:"🌼", tag:"" },
  ],

  timeSlots: {
    male:      ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM"],
    female:    ["10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM"],
    kids:      ["10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM"],
    occasions: ["07:00 AM","08:00 AM","09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM"],
  },
};
