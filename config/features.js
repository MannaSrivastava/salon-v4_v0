// ============================================================
//  FEATURES CONFIG  —  v4.1
//  Turn any feature on/off per salon — false = completely hidden
// ============================================================
const FEATURES = {

  // ── BOOKING FORM ───────────────────────────────────────
  commonSlot:       true,   // "Apply same date & time to all" toggle
  specialRequests:  true,   // Free-text special requests field
  customerEmail:    true,   // Collect customer email for confirmation
  homeService:      true,   // Home/doorstep toggle per service

  // ── SERVICE CATEGORIES ─────────────────────────────────
  showMale:         true,
  showFemale:       true,
  showKids:         true,
  showOccasions:    true,   // Bridal, Groom, Party, Function

  // ── BOOKING STORAGE (Google Sheets) ────────────────────
  // See README → "Google Apps Script Setup" for full guide
  bookingStorage:   true,
  // YOUR master sheet webhook URL (logs ALL salons into your one sheet)
  sheetsWebhookUrl: "",     // Paste your Apps Script Web App URL here

  // ── NOTIFICATIONS ──────────────────────────────────────

  // Owner email alert on every new booking (EmailJS — free 200/mo)
  ownerEmailNotify: true,
  emailJS: {
    serviceId:  "",         // From emailjs.com dashboard
    templateId: "",         // Owner alert template ID
    publicKey:  "",         // Your EmailJS public key
    ownerEmail: "",         // Owner's email address
  },

  // Customer confirmation email after booking (same EmailJS account)
  customerEmailNotify: true,
  customerEmailTemplateId: "", // Separate template for customer receipt

  // ── GALLERY ────────────────────────────────────────────
  gallery:          true,

  // ── ANNOUNCEMENT BANNER ─────────────────────────────────
  announcement:     true,

  // ── AI SOCIAL CONTENT GENERATOR ────────────────────────
  aiContent:        true,

  // AI Mode:
  //   "template" — 100% free, works offline, smart templates
  //   "claude"   — Claude API (owner pays ~₹0.15/generation)
  //   "auto"     — templates by default; Claude if key provided
  aiMode: "auto",

  // Optional: paste Claude API key to unlock AI mode
  // Get one at console.anthropic.com (free account, pay per use)
  claudeApiKey: "",

  // ── QR CODE ─────────────────────────────────────────────
  qrCode:           true,

  // ── LOCATION / MAP ──────────────────────────────────────
  locationSection:  true,
};
