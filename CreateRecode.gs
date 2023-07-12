function CreateRecodeSheet() {
  var sheetName = "recode"; // シート名
  var startTime = "0800"; // デフォルト開始時間
  var endTime = "1800"; // デフォルト終了時間
  
  PropertiesService.getScriptProperties().deleteProperty('lastRow');
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // スプレッドシートを取得
  var sheet = spreadsheet.getSheetByName(sheetName); // シートを取得

  if (sheet) {
    Logger.log("名前が'" + sheetName + "'のシートは既に存在しています！");
    setScheduleTrigger(); // トリガーを設定
    return sheet;
  }

  // 新しいシートを作成
  sheet = spreadsheet.insertSheet(sheetName);

  // 開始時間とタイトルを設定
  sheet.getRange("A1").setValue("開始時間"); // 開始時間
  sheet.getRange("A2").setNumberFormat("@").setValue("'" + startTime);

  // 終了時間とタイトルを設定
  sheet.getRange("B1").setValue("終了時間"); // 終了時間
  sheet.getRange("B2").setNumberFormat("@").setValue("'" + endTime);

  // 日付とタイトルを設定
  sheet.getRange("C1").setValue("日付"); // 本日の使用時間
  sheet.getRange('C:C').setNumberFormat(formatA='yyyy/MM/dd HH:mm:ss')
  
  
   // 本日の使用時間とタイトルを設定
  sheet.getRange("D1").setValue("使用時間"); // 本日の使用時間
  // sheet.getRange("D2").setValue("0時間0分");
 
  Logger.log("名前が'" + sheetName + "'のシートを作成し、開始時間、終了時間、日付、使用時間を設定しました！");
  setScheduleTrigger(); // トリガーを設定
  return sheet;
}
