function deleteSheet() {
  var sheetName = "NatureRemo"; // 存储数据的工作表名称
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // 获取当前活动的电子表格
  var sheet = spreadsheet.getSheetByName(sheetName); // 获取指定名称的工作表

  if (sheet) {
    spreadsheet.deleteSheet(sheet); // 删除工作表
    Logger.log(sheetName + "'のシートを削除しました。");
  } else {
    Logger.log(sheetName + "'のシートは存在していない。");
  }
  //开始新的数据记录
  ScriptApp.newTrigger("fillNatureRemo")
    .timeBased()
    .everyMinutes(1)
    .create();
}
