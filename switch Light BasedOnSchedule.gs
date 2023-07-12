
function controlLightBasedOnSchedule() {
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("recode");

// 開始時間、終了時間を取得する
var startTime = sheet.getRange("A2").getValue();
var endTime = sheet.getRange("B2").getValue();

// 現在の時間を取得する
var now = new Date();
var currentHour = now.getHours().toString().padStart(2, '0');
var currentMinute = now.getMinutes().toString().padStart(2, '0');
var currentTime = currentHour + currentMinute;

// 開始時間に達したかをチェックする
if (currentTime === startTime) {
setLight(cmd = "on")
}

// 終了時間に達したかをチェックする
if (currentTime === endTime) {
setLight(cmd = "off")
}
}