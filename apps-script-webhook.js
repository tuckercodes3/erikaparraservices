// ========================================
// PASTE THIS INTO GOOGLE APPS SCRIPT
// ========================================
// 1. Open the Google Sheet: https://docs.google.com/spreadsheets/d/1fUcFlcZmU7ALFt1kTA-5UTpz04bzVofDbXv3Zrk51Yw/edit
// 2. Go to Extensions → Apps Script
// 3. Delete any existing code, paste this entire file
// 4. Click Deploy → New Deployment
// 5. Type: Web App
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. Click Deploy, authorize when prompted
// 9. Copy the Web App URL
// 10. Paste it into the quiz HTML where it says APPS_SCRIPT_URL
// ========================================

const SHEET_ID = '1fUcFlcZmU7ALFt1kTA-5UTpz04bzVofDbXv3Zrk51Yw';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    const now = new Date();
    const timestamp = Utilities.formatDate(now, 'America/Los_Angeles', 'yyyy-MM-dd HH:mm:ss');
    
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.phone || '',
      data.caseType || '',
      data.status || '',
      data.entryMethod || '',
      data.urgency || '',
      data.location || '',
      data.lang || 'es'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Erika Parra Leads webhook is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
