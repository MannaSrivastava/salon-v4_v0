# 💈 Salon Website v4.0 — Setup Guide

Premium salon website: WhatsApp booking · Google Sheets log · Email alerts · AI content generator.

---

## ⚡ Quick Start (15 min)

### 1 — Edit 4 config files
| File | What to edit |
|---|---|
| `config/shop.js` | Name, phone, WhatsApp, address, social, theme, salonBio |
| `config/services.js` | Services, prices, time slots |
| `config/features.js` | On/off switches + API keys |
| `config/creator.js` | Your developer footer credits |

### 2 — Add images
- `images/logo.png` — transparent PNG, 200×200px min
- `images/[name].jpg` — service photos (emoji shown if missing)
- `images/gallery/[name].jpg` — gallery photos

### 3 — Deploy
Drag folder to **netlify.com/drop** → live in 30 seconds.
Update `SHOP.website` in shop.js with your live URL.

---

## 🔧 Backend Features

### Google Sheets (FREE)
1. script.google.com → New project → paste `google-apps-script/BookingLogger.gs`
2. Deploy → Web app → Execute as Me, Anyone can access
3. Copy Web App URL → paste into `features.js → sheetsWebhookUrl`

### EmailJS Notifications (FREE 200/mo)
1. emailjs.com → add Gmail service → create template using vars:
   `{{customer_name}} {{customer_phone}} {{services}} {{total}} {{special_req}}`
2. Copy Service ID, Template ID, Public Key → paste into `features.js → emailJS`

### AI Content Generator
1. console.anthropic.com → get API key (costs ~$0.002 per use)
2. Paste into `features.js → claudeApiKey`
3. Set `aiContent: true`

---

## 🎨 4 Themes
`luxury-burgundy` · `emerald-spa` · `midnight-gold` · `blush-rose`
Set in `config/shop.js → theme`

## 🚩 All Feature Flags (config/features.js)
`commonSlot` `specialRequests` `homeService` `showMale` `showFemale` `showKids`
`showOccasions` `bookingStorage` `emailNotify` `gallery` `announcement` `aiContent` `qrCode` `locationSection`
Set any to `false` → that feature vanishes completely.

## 📦 Per-Client Checklist
- [ ] Edit shop.js (name, phone, WA, address, theme)
- [ ] Edit services.js (their menu + prices)
- [ ] Add their logo + photos to images/
- [ ] Set their Google Sheets webhook URL
- [ ] Set their EmailJS keys
- [ ] Set their Claude API key (optional)
- [ ] Deploy to Netlify → update website URL
- [ ] Test one booking end-to-end
