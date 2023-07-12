function setScheduleTrigger() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("recode"); // "recode"という名前のシートを取得
  var startTime = sheet.getRange("A2").getValue(); // 開始時間を取得
  var endTime = sheet.getRange("B2").getValue(); // 終了時間を取得
  
  // 既存のトリガーを削除
  var triggers = ScriptApp.getProjectTriggers(); 
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]); 
  }

  var currentDateTime = new Date(); // 現在の日時を取得
  var currentHour = currentDateTime.getHours().toString().padStart(2, '0'); // 現在の時間（時）を取得し、2桁にパディング
  var currentMinute = currentDateTime.getMinutes().toString().padStart(2, '0'); // 現在の時間（分）を取得し、2桁にパディング
  var currentDateTimeString = currentHour + currentMinute; // 現在の時刻を文字列に変換

  var startTriggerTime = new Date(); // 開始トリガーの日時を設定
  startTriggerTime.setHours(startTime.substring(0, 2)); // 開始時間の時を設定
  startTriggerTime.setMinutes(startTime.substring(2, 4)); // 開始時間の分を設定
  startTriggerTime.setSeconds(0); // 秒を0に設定

  
  var deleTriggerTime = new Date(); 
  deleTriggerTime.setHours(startTime.substring(0, 2)); 
  deleTriggerTime.setMinutes(startTime.substring(2, 4) - 2); 
  deleTriggerTime.setSeconds(0); 
  
  if (currentDateTimeString > startTime) {
    startTriggerTime.setDate(startTriggerTime.getDate() + 1);
    deleTriggerTime.setDate(deleTriggerTime.getDate() + 1); // 明日の同じ時刻に設定
  }
  
  //今は開始と終了時間内ならデータ記録のトリガーを設定
  if (currentDateTimeString > startTime && currentDateTimeString < endTime){
    ScriptApp.newTrigger("fillNatureRemo")
    .timeBased()
    .everyMinutes(1)
    .create();
    }
  
  ScriptApp.newTrigger("deleteSheet")
    .timeBased()
    .at(deleTriggerTime)
    .create();

  ScriptApp.newTrigger("controlLightBasedOnSchedule")
    .timeBased()
    .at(startTriggerTime)
    .create();

  var endTriggerTime = new Date(); // 終了トリガーの日時を設定
  endTriggerTime.setHours(endTime.substring(0, 2)); // 終了時間の時を設定
  endTriggerTime.setMinutes(endTime.substring(2, 4)); // 終了時間の分を設定
  endTriggerTime.setSeconds(0); // 秒を0に設定

  if (currentDateTimeString > endTime) {
    endTriggerTime.setDate(endTriggerTime.getDate() + 1); // 明日の同じ時刻に設定
  }

  ScriptApp.newTrigger("controlLightBasedOnSchedule")
    .timeBased()
    .at(endTriggerTime)
    .create();

 // エアコンの使用時間を計算するトリガーを設定
  var calculateTriggerTime = new Date(endTriggerTime);
  calculateTriggerTime.setMinutes(calculateTriggerTime.getMinutes() + 1); // 終了時間の1分後に設定
  
  ScriptApp.newTrigger("calculateAndRecordLightUsageDuration")
    .timeBased()
    .at(calculateTriggerTime)
    .create();
  Logger.log("トリガーが設定されました。" + startTime + "と" + endTime + "に開始と終了時間を設定しました。");
}
