// ============================================================
//  GOOGLE APPS SCRIPT — Master Salon Booking Logger
//  
//  YOUR MASTER SHEET — Logs bookings from ALL your salon clients
//  into one Google Sheet with:
//    • A "Summary" tab (all salons combined)
//    • One tab per salon (named after the salon)
//    • Auto-formatting, color coding, frozen headers
//
//  ─── SETUP (5 minutes) ────────────────────────────────────
//
//  1. Go to script.google.com
//  2. Click "+ New project"
//  3. Delete all existing code in the editor
//  4. Paste this ENTIRE file
//  5. Click 💾 Save (name it "Salon Booking Logger")
//  6. Click "Deploy" → "New deployment"
//  7. Click the gear ⚙ next to "Type" → select "Web app"
//  8. Set:
//       Execute as: Me
//       Who has access: Anyone
//  9. Click "Deploy" → Authorize → Copy the Web App URL
// 10. Paste the URL into each salon's config/features.js
//     under: sheetsWebhookUrl: "YOUR_URL_HERE"
//
//  That's it. Every booking from every salon now appears here.
//  ─────────────────────────────────────────────────────────
//
//  UPDATING THE SCRIPT LATER:
//  If you change this code, go to Deploy → Manage deployments
//  → Edit (pencil) → change version to "New version" → Deploy
// ============================================================

// ── CONFIG ────────────────────────────────────────────────
const SUMMARY_SHEET = '📊 All Bookings';  // Master summary tab name
const THEME_COLOR   = '#6b1e3b';          // Header background (burgundy)
const HEADER_TEXT   = '#FFFFFF';
const PENDING_COLOR = '#fef9c3';          // Yellow for pending rows
const DONE_COLOR    = '#dcfce7';          // Green for completed
const CANCEL_COLOR  = '#fee2e2';          // Red for cancelled

const COLUMNS = [
  'Booking ID', 'Date & Time', 'Salon Name', 'Customer Name',
  'Phone', 'Email', 'Services Summary', 'Total (₹)',
  'Home Service', 'Special Requests', 'Status', 'Notes'
];

// ── HANDLE POST (called when website sends a booking) ─────
function doPost(e) {
  try {
    const raw  = e.postData.contents;
    const data = JSON.parse(raw);

    const ss   = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Write to master summary sheet
    const summarySheet = getOrCreateSheet(ss, SUMMARY_SHEET, true);
    appendBookingRow(summarySheet, data);

    // 2. Write to salon-specific tab
    const salonName  = (data.salonName || 'Unknown Salon').substring(0, 30);
    const salonSheet = getOrCreateSheet(ss, salonName, false);
    appendBookingRow(salonSheet, data);

    // 3. Send notification email to owner (if email provided in data)
    if (data.ownerEmail) {
      sendOwnerAlert(data);
    }

    // 4. Send confirmation email to customer (if they provided email)
    if (data.customerEmail) {
      sendCustomerConfirmation(data);
    }

    return jsonResponse({ success: true, bookingId: data.id });

  } catch (err) {
    Logger.log('Error: ' + err.message);
    return jsonResponse({ success: false, error: err.message });
  }
}

// ── GET (for testing the webhook is alive) ────────────────
function doGet(e) {
  const ss     = SpreadsheetApp.getActiveSpreadsheet();
  const count  = getTotalBookingCount(ss);
  return ContentService
    .createTextOutput(`✅ Salon Booking Logger is active\nTotal bookings logged: ${count}`)
    .setMimeType(ContentService.MimeType.TEXT);
}

// ── SHEET MANAGEMENT ──────────────────────────────────────
function getOrCreateSheet(ss, name, isSummary) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    setupSheetHeaders(sheet, isSummary);
    // Move summary sheet to first position
    if (isSummary) ss.setActiveSheet(sheet);
  }
  return sheet;
}

function setupSheetHeaders(sheet, isSummary) {
  // Set header row
  sheet.appendRow(COLUMNS);

  // Style header
  const headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
  headerRange.setBackground(isSummary ? '#1a0a12' : THEME_COLOR);
  headerRange.setFontColor(HEADER_TEXT);
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);

  // Freeze header row
  sheet.setFrozenRows(1);

  // Set column widths
  const widths = [130, 160, 160, 160, 130, 180, 280, 90, 100, 220, 100, 180];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Add filter
  sheet.getRange(1, 1, 1, COLUMNS.length).createFilter();

  // Summary tab gets extra styling
  if (isSummary) {
    sheet.getRange('A1:L1').setNote('Master log of all salon bookings. Auto-populated from websites.');
  }
}

function appendBookingRow(sheet, data) {
  const services = formatServices(data.services);
  const row = [
    data.id             || generateId(),
    formatTimestamp(data.timestamp),
    data.salonName      || 'Unknown',
    data.name           || '',
    data.phone          || '',
    data.customerEmail  || '',
    services,
    data.total          || 0,
    data.homeService    ? 'Yes' : 'No',
    data.special        || '',
    'Pending',
    '',  // Notes — filled manually by owner
  ];

  sheet.appendRow(row);

  // Color-code the status cell and row
  const lastRow    = sheet.getLastRow();
  const statusCell = sheet.getRange(lastRow, 11); // Status column
  statusCell.setBackground(PENDING_COLOR);

  // Zebra stripe for readability
  if (lastRow % 2 === 0) {
    sheet.getRange(lastRow, 1, 1, COLUMNS.length)
      .setBackground('#fdfaf7');
  }

  // Make phone number clickable-ish (plain text, easy to tap on mobile)
  sheet.getRange(lastRow, 5).setNote('Tap to call: ' + (data.phone || ''));
}

// ── EMAIL NOTIFICATIONS (via Gmail — free, no setup needed) ──
function sendOwnerAlert(data) {
  try {
    const services = formatServicesForEmail(data.services);
    const subject  = `📅 New Booking — ${data.name} | ${data.salonName}`;
    const body     = `
Hello,

You have a new booking at ${data.salonName}!

──────────────────────────
📋 BOOKING DETAILS
──────────────────────────
Booking ID : ${data.id}
Customer   : ${data.name}
Phone      : ${data.phone}
Email      : ${data.customerEmail || 'Not provided'}

SERVICES BOOKED:
${services}

Total Estimate : ₹${data.total}
Home Service   : ${data.homeService ? `Yes (+₹${data.homeServiceCharge || 0} travel charge)` : 'No — In-salon visit'}
Special Notes  : ${data.special || 'None'}
──────────────────────────

⚡ Confirm the appointment by calling or WhatsApp messaging the customer.

Booked via: ${data.website || 'Salon Website'}
    `;

    GmailApp.sendEmail(data.ownerEmail, subject, body);
  } catch (err) {
    Logger.log('Owner email failed: ' + err.message);
  }
}

function sendCustomerConfirmation(data) {
  try {
    const services = formatServicesForEmail(data.services);
    const subject  = `✅ Booking Received — ${data.salonName}`;
    const body     = `
Dear ${data.name},

Thank you for booking with ${data.salonName}! 🎉

We have received your booking request and will confirm it shortly via WhatsApp or phone.

──────────────────────────
YOUR BOOKING SUMMARY
──────────────────────────
Booking ID : ${data.id}
${services}

Total Estimate : ₹${data.total}
${data.homeService ? `Home Service   : Yes — we will come to you (+₹${data.homeServiceCharge || 0} travel charge)` : ''}
${data.special ? `Special Notes  : ${data.special}` : ''}
──────────────────────────

📍 Salon Address:
${data.salonAddress || data.salonName}

📞 Contact us: ${data.ownerPhone || ''}

If you need to reschedule or cancel, please contact us at least 2 hours before your appointment.

Looking forward to seeing you! 💇

— Team ${data.salonName}
    `;

    GmailApp.sendEmail(data.customerEmail, subject, body);
  } catch (err) {
    Logger.log('Customer email failed: ' + err.message);
  }
}

// ── HELPERS ───────────────────────────────────────────────
function formatServices(servicesArr) {
  if (!servicesArr || !servicesArr.length) return '';
  return servicesArr.map(s =>
    `${s.name} | ${s.date || 'TBD'} ${s.slot || ''} | ₹${s.price}${s.home ? ' [Home]' : ''}`
  ).join('\n');
}

function formatServicesForEmail(servicesArr) {
  if (!servicesArr || !servicesArr.length) return 'No services listed';
  return servicesArr.map(s =>
    `  • ${s.name}\n    Date: ${s.date ? formatDate(s.date) : 'To be confirmed'}\n    Time: ${s.slot || 'To be confirmed'}\n    Price: ₹${s.price}${s.home ? ' (Home service)' : ''}`
  ).join('\n\n');
}

function formatTimestamp(iso) {
  if (!iso) return new Date().toLocaleString('en-IN');
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day:'2-digit', month:'short', year:'numeric',
      hour:'2-digit', minute:'2-digit', hour12:true
    });
  } catch(e) { return iso; }
}

function formatDate(d) {
  if (!d) return '';
  try {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday:'short', day:'numeric', month:'short', year:'numeric'
    });
  } catch(e) { return d; }
}

function generateId() {
  return 'BK-' + Date.now().toString(36).toUpperCase();
}

function getTotalBookingCount(ss) {
  try {
    const sheet = ss.getSheetByName(SUMMARY_SHEET);
    return sheet ? Math.max(0, sheet.getLastRow() - 1) : 0;
  } catch(e) { return 0; }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── STATUS UPDATE FUNCTION (call from Sheet manually) ─────
// You can run this from Extensions → Macros after changing status cells
function colorCodeStatuses() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  sheets.forEach(sheet => {
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;
    for (let r = 2; r <= lastRow; r++) {
      const status = sheet.getRange(r, 11).getValue();
      let color = '';
      if (status === 'Pending')   color = PENDING_COLOR;
      if (status === 'Confirmed') color = '#dbeafe';
      if (status === 'Completed') color = DONE_COLOR;
      if (status === 'Cancelled') color = CANCEL_COLOR;
      if (color) sheet.getRange(r, 11).setBackground(color);
    }
  });
  SpreadsheetApp.getUi().alert('Status colors updated!');
}
