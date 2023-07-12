function change_start_time(startTime) {
  var sheetName = "recode"; // シート名
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // スプレッドシートを取得
  var sheet = spreadsheet.getSheetByName(sheetName); // シートを取得

  // 開始時間とタイトルを設定
  sheet.getRange("A2").setNumberFormat("@").setValue("'" + startTime);
}

function change_end_time(endTime) {
  var sheetName = "recode"; // シート名
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // スプレッドシートを取得
  var sheet = spreadsheet.getSheetByName(sheetName); // シートを取得

  // 開始時間とタイトルを設定
  sheet.getRange("B2").setNumberFormat("@").setValue("'" + endTime);
}

