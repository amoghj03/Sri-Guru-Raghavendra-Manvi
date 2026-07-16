/**
 * SGR Sahakari Sangha — Sheets API (Google Apps Script)
 *
 * THREE SHEETS IN THE SAME SPREADSHEET:
 *
 * ── Sheet name: "News" ──────────────────────────────────────
 *   Row 1 = headers (skipped)
 *   A: type       — "news" or "notice"
 *   B: date       — YYYY-MM-DD  (e.g. 2025-06-10)
 *   C: title_en   — English title
 *   D: title_kn   — Kannada title
 *   E: body_en    — English body text
 *   F: body_kn    — Kannada body text
 *   G: active     — TRUE to show, FALSE to hide
 *   H: doc_link   — (optional) Google Drive / PDF link
 *
 * ── Sheet name: "Progress" ──────────────────────────────────
 *   Row 1 = headers (skipped)
 *   A: year       — e.g. 2024-25
 *   B: share      — Share Capital (number)
 *   C: fd         — Fixed Deposits (number)
 *   D: capital    — Working Capital (number)
 *   E: loans      — Loans & Advances (number)
 *   F: profit     — Net Profit (number)
 *
 * ── Sheet name: "Schemes" ──────────────────────────────────
 *   Row 1 = headers (skipped)
 *   A: type        — "fd", "rd", "special", or "bonus"
 *   B: rate        — FD only (e.g. "6.00%")
 *   C: duration_en — FD/RD (e.g. "30 to 60 days")
 *   D: duration_kn — FD/RD (e.g. "30 ರಿಂದ 60 ದಿನಗಳು")
 *   E: invest      — RD only (e.g. "₹1,000")
 *   F: maturity    — RD only (e.g. "₹1,00,000")
 *   G: name_en     — Special only (e.g. "Double Gain")
 *   H: name_kn     — Special only (e.g. "ಡಬಲ್ ಗೇನ್")
 *   I: period_en   — Special only (e.g. "6 years (72 months)")
 *   J: period_kn   — Special only (e.g. "6 ವರ್ಷ (72 ತಿಂಗಳು)")
 *   K: note_en     — Special/Bonus note text
 *   L: note_kn     — Special/Bonus note text (Kannada)
 *   M: active      — TRUE to show, FALSE to hide
 *
 * DEPLOY:
 * 1. Open Apps Script → paste this code
 * 2. Deploy → New Deployment → Web App
 *    - Execute as: Me  |  Who has access: Anyone
 * 3. Paste Web App URL into src/data/society.js → newsApiUrl
 */

const SHEET_ID = '1czf_vlbNNGMpBFDF9jdl4Vgat7lZQlqKzNpu-PfVr0E';

function doGet() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);

    const news     = readNews(ss);
    const progress = readProgress(ss);
    const schemes  = readSchemes(ss);

    return ContentService
      .createTextOutput(JSON.stringify({ news, progress, schemes }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ news: [], progress: [], schemes: null, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* ── News sheet ─────────────────────────────────────────────── */
function readNews(ss) {
  const sheet = ss.getSheetByName('News');
  if (!sheet) return [];

  const rows  = sheet.getDataRange().getValues();
  const items = [];

  for (let i = 1; i < rows.length; i++) {
    const [type, date, title_en, title_kn, body_en, body_kn, active, doc_link] = rows[i];
    if (String(active).toUpperCase() !== 'TRUE') continue;
    if (!type || !date || !title_en) continue;

    items.push({
      id:       i,
      type:     String(type).trim().toLowerCase(),
      date:     formatDate(date),
      title:    { en: String(title_en).trim(), kn: String(title_kn || '').trim() || String(title_en).trim() },
      body:     { en: String(body_en  || '').trim(), kn: String(body_kn || '').trim() },
      doc_link: String(doc_link || '').trim() || null,
    });
  }

  return items.sort((a, b) => b.date.localeCompare(a.date));
}

/* ── Progress sheet ─────────────────────────────────────────── */
function readProgress(ss) {
  const sheet = ss.getSheetByName('Progress');
  if (!sheet) return [];

  const rows  = sheet.getDataRange().getValues();
  const items = [];

  for (let i = 1; i < rows.length; i++) {
    const [year, share, fd, capital, loans, profit] = rows[i];
    if (!year) continue;

    items.push({
      year:    String(year).trim(),
      share:   Number(share)   || 0,
      fd:      Number(fd)      || 0,
      capital: Number(capital) || 0,
      loans:   Number(loans)   || 0,
      profit:  Number(profit)  || 0,
    });
  }

  return items;
}

/* ── Schemes sheet ──────────────────────────────────────────── */
function readSchemes(ss) {
  const sheet = ss.getSheetByName('Schemes');
  if (!sheet) return { fd: [], rd: [], special: [], bonus: null };

  const rows = sheet.getDataRange().getValues();
  const fd = [], rd = [], special = [];
  let bonus = null;

  for (let i = 1; i < rows.length; i++) {
    const [type, rate, duration_en, duration_kn, invest, maturity,
           name_en, name_kn, period_en, period_kn, note_en, note_kn, active] = rows[i];

    if (String(active).toUpperCase() !== 'TRUE') continue;
    const t = String(type).trim().toLowerCase();

    if (t === 'fd') {
      fd.push({
        rate:     String(rate).trim(),
        duration: { en: String(duration_en).trim(), kn: String(duration_kn).trim() },
      });
    } else if (t === 'rd') {
      rd.push({
        invest:   String(invest).trim(),
        duration: { en: String(duration_en).trim(), kn: String(duration_kn).trim() },
        maturity: String(maturity).trim(),
      });
    } else if (t === 'special') {
      special.push({
        name:   { en: String(name_en).trim(),   kn: String(name_kn).trim()   },
        period: { en: String(period_en).trim(),  kn: String(period_kn).trim()  },
        note:   { en: String(note_en).trim(),    kn: String(note_kn).trim()    },
      });
    } else if (t === 'bonus') {
      bonus = { en: String(note_en).trim(), kn: String(note_kn).trim() };
    }
  }

  return { fd, rd, special, bonus };
}

/* ── Helpers ────────────────────────────────────────────────── */
function formatDate(val) {
  if (!val) return '';
  if (val instanceof Date) {
    const y = val.getFullYear();
    const m = String(val.getMonth() + 1).padStart(2, '0');
    const d = String(val.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(val).trim();
}
