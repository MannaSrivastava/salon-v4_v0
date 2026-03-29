/* ============================================================
   SALON v4.1 — Full App Logic
   • Booking cart with common slot + special requests + email
   • Google Sheets master log
   • EmailJS owner alert + customer confirmation
   • AI Content Studio: free templates + optional Claude API
   ============================================================ */

const TODAY = new Date().toISOString().split('T')[0];
const state = { activeCat: 'male', cart: [] };

/* ── Social SVGs ─────────────────────────────────────────── */
const SVG = {
  wa:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a6.47 6.47 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.845L.057 23.428l5.756-1.508A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.018-1.38l-.36-.214-3.717.975.993-3.63-.235-.374A9.817 9.817 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/></svg>`,
  ig:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  fb:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  yt:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
};
const SOCIAL_SVGS = { whatsapp:SVG.wa, instagram:SVG.ig, facebook:SVG.fb, youtube:SVG.yt };

/* ── Boot ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  initEmailJS();
  buildAnnouncement();
  buildHero();
  buildTabs();
  buildServices();
  initFormFeatures();
  buildGallery();
  buildQR();
  buildLocation();
  buildFooter();
  buildAISection();
  bindScrollTop();
  setTimeout(() => document.getElementById('loader')?.classList.add('hidden'), 600);
});

/* ── Theme ───────────────────────────────────────────────── */
function applyTheme() {
  const valid = ['luxury-burgundy','emerald-spa','midnight-gold','blush-rose'];
  const t = valid.includes(SHOP.theme) ? SHOP.theme : 'luxury-burgundy';
  document.documentElement.setAttribute('data-theme', t);
  document.body.setAttribute('data-theme', t);
}

function initEmailJS() {
  if (!FEATURES.ownerEmailNotify && !FEATURES.customerEmailNotify) return;
  const k = FEATURES.emailJS?.publicKey;
  if (k && typeof emailjs !== 'undefined') emailjs.init(k);
}

/* ── Announcement ────────────────────────────────────────── */
function buildAnnouncement() {
  if (!FEATURES.announcement || !SHOP.announcement) return;
  const bar = document.getElementById('announcement-bar');
  const txt = document.getElementById('announcement-text');
  if (bar && txt) { txt.textContent = SHOP.announcement; bar.style.display = 'flex'; }
}

/* ── Hero ────────────────────────────────────────────────── */
function buildHero() {
  const el = document.getElementById('hero-inner');
  if (!el) return;
  const logo    = SHOP.logo ? `<img src="${SHOP.logo}" alt="${e(SHOP.name)}" class="hero-logo" onerror="this.style.display='none'">` : '';
  const socials = Object.entries(SHOP.social||{}).filter(([,v])=>v).map(([k])=>
    SOCIAL_SVGS[k] ? `<a href="${SHOP.social[k]}" target="_blank" rel="noopener" class="social-btn" aria-label="${k}">${SOCIAL_SVGS[k]}</a>` : ''
  ).join('');
  const hours = (SHOP.hours||[]).map(h=>`<p><strong>${h.days}:</strong> ${h.time}</p>`).join('');
  el.innerHTML = `
    <div class="hero-left">
      ${logo}
      <div>
        ${SHOP.tagline?`<div class="hero-tagline">${e(SHOP.tagline)}</div>`:''}
        <div class="hero-name">${e(SHOP.name)}</div>
      </div>
    </div>
    <div class="hero-right">
      ${SHOP.phone  ?`<a href="tel:${SHOP.phone}" class="hero-phone">📞 ${e(SHOP.phone)}</a>`:''}
      ${SHOP.email  ?`<div class="hero-email">✉️ ${e(SHOP.email)}</div>`:''}
      <div class="hero-hours">${hours}</div>
      ${socials?`<div class="hero-social">${socials}</div>`:''}
    </div>`;
}

/* ── Tabs ────────────────────────────────────────────────── */
const CAT = {
  male:      { icon:'👨', label:'Men',              cls:'male',      hdr:"Men's Services",           sub:'Premium grooming for the modern man',        feat:'showMale' },
  female:    { icon:'👩', label:'Women',            cls:'female',    hdr:"Women's Services",         sub:'Beauty & wellness for women',                feat:'showFemale' },
  kids:      { icon:'🧒', label:'Kids',             cls:'kids',      hdr:"Kids' Services",           sub:'Gentle & fun for little ones',               feat:'showKids' },
  occasions: { icon:'💍', label:'Special Occasions',cls:'occasions', hdr:'Special Occasion Packages',sub:'Bridal · Groom · Party · Function looks',   feat:'showOccasions' },
};

function buildTabs() {
  const el = document.getElementById('cat-nav-inner');
  if (!el) return;
  const cats = Object.keys(CAT).filter(k => FEATURES[CAT[k].feat] && (SERVICES[k]||[]).length > 0);
  if (!cats.length) return;
  state.activeCat = cats[0];
  el.innerHTML = `<span class="cat-nav-label">Browse:</span>` + cats.map(k => {
    const m = CAT[k], n = cntFor(k);
    return `<button class="cat-tab ${k===state.activeCat?'active':''}" data-cat="${k}" onclick="switchCat('${k}')">
      <span class="tab-icon">${m.icon}</span>${m.label}
      <span class="tab-count ${n>0?'show':''}" id="tc-${k}">${n}</span>
    </button>`;
  }).join('');
}

function switchCat(cat) {
  state.activeCat = cat;
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
  document.querySelectorAll('.cat-panel').forEach(p => p.classList.toggle('active', p.dataset.cat === cat));
  document.getElementById('sec-services')?.scrollIntoView({ behavior:'smooth', block:'start' });
}

function cntFor(cat) { return state.cart.filter(s => s.category === cat).length; }
function refreshCounts() {
  Object.keys(CAT).forEach(k => {
    const el = document.getElementById(`tc-${k}`); if (!el) return;
    const n = cntFor(k); el.textContent = n; el.classList.toggle('show', n > 0);
  });
}

/* ── Services ────────────────────────────────────────────── */
function buildServices() {
  const container = document.getElementById('services-container');
  if (!container) return;
  const cats = Object.keys(CAT).filter(k => FEATURES[CAT[k].feat] && (SERVICES[k]||[]).length > 0);
  container.innerHTML = cats.map(k => {
    const m = CAT[k];
    const cards = (SERVICES[k]||[]).map((s,i) => cardHTML(s,k,i)).join('');
    return `<div class="cat-panel ${k===state.activeCat?'active':''}" data-cat="${k}">
      <div class="cat-header ${m.cls}">
        <span class="cat-header-icon">${m.icon}</span>
        <div class="cat-header-text"><h3>${m.hdr}</h3><p>${m.sub}</p></div>
      </div>
      <div class="services-grid">${cards}</div>
    </div>`;
  }).join('');
}

function cardHTML(s, cat, idx) {
  const img  = s.image ? `<img src="${s.image}" alt="${e(s.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : '';
  const icon = `<div class="card-img-icon" ${s.image?'style="display:none"':''}>${s.icon||'💇'}</div>`;
  const dur  = s.duration ? `<span class="card-dur">⏱ ${s.duration}min</span>` : '';
  const tag  = s.tag==='Most Popular'?`<span class="card-tag card-tag-popular">⭐ Popular</span>`:s.tag==='Best Value'?`<span class="card-tag card-tag-value">💰 Best Value</span>`:'';
  return `<div class="service-card" id="sc-${s.id}" onclick="toggleSvc('${s.id}','${cat}')" style="animation-delay:${idx*.05}s">
    <div class="card-img">${img}${icon}<div class="card-check">✓</div>${dur}${tag}</div>
    <div class="card-body">
      <div class="card-name">${e(s.name)}</div>
      ${s.desc?`<div class="card-desc">${e(s.desc)}</div>`:''}
      <div class="card-price">${SHOP.currency}${s.price}<span> / session</span></div>
      <button class="card-btn" id="cb-${s.id}">Add to Booking</button>
    </div>
  </div>`;
}

function toggleSvc(id, cat) {
  const svc = (SERVICES[cat]||[]).find(s => s.id === id); if (!svc) return;
  const idx = state.cart.findIndex(s => s.id === id);
  if (idx > -1) { state.cart.splice(idx,1); toast(`Removed: ${svc.name}`); }
  else          { state.cart.push({...svc,category:cat,date:'',slot:'',home:false}); toast(`Added: ${svc.name}`); }
  syncCard(id); refreshCounts(); renderCart();
}

function syncCard(id) {
  const card = document.getElementById(`sc-${id}`);
  const btn  = document.getElementById(`cb-${id}`);
  const in_ = state.cart.some(s => s.id === id);
  card?.classList.toggle('selected', in_);
  if (btn) btn.textContent = in_ ? '✓ Selected' : 'Add to Booking';
}

function removeItem(id) {
  const item = state.cart.find(s => s.id === id); if (!item) return;
  toast(`Removed: ${item.name}`);
  state.cart = state.cart.filter(s => s.id !== id);
  syncCard(id); refreshCounts(); renderCart();
}

/* ── Cart ────────────────────────────────────────────────── */
function renderCart() {
  const emptyEl  = document.getElementById('cart-empty');
  const filledEl = document.getElementById('cart-filled');
  const listEl   = document.getElementById('cart-list');
  const countEl  = document.getElementById('cart-count');
  if (!emptyEl||!filledEl||!listEl) return;

  if (!state.cart.length) {
    emptyEl.style.display = 'block'; filledEl.style.display = 'none';
    updateBookBtn(); return;
  }
  emptyEl.style.display = 'none'; filledEl.style.display = 'block';
  if (countEl) countEl.textContent = state.cart.length;

  const csBar = document.getElementById('common-slot-bar');
  if (csBar) csBar.style.display = FEATURES.commonSlot ? 'block' : 'none';

  listEl.innerHTML = state.cart.map(item => cartItemHTML(item)).join('');
  recalcTotal(); updateBookBtn();
}

function cartItemHTML(item) {
  const cat   = item.category;
  const slots = (SERVICES.timeSlots||{})[cat]||[];
  const hs    = SHOP.homeService;
  const bc    = {male:'bm',female:'bf',kids:'bk',occasions:'bo'}[cat]||'bm';
  const cl    = {male:'Men',female:'Women',kids:'Kids',occasions:'Occasion'}[cat]||cat;
  const chips = slots.map(s=>`<label class="slot-lbl"><input type="radio" name="sl-${item.id}" value="${s}" ${item.slot===s?'checked':''} onchange="updateItem('${item.id}','slot','${s}')"><span class="slot-chip">${s}</span></label>`).join('');
  const homeRow = (FEATURES.homeService&&hs) ? `<div class="cart-item-home">
    <label class="hs-toggle"><input type="checkbox" ${item.home?'checked':''} onchange="updateItem('${item.id}','home',this.checked)"><span class="hs-track"></span></label>
    <span class="hs-label">🏠 ${hs.label||'Home Service'}</span>
    <span id="hc-${item.id}" class="hs-charge" style="${item.home?'':'display:none'}">+${SHOP.currency}${hs.extraCharge} ${hs.chargeLabel}</span>
  </div>` : '';
  return `<div class="cart-item" id="ci-${item.id}">
    <div class="cart-item-top">
      <span class="ci-icon">${item.icon||'💇'}</span>
      <div class="ci-info">
        <div class="ci-name">${e(item.name)}</div>
        <span class="ci-badge ${bc}">${cl}</span>
      </div>
      <span class="ci-price">${SHOP.currency}${item.price}</span>
      <button class="ci-remove" onclick="removeItem('${item.id}')" title="Remove">✕</button>
    </div>
    <div class="cart-item-details">
      <div class="cd-group"><label>📅 Preferred Date</label>
        <input type="date" value="${item.date||''}" min="${TODAY}" onchange="updateItem('${item.id}','date',this.value)">
      </div>
      <div class="cd-group"><label>🕐 Time Slot</label>
        <div class="slot-grid">${chips}</div>
      </div>
    </div>
    ${homeRow}
  </div>`;
}

function updateItem(id, field, value) {
  const item = state.cart.find(s=>s.id===id); if (!item) return;
  item[field] = value;
  if (field==='home') { const hc=document.getElementById(`hc-${id}`); if(hc) hc.style.display=value?'inline-block':'none'; }
  recalcTotal();
}

/* ── Common Slot ─────────────────────────────────────────── */
function toggleCommonSlot(on) {
  const fields = document.getElementById('common-slot-fields');
  if (fields) fields.style.display = on ? 'grid' : 'none';
  if (!on) return;
  const sel   = document.getElementById('common-time');
  const cats  = [...new Set(state.cart.map(s=>s.category))];
  const slots = [...new Set(cats.flatMap(c=>(SERVICES.timeSlots||{})[c]||[]))].sort();
  if (sel) sel.innerHTML = `<option value="">— pick time —</option>` + slots.map(s=>`<option value="${s}">${s}</option>`).join('');
  const di = document.getElementById('common-date'); if (di) di.min = TODAY;
}

function applyCommonSlot() {
  const date = document.getElementById('common-date')?.value;
  const slot = document.getElementById('common-time')?.value;
  state.cart.forEach(item => { if (date) item.date=date; if (slot) item.slot=slot; });
  renderCart();
  // Restore toggle state
  const tog = document.getElementById('common-slot-chk');
  if (tog?.checked) {
    const f = document.getElementById('common-slot-fields'); if (f) f.style.display='grid';
    const di=document.getElementById('common-date'); if(di&&date) di.value=date;
    const si=document.getElementById('common-time'); if(si&&slot) si.value=slot;
  }
}

/* ── Total ───────────────────────────────────────────────── */
function recalcTotal() {
  const hs    = SHOP.homeService;
  let total   = state.cart.reduce((a,s)=>a+s.price,0);
  const homeOn = FEATURES.homeService&&hs&&state.cart.some(s=>s.home);
  if (homeOn) total += hs.extraCharge;
  const el   = document.getElementById('cart-total-amount');
  const note = document.getElementById('cart-total-note');
  if (el)   el.textContent   = `${SHOP.currency}${total}`;
  if (note) note.textContent = homeOn ? `Incl. ${SHOP.currency}${hs.extraCharge} ${hs.chargeLabel}` : 'Estimate before confirmation';
}

/* ── Form features ───────────────────────────────────────── */
function initFormFeatures() {
  const emailWrap   = document.getElementById('email-field-wrap');
  const specialWrap = document.getElementById('special-field-wrap');
  if (emailWrap)   emailWrap.style.display   = FEATURES.customerEmail    ? 'block' : 'none';
  if (specialWrap) specialWrap.style.display = FEATURES.specialRequests  ? 'block' : 'none';

  const note  = document.getElementById('form-note-text');
  const subNote = document.getElementById('book-sub-note');
  if (note) {
    const parts = ['ℹ️ Dates &amp; time slots are set per service in Step 2.'];
    if (FEATURES.commonSlot) parts.push('Use the toggle to set one date/time for all.');
    if (FEATURES.homeService&&SHOP.homeService) parts.push('Toggle 🏠 home service per item.');
    note.innerHTML = parts.join(' ');
  }
  if (subNote && FEATURES.customerEmail) {
    subNote.style.display = 'block';
    subNote.textContent   = '✉️ If you add your email, we\'ll also send a booking confirmation.';
  }
  updateBookBtn();
}

function updateBookBtn() {
  const btn = document.getElementById('book-btn'); if (!btn) return;
  const n   = state.cart.length;
  btn.innerHTML = `${SVG.wa} Book via WhatsApp${n>0?` (${n} service${n>1?'s':''})`:''}`;
}

/* ── Confirm Modal ───────────────────────────────────────── */
function openConfirmModal() {
  const name    = document.getElementById('f-name')?.value.trim();
  const phone   = document.getElementById('f-phone')?.value.trim();
  const email   = document.getElementById('f-email')?.value.trim()   || '';
  const special = document.getElementById('f-special')?.value.trim() || '';
  if (!name)             return toast('⚠️ Please enter your name');
  if (!phone)            return toast('⚠️ Please enter your phone number');
  if (!state.cart.length) return toast('⚠️ No services selected — go to Step 1');

  const hs    = SHOP.homeService;
  const homeOn = FEATURES.homeService&&hs&&state.cart.some(s=>s.home);
  let total   = state.cart.reduce((a,s)=>a+s.price,0);
  if (homeOn) total += hs.extraCharge;
  const cL    = {male:'Men',female:'Women',kids:'Kids',occasions:'Occasion'};

  const rows = state.cart.map(s=>`
    <div class="conf-row"><div class="conf-row-inner">
      <div>
        <div class="conf-name">${s.icon||''} ${e(s.name)}${s.home?'<span class="home-tag">🏠</span>':''}</div>
        <div class="conf-meta">📅 ${s.date?fmtDate(s.date):'<em>Date not set</em>'} · 🕐 ${s.slot||'<em>Slot not set</em>'} · <span class="ci-badge b${s.category[0]}" style="font-size:.58rem">${cL[s.category]||''}</span></div>
      </div>
      <div class="conf-price">${SHOP.currency}${s.price}</div>
    </div></div>`).join('');
  const homeRow = homeOn?`<div class="conf-row"><div class="conf-row-inner"><div class="conf-name">🚗 ${hs.chargeLabel}</div><div class="conf-price">${SHOP.currency}${hs.extraCharge}</div></div></div>`:'';

  document.getElementById('modal-body').innerHTML = `
    <div class="conf-field"><label>Full Name</label><input type="text" id="m-name" value="${e(name)}"></div>
    <div class="conf-field"><label>Mobile Number</label><input type="tel" id="m-phone" value="${e(phone)}"></div>
    ${email?`<div class="conf-field"><label>Email</label><input type="email" id="m-email" value="${e(email)}"></div>`:''}
    ${special?`<div class="conf-field"><label>Special Requests</label><textarea id="m-special" rows="2">${e(special)}</textarea></div>`:''}
    <div class="conf-svcs"><h4>📋 Your Booking</h4>${rows}${homeRow}
      <div class="conf-total"><span>Total Estimate</span><span>${SHOP.currency}${total}</span></div>
    </div>
    ${special?`<div class="conf-special"><strong>💬 Special Requests</strong>${e(special)}</div>`:''}
    ${email?`<div style="font-size:.78rem;color:var(--txt2);margin-top:.5rem;padding:.5rem .75rem;background:var(--bg2);border-radius:8px;">✉️ Confirmation will be sent to <strong>${e(email)}</strong></div>`:''}
    <div class="modal-actions">
      <button class="btn-back" onclick="closeModal()">← Edit</button>
      <button class="btn-send" onclick="sendBooking()">${SVG.wa} Confirm &amp; Send</button>
    </div>`;
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }

/* ── Send Booking ────────────────────────────────────────── */
async function sendBooking() {
  const name    = document.getElementById('m-name')?.value.trim();
  const phone   = document.getElementById('m-phone')?.value.trim();
  const email   = document.getElementById('m-email')?.value.trim()   || document.getElementById('f-email')?.value.trim()   || '';
  const special = document.getElementById('m-special')?.value.trim() || document.getElementById('f-special')?.value.trim() || '';
  if (!name||!phone) return toast('Please fill all fields');

  const hs    = SHOP.homeService;
  const homeOn = FEATURES.homeService&&hs&&state.cart.some(s=>s.home);
  let total   = state.cart.reduce((a,s)=>a+s.price,0);
  if (homeOn) total += hs.extraCharge;
  const cL    = {male:'Men',female:'Women',kids:'Kids',occasions:'Occasion'};

  const booking = {
    id:                `BK-${Date.now().toString(36).toUpperCase()}`,
    salonName:          SHOP.name,
    ownerEmail:         FEATURES.emailJS?.ownerEmail || '',
    ownerPhone:         SHOP.phone || '',
    salonAddress:       [SHOP.address?.line1,SHOP.address?.line2,SHOP.address?.city].filter(Boolean).join(', '),
    website:            SHOP.website || '',
    name, phone, email  : email,
    customerEmail:      email,
    services:           state.cart.map(s=>({...s})),
    special,
    total,
    homeService:        homeOn,
    homeServiceCharge:  homeOn ? hs.extraCharge : 0,
    timestamp:          new Date().toISOString(),
  };

  // 1. Google Sheets (silent, non-blocking)
  if (FEATURES.bookingStorage && FEATURES.sheetsWebhookUrl) {
    saveToSheets(booking);
  }

  // 2. EmailJS owner alert
  if (FEATURES.ownerEmailNotify && FEATURES.emailJS?.serviceId) {
    sendOwnerEmail(booking);
  }

  // 3. EmailJS customer confirmation
  if (FEATURES.customerEmailNotify && email && FEATURES.emailJS?.serviceId && FEATURES.customerEmailTemplateId) {
    sendCustomerEmail(booking);
  }

  // 4. WhatsApp message
  const lines = state.cart.map(s =>
    `  • [${cL[s.category]||s.category}] ${s.name} — ${SHOP.currency}${s.price}\n` +
    `    📅 ${s.date?fmtDate(s.date):'TBD'}  🕐 ${s.slot||'TBD'}${s.home?'  🏠 Home':''}`
  ).join('\n');

  const msg =
`Hello ${SHOP.name}! 👋
I'd like to book an appointment.

👤 *Name:* ${name}
📱 *Phone:* ${phone}
${email?`✉️ *Email:* ${email}\n`:''}
📋 *Services:*
${lines}
${homeOn?`\n🚗 ${hs.chargeLabel}: ${SHOP.currency}${hs.extraCharge}`:''}
${special?`\n💬 *Special Requests:* ${special}`:''}

💰 *Total Estimate:* ${SHOP.currency}${total}
🔖 *Ref:* ${booking.id}
${SHOP.website?`🌐 Booked via: ${SHOP.website}`:''}

Please confirm my appointment. Thank you! 🙏`;

  window.open(`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  closeModal();
  toast(`✅ Opening WhatsApp…${email?' Confirmation email being sent.':''}`);
}

function saveToSheets(booking) {
  fetch(FEATURES.sheetsWebhookUrl, {
    method:'POST', mode:'no-cors',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      ...booking,
      services: booking.services.map(s=>`${s.name} | ${s.date||'TBD'} ${s.slot||''} | ${SHOP.currency}${s.price}${s.home?' [Home]':''}`).join(' || '),
    }),
  }).catch(()=>{});
}

function sendOwnerEmail(booking) {
  if (typeof emailjs==='undefined') return;
  const cfg = FEATURES.emailJS;
  emailjs.send(cfg.serviceId, cfg.templateId, {
    to_email:       cfg.ownerEmail,
    salon_name:     booking.salonName,
    customer_name:  booking.name,
    customer_phone: booking.phone,
    customer_email: booking.email||'Not provided',
    services:       booking.services.map(s=>`${s.name} on ${s.date||'TBD'} at ${s.slot||'TBD'}`).join(', '),
    total:          `${SHOP.currency}${booking.total}`,
    home_service:   booking.homeService?`Yes (+${SHOP.currency}${booking.homeServiceCharge})`:'No',
    special_req:    booking.special||'None',
    booking_id:     booking.id,
  }).catch(()=>{});
}

function sendCustomerEmail(booking) {
  if (typeof emailjs==='undefined'||!booking.email) return;
  const cfg = FEATURES.emailJS;
  emailjs.send(cfg.serviceId, FEATURES.customerEmailTemplateId, {
    to_email:       booking.email,
    customer_name:  booking.name,
    salon_name:     booking.salonName,
    salon_phone:    SHOP.phone||'',
    salon_address:  booking.salonAddress,
    services:       booking.services.map(s=>`${s.name} — ${s.date||'TBD'} at ${s.slot||'TBD'} — ${SHOP.currency}${s.price}`).join('\n'),
    total:          `${SHOP.currency}${booking.total}`,
    home_service:   booking.homeService?`Yes — we will come to you`:'In-salon visit',
    special_req:    booking.special||'None',
    booking_id:     booking.id,
    website:        SHOP.website||'',
  }).catch(()=>{});
}

/* ══════════════════════════════════════════════════════════
   AI CONTENT STUDIO
   Mode: "template" (free) | "claude" (paid) | "auto"
══════════════════════════════════════════════════════════ */

function buildAISection() {
  const sec = document.getElementById('sec-ai');
  if (!sec) return;
  sec.style.display = FEATURES.aiContent ? 'block' : 'none';
  if (!FEATURES.aiContent) return;

  const mode    = getAIMode();
  const badge   = document.getElementById('ai-mode-badge');
  const footer  = document.getElementById('ai-footer-mode');
  if (mode === 'claude') {
    if (badge)  badge.innerHTML = '<span class="ai-badge-claude">⚡ Claude AI mode</span>';
    if (footer) footer.textContent = '⚡ Claude AI mode active';
  } else {
    if (badge)  badge.innerHTML = '<span class="ai-badge-free">✅ Free template mode</span>';
    if (footer) footer.textContent = '✅ Free template mode — zero cost';
  }
}

function getAIMode() {
  if (FEATURES.aiMode === 'claude' && FEATURES.claudeApiKey) return 'claude';
  if (FEATURES.aiMode === 'template') return 'template';
  // auto: use claude if key exists
  return FEATURES.claudeApiKey ? 'claude' : 'template';
}

async function generateContent() {
  if (!FEATURES.aiContent) return;
  const mode     = getAIMode();
  const platform = document.getElementById('ai-platform')?.value || 'instagram';
  const type     = document.getElementById('ai-type')?.value     || 'offer';
  const details  = document.getElementById('ai-details')?.value  || '';
  const tone     = document.getElementById('ai-tone')?.value     || 'warm';
  const lang     = document.getElementById('ai-lang')?.value     || 'english';

  showAILoading(true);

  try {
    let variants;
    if (mode === 'claude') {
      variants = await generateWithClaude(platform, type, details, tone, lang);
    } else {
      variants = generateWithTemplates(platform, type, details, tone, lang);
    }
    renderAIVariants(variants);
  } catch (err) {
    showAIError(`${err.message}`);
  } finally {
    showAILoading(false);
  }
}

/* ── Template Engine (100% free, offline-capable) ────────── */
function generateWithTemplates(platform, type, details, tone, lang) {
  const shop  = SHOP.name;
  const city  = SHOP.address?.city || 'your city';
  const phone = SHOP.phone || '';
  const web   = SHOP.website || '';
  const cur   = SHOP.currency || '₹';
  const hs    = SHOP.homeService;

  // Gather real services from config
  const allSvcs  = [...(SERVICES.male||[]),...(SERVICES.female||[]),...(SERVICES.kids||[]),...(SERVICES.occasions||[])];
  const randSvc  = () => allSvcs[Math.floor(Math.random()*allSvcs.length)];
  const svcList  = allSvcs.slice(0,4).map(s=>s.name).join(', ');
  const price    = allSvcs[0]?.price ? `${cur}${allSvcs[0].price}` : '';

  // Hashtag banks by category
  const hashtagBanks = {
    instagram:  `#${shop.replace(/\s/g,'')} #salon #hairstyle #beauty #${city.toLowerCase()}salon #haircut #glowup #salonsofinstagram #beautytips #selfcare`,
    instagram_reels: `#reels #salon #hairreels #beautyreel #glowup #haircut #hairtransformation #trending #viralreels`,
    instagram_story: '',
    facebook:   `#${city}Salon #Beauty`,
    whatsapp:   '',
    youtube:    '',
    any:        `#salon #beauty #haircut #${city.toLowerCase()}`,
  };
  const tags   = hashtagBanks[platform] || hashtagBanks.any;
  const cta    = platform==='whatsapp' ? `Book now: ${phone}` : `Book via our website or WhatsApp: ${phone}`;
  const emojis = { warm:['💕','🌸','✨','💫'], professional:['💎','✦','—','·'], exciting:['🔥','💥','⚡','🎉'], minimal:['·','—','',''] };
  const em     = emojis[tone]||emojis.warm;

  // Template library — 3 variants per type
  const templates = {
    offer: [
      `${em[0]} Big news at ${shop}!\n\n${details||'Exclusive offer'} just for you.\n\nTreat yourself to premium ${svcList} and more — at prices that make you smile.\n\n${cta}\n\n${tags}`,
      `Why wait? ${details||'Our special offer is live'} at ${shop} ${city}. ${em[1]}\n\nExpert stylists. Premium products. Real results.\n\n📅 Limited slots available — book yours today!\n${phone ? `📞 ${phone}` : ''} ${web ? `🌐 ${web}` : ''}\n\n${tags}`,
      `Heads up, gorgeous! ${em[2]}\n\n${shop} is running ${details||'a limited-time special'}. This is your sign to book that appointment you've been putting off! ${em[3]}\n\n👇 ${cta}\n\n${tags}`,
    ],
    service: [
      `Spotlight: ${details||randSvc()?.name||'Our signature service'} ${em[0]}\n\nAt ${shop}, every service is crafted with care. Our ${details||'expert stylists'} will leave you looking and feeling incredible.\n\nStarting from ${price||'affordable prices'}.\n\n📍 ${city} | ${cta}\n\n${tags}`,
      `Have you tried our ${details||randSvc()?.name||'services'} yet? ${em[1]}\n\nHere's what makes it special: we use only premium products, take time to understand what YOU want, and deliver results you'll love.\n\nBook at ${shop}. ${cta}\n\n${tags}`,
      `${details||'Transformation'} starts here. ${em[2]}\n\n${shop} — where every visit feels like a treat. Our team is ready to give you the look you've been dreaming of.\n\n${cta}\n${tags}`,
    ],
    bridal: [
      `Your big day deserves the best. ${em[0]}\n\n${shop} offers complete bridal packages — makeup, hair, pre-bridal care, and more. We make sure you look breathtaking from morning to midnight.\n\n${details||'Bridal packages available'} — slots filling fast!\n\n📞 ${phone}\n${tags}`,
      `The countdown to your wedding begins now. ${em[1]}\n\nAt ${shop}, we've transformed brides across ${city} into absolute stunners. Our bridal team gives you the wedding look you've always imagined.\n\n${details||'Book your bridal consultation today'}\n${cta}\n${tags}`,
      `Love is in the air and so is your glow! ${em[2]}\n\n${shop} is booking bridal appointments. ${details||'Pre-bridal, trial, and D-day packages available.'} You deserve to feel extraordinary on your most special day.\n\n📩 ${cta}\n${tags}`,
    ],
    festival: [
      `Festival season is here! ${em[0]}\n\nGet your festive glow on at ${shop}. ${details||'Special festival offers on all services.'} Look your absolute best for every celebration.\n\n✨ Book early — slots fill up fast!\n${cta}\n${tags}`,
      `${details||'Celebrate'} in style with ${shop}! ${em[1]}\n\nFestival-ready hair and glowing skin are just an appointment away. Our team is ready to make you the star of every party.\n\n📅 ${cta}\n${tags}`,
      `It's the season to shine! ${em[2]}\n\n${shop} has got you covered with ${details||'fabulous festive looks'} — from quick touch-ups to full transformations. Don't wait, book now!\n\n${cta}\n${tags}`,
    ],
    tip: [
      `Pro tip from our stylists at ${shop} 💡\n\n${details||'Taking care of your hair between salon visits is just as important as the visit itself. Use a good sulfate-free shampoo, condition every wash, and trim every 6-8 weeks.'}\n\nWant personalised advice? Book a consultation with us!\n${cta}\n${tags}`,
      `Your weekly beauty tip from ${shop}! ${em[0]}\n\n${details||'Always apply a heat protectant before using any hot tools. It\'s a small step that makes a huge difference in keeping your hair healthy and shiny.'}\n\nFor professional care, visit us at ${city}.\n${phone}\n${tags}`,
      `Did you know? ${em[1]}\n\n${details||'The best time to get a haircut is when your hair is clean and dry — this gives your stylist the clearest picture of your natural texture and fall.'}\n\nBook your next session at ${shop}!\n${cta}\n${tags}`,
    ],
    review: [
      `Here's what our clients say about ${shop} ${em[0]}\n\n"${details||'Amazing experience! The team was so professional and the results were beyond what I expected. Will definitely be coming back!'}"\n\n⭐⭐⭐⭐⭐\n\nYour transformation is next. ${cta}\n${tags}`,
      `We love our clients, and they love us back! ${em[1]}\n\n"${details||'Best salon in the city! Friendly staff, great ambiance, and my hair has never looked better.'}"\n\nCome experience it yourself. ${cta} at ${shop}, ${city}.\n${tags}`,
      `Real results, real smiles. ${em[2]}\n\n${details||'Another happy client walks out of ' + shop + ' feeling like a million bucks!'}\n\nWhen was your last salon treat? Time to book! 📅\n${cta}\n${tags}`,
    ],
    home: [
      `We come to you! 🏠\n\n${shop} now offers home service in ${city}. ${details||'Get salon-quality treatments in the comfort of your own home.'}\n\nPerfect for busy schedules, new moms, or anyone who just loves being pampered at home!\n\n${cta}\n${tags}`,
      `No need to travel! ${em[0]}\n\n${shop}'s home service brings the salon experience right to your doorstep. ${details||'Hair, skin, bridal, and more — all at your home.'}\n\nBook your home service today!\n📞 ${phone}\n${tags}`,
      `Luxury at your doorstep. ${em[1]}\n\n${details||'Our expert stylists visit your home for a full salon experience.'} No traffic, no waiting — just you, relaxed and pampered by ${shop}.\n\n${cta}\n${tags}`,
    ],
    newservice: [
      `Exciting news! ${em[0]} We just launched ${details||'a brand new service'} at ${shop}!\n\nBe among the first to experience it. Our expert team has trained extensively to bring you the best possible results.\n\n🎉 Introductory pricing available — book now!\n${cta}\n${tags}`,
      `Something new is here at ${shop}! ${em[1]}\n\n${details||'A new service is now available, and you\'re going to love it.'} We believe in constantly elevating your experience, and this is our latest gift to you.\n\n${cta}\n${tags}`,
      `Meet our newest offering! ${em[2]}\n\n${shop} now proudly presents ${details||'our latest service'}. Crafted with care, using the finest products, by our skilled team in ${city}.\n\nEarly bird slots available — grab yours!\n${cta}\n${tags}`,
    ],
    video_script: [
      `🎬 REEL / SHORT VIDEO SCRIPT\n\n[Hook - 0-3 sec]\n"${details||'Your hair transformation starts here'} 🔥"\n\n[Content - 3-25 sec]\nShow: before-and-after clips of ${details||'a popular service'}\nVoiceover: "At ${shop} in ${city}, we believe everyone deserves to look and feel incredible. Watch the magic happen..."\n\n[CTA - Last 3 sec]\n"Book your slot today! Link in bio 👆"\n\nBackground music: Trending upbeat audio\n📍 ${city} | ${phone}`,
      `🎬 TALKING HEAD / TESTIMONIAL SCRIPT\n\n[Stylist on camera]\n"Hey guys! I'm here at ${shop} and today I'm going to show you ${details||'an incredible transformation'}. Let me walk you through exactly what we're doing and why it works so well for this hair type..."\n\n[During service shots]\nShow product, technique, step-by-step\n\n[Reveal]\n"And... the final result! Doesn't she look absolutely stunning? This is what we do every single day at ${shop}."\n\nEnd with contact + booking link.`,
      `🎬 STORY SERIES SCRIPT (5-part)\n\nStory 1: "POV: You just booked at ${shop} 🙌"\nStory 2: "This is what walking in feels like... [salon tour clip]"\nStory 3: "Meet your stylist... [introduce team member]"\nStory 4: "${details||'The transformation in progress'}... 👀"\nStory 5: "The reveal! Before vs After 🤩"\n\nAdd polls, questions & swipe-up links throughout.`,
    ],
    story_ideas: [
      `📱 5 INSTAGRAM STORY IDEAS FOR ${shop.toUpperCase()}\n\n1. "Rate your last haircut" 🎚️ poll (1-10 slider)\n2. "Would you try this look?" with a before/after — Yes/No poll\n3. Behind the scenes: "A day at the salon" — show setup, products, team\n4. "Ask our stylist anything" Q&A story box\n5. Client reveal countdown — tease the before, reveal after\n\n📌 Post consistently — 3-5 stories/day keeps you top of followers' feeds!`,
      `📱 5 FACEBOOK POST IDEAS FOR ${shop.toUpperCase()}\n\n1. Monday Motivation: share a stunning makeover with the story behind it\n2. "Did you know?" — a hair/skin care tip your followers can use today\n3. Client spotlight: share a review + their photo (with permission)\n4. Offer post: Limited-time deal with a clear expiry date\n5. Team introduction: "Meet our stylist" — builds trust and connection\n\n📌 Best posting times: Tue-Thu, 9-11am or 7-9pm`,
      `📱 5 WHATSAPP BROADCAST IDEAS FOR ${shop.toUpperCase()}\n\n1. Weekly slot reminder: "We have openings this weekend — book now!"\n2. Festival special: "Happy [festival]! Here's a special offer just for our VIP clients"\n3. New service alert: "We just added [service] — be the first to try it!"\n4. Tip of the week: A simple hair/skin tip they can use at home\n5. Booking reminder: "[Name], your appointment is tomorrow at [time] — see you soon!"\n\n📌 Keep broadcasts short, personal, and not more than 2-3 per week`,
    ],
    before_after: [
      `Before & After at ${shop} ${em[0]}\n\n${details||'What a transformation!'} Our client came in wanting a change, and we delivered. This is exactly why we love what we do.\n\nReady for your own glow-up? 💇\n${cta}\n${tags}`,
      `The power of a great stylist. ${em[1]}\n\nBefore → After at ${shop}, ${city}.\n\n${details||'Every client deserves to feel beautiful, and every transformation tells a story.'}\n\n📅 Book yours today!\n${phone}\n${tags}`,
      `Swipe to see the magic! ✨\n\n${shop} specialises in ${details||'stunning transformations that make our clients feel like the best version of themselves'}.\n\nYour before photo is waiting. Your after photo? We'll create it together.\n\n${cta}\n${tags}`,
    ],
    team: [
      `Meet the magic makers! ${em[0]}\n\n${details||'Our team at ' + shop + ' is passionate, skilled, and dedicated to making you look and feel incredible.'} Each stylist brings years of training and a genuine love for their craft.\n\nCome say hi and let us work our magic!\n${cta}\n${tags}`,
      `Behind every great look is a great stylist. ${em[1]}\n\nIntroducing ${details||'our talented team'} at ${shop}, ${city}. They're not just stylists — they're artists who listen, create, and care.\n\nBook with us today!\n${phone}\n${tags}`,
      `People behind the perfection. ${em[2]}\n\n${shop}'s team takes pride in every single client. ${details||'Whether it\'s a quick trim or a complete makeover, you\'re in expert hands.'}\n\nWe can't wait to meet you!\n${cta}\n${tags}`,
    ],
  };

  // Adapt for platform
  const rawVariants = templates[type] || templates.offer;
  return rawVariants.map(v => {
    if (platform === 'whatsapp') {
      // Strip hashtags for WhatsApp, keep short
      return v.replace(/#[\w]+/g,'').replace(/\n\n\n+/g,'\n\n').trim();
    }
    if (platform === 'youtube') {
      // Add video description structure
      return v + `\n\n─────────────────\n📍 ${SHOP.name} | ${city}\n📞 ${phone}\n🌐 ${web}\n─────────────────`;
    }
    return v;
  });
}

/* ── Claude API mode ─────────────────────────────────────── */
async function generateWithClaude(platform, type, details, tone, lang) {
  const apiKey = FEATURES.claudeApiKey;
  const platformDesc = {
    instagram:'Instagram feed post (max 2200 chars, use emoji, 5-8 hashtags)',
    instagram_reels:'Instagram Reels caption (punchy hook, max 150 chars, 3-5 hashtags)',
    instagram_story:'Instagram Story text (very short, max 3 lines, no hashtags)',
    facebook:'Facebook post (conversational, 1-3 paragraphs, 1-2 hashtags)',
    whatsapp:'WhatsApp Status or broadcast (under 200 chars, no hashtags, personal tone)',
    youtube:'YouTube video description (structured, include timestamps section, links at end)',
    any:'Social media post (flexible format)',
  };
  const typeDesc = {
    offer:'special offer or discount announcement',service:'service spotlight',
    bridal:'bridal/wedding season promotion',festival:'festival or seasonal post',
    tip:'hair or beauty tip',review:'customer review feature',home:'home service promotion',
    newservice:'new service launch',video_script:'video/reels script',
    story_ideas:'5 social media story/content ideas',before_after:'before and after transformation post',
    team:'team member or stylist feature post',
  };
  const toneDesc = {warm:'warm and friendly',professional:'professional and elegant',exciting:'exciting and energetic',minimal:'clean and minimal'};
  const allSvcs  = [...(SERVICES.male||[]),...(SERVICES.female||[]),...(SERVICES.kids||[]),...(SERVICES.occasions||[])];
  const svcList  = allSvcs.map(s=>`${s.name} (${SHOP.currency}${s.price})`).join(', ');

  const prompt = `You are a social media copywriter for a salon called "${SHOP.name}" in ${SHOP.address?.city||'India'}.

Salon bio: ${SHOP.salonBio||SHOP.name+' is a premium salon offering expert hair and beauty services.'}
Services: ${svcList}
Phone: ${SHOP.phone||''}  Website: ${SHOP.website||''}

Write 3 distinct ${typeDesc[type]||'promotional'} captions for: ${platformDesc[platform]||'social media'}
Tone: ${toneDesc[tone]||'warm and friendly'}
Language: ${lang==='hinglish'?'Hinglish (mix of Hindi words in English script, feels natural and local)':lang==='hindi'?'Hindi (Devanagari script)':'English'}
${details?'Extra context: '+details:''}

Each variant should have a different angle:
1. Emotional / personal connection
2. Benefit / results focused  
3. Call-to-action / urgency driven

Separate variants with exactly: ---NEXT---
Do not label or number variants. Just write the caption content directly.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'x-api-key': apiKey,
      'anthropic-version':'2023-06-01',
      'anthropic-dangerous-direct-browser-access':'true',
    },
    body: JSON.stringify({
      model:'claude-sonnet-4-20250514', max_tokens:1400,
      messages:[{role:'user',content:prompt}],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(()=>({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }
  const data    = await res.json();
  const text    = data.content?.map(c=>c.text||'').join('') || '';
  const variants = text.split('---NEXT---').map(v=>v.trim()).filter(Boolean);
  if (!variants.length) throw new Error('No content returned — try again');
  return variants;
}

/* ── AI UI helpers ───────────────────────────────────────── */
function renderAIVariants(variants) {
  const labels = ['💡 Emotional / Personal','🎯 Benefit Focused','⚡ Action Driven'];
  const varEl  = document.getElementById('ai-variants');
  if (varEl) {
    varEl.innerHTML = variants.map((v,i) => `
      <div class="ai-variant" onclick="copyCaption(this, '${encodeURIComponent(v)}')">
        <div class="ai-variant-label">${labels[i]||`Variant ${i+1}`}</div>
        <div class="ai-variant-text">${e(v)}</div>
        <span class="ai-variant-copy">📋 Copy</span>
      </div>`).join('');
  }
  document.getElementById('ai-results').style.display = 'block';
  document.getElementById('ai-error').style.display   = 'none';
}

function showAILoading(show) {
  document.getElementById('ai-loading').style.display = show ? 'block' : 'none';
  if (show) document.getElementById('ai-results').style.display = 'none';
  const btn = document.getElementById('ai-gen-btn');
  const txt = document.getElementById('ai-btn-text');
  if (btn) btn.disabled = show;
  if (txt) txt.textContent = show ? 'Writing…' : '✨ Generate Content';
}

function showAIError(msg) {
  const el = document.getElementById('ai-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  showAILoading(false);
}

function copyCaption(el, encoded) {
  const text  = decodeURIComponent(encoded);
  const badge = el.querySelector('.ai-variant-copy');
  navigator.clipboard.writeText(text).then(() => {
    if (badge) { badge.textContent='✓ Copied!'; badge.classList.add('copied'); }
    toast('✅ Caption copied to clipboard!');
    setTimeout(()=>{ if(badge){badge.textContent='📋 Copy';badge.classList.remove('copied');} }, 2500);
  }).catch(()=>{ toast('Long press the text to copy manually'); });
}

/* ── Gallery ─────────────────────────────────────────────── */
function buildGallery() {
  const sec  = document.getElementById('sec-gallery');
  const grid = document.getElementById('gallery-grid');
  if (!sec||!grid) return;
  const items = (SHOP.gallery||[]).filter(g=>g?.image);
  if (!FEATURES.gallery||!items.length) { sec.style.display='none'; return; }
  sec.style.display=''; window._gal=items;
  grid.innerHTML = items.map((g,i)=>`
    <div class="gallery-item" onclick="openLB(${i})">
      <img src="${g.image}" alt="${e(g.caption||'')}" loading="lazy" onerror="this.closest('.gallery-item').style.display='none'">
      ${g.caption?`<div class="gallery-caption">${e(g.caption)}</div>`:''}
    </div>`).join('');
}
function openLB(i) {
  const lb=document.getElementById('lightbox'), img=document.getElementById('lightbox-img');
  if(!lb||!img||(!(window._gal||[])[i])) return;
  img.src=window._gal[i].image; lb.classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox')?.classList.remove('open'); }
document.addEventListener('keydown',ev=>{ if(ev.key==='Escape') closeLightbox(); });

/* ── QR ──────────────────────────────────────────────────── */
function buildQR() {
  const sec=document.getElementById('sec-qr'),wrap=document.getElementById('qr-wrap'),urlEl=document.getElementById('qr-url');
  if (!sec) return;
  if (!FEATURES.qrCode) { sec.style.display='none'; return; }
  sec.style.display='';
  const url=SHOP.website||window.location.href;
  if (urlEl) urlEl.textContent=url;
  const tc={'luxury-burgundy':{d:'#6b1e3b',l:'#fdf6ee'},'emerald-spa':{d:'#1a5c3a',l:'#f4f9f6'},'midnight-gold':{d:'#e2b04a',l:'#0f0f1a'},'blush-rose':{d:'#9d3d6b',l:'#fef5f8'}};
  const c=tc[SHOP.theme]||tc['luxury-burgundy'];
  if (typeof QRCode!=='undefined') new QRCode(wrap,{text:url,width:176,height:176,colorDark:c.d,colorLight:c.l,correctLevel:QRCode.CorrectLevel.M});
  else { const img=document.createElement('img'); img.src=`https://api.qrserver.com/v1/create-qr-code/?size=176x176&data=${encodeURIComponent(url)}`; img.style.borderRadius='8px'; wrap?.appendChild(img); }
}

/* ── Location ────────────────────────────────────────────── */
function buildLocation() {
  const sec=document.getElementById('sec-location');
  if (!sec) return;
  if (!FEATURES.locationSection) { sec.style.display='none'; return; }
  sec.style.display='';
  const el=document.getElementById('address-content'), map=document.getElementById('map-wrap'), a=SHOP.address||{};
  const lines=[a.line1,a.line2,[a.city,a.state].filter(Boolean).join(', ')+(a.pincode?` — ${a.pincode}`:'')].filter(Boolean).join('<br>');
  if (el) {
    let h=lines?`<div class="addr-line">${lines}</div>`:'';
    if(SHOP.phone) h+=`<div class="addr-sub">📞 <a href="tel:${SHOP.phone}">${e(SHOP.phone)}</a></div>`;
    if(SHOP.email) h+=`<div class="addr-sub">✉️ <a href="mailto:${SHOP.email}">${e(SHOP.email)}</a></div>`;
    if(SHOP.hours?.length) h+=`<div class="hours-block"><h4>Opening Hours</h4>${SHOP.hours.map(h=>`<div class="hours-row"><span>${e(h.days)}</span><span>${e(h.time)}</span></div>`).join('')}</div>`;
    if(SHOP.googleMapsLink) h+=`<a href="${SHOP.googleMapsLink}" target="_blank" class="dir-btn">📍 Get Directions</a>`;
    el.innerHTML=h;
  }
  if (map) {
    if(SHOP.googleMapsEmbed) map.innerHTML=`<iframe src="${SHOP.googleMapsEmbed}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    else if(SHOP.googleMapsLink) map.innerHTML=`<div class="map-placeholder"><span>🗺️</span><p>${e(a.city||'')}</p><a href="${SHOP.googleMapsLink}" target="_blank" class="dir-btn" style="margin-top:.5rem">Open in Maps</a></div>`;
  }
}

/* ── Footer ──────────────────────────────────────────────── */
function buildFooter() {
  const el=document.getElementById('footer-inner'); if (!el) return;
  const C=CREATOR;
  const parts=[
    C.builtBy   &&`Built by <a href="${C.builtByLink||'#'}" target="_blank" rel="noopener"><strong>${e(C.builtBy)}</strong></a>`,
    C.tagline   &&e(C.tagline),
    C.contact   &&`<a href="mailto:${C.contact}">${e(C.contact)}</a>`,
    C.phone     &&e(C.phone),
  ].filter(Boolean).join(' &nbsp;·&nbsp; ');
  el.innerHTML=`<div class="footer-inner"><div class="footer-creator">${parts}</div><div class="footer-badge">${C.version?`<span>${e(C.version)}</span><br>`:''}<span>© ${C.year||new Date().getFullYear()}</span></div><div class="footer-copy">Designed &amp; developed by ${C.builtBy?`<a href="${C.builtByLink||'#'}" target="_blank">${e(C.builtBy)}</a>`:'WebCraft Studio'} · All rights reserved.</div></div>`;
}

/* ── Scroll top ──────────────────────────────────────────── */
function bindScrollTop() {
  const btn=document.getElementById('scroll-top'); if(!btn) return;
  window.addEventListener('scroll',()=>btn.classList.toggle('show',scrollY>350),{passive:true});
  btn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
}

/* ── Utilities ───────────────────────────────────────────── */
function toast(msg) {
  const el=document.getElementById('toast'); if(!el) return;
  el.textContent=msg; el.classList.add('show'); clearTimeout(el._t);
  el._t=setTimeout(()=>el.classList.remove('show'),2800);
}
function e(s) { return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function fmtDate(d) { if(!d) return ''; try{return new Date(d+'T00:00:00').toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});}catch(e){return d;} }
document.addEventListener('click',ev=>{ if(ev.target.id==='modal-overlay') closeModal(); if(ev.target.id==='lightbox') closeLightbox(); });
