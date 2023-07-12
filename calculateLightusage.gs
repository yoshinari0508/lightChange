function calculateAndRecordLightUsageDuration() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var recordSheet = ss.getSheetByName('recode');
  var dateRange = recordSheet.getRange('C2:C');
  var totalDurationRange = recordSheet.getRange('D2:D');

  var dataSheet = ss.getSheetByName('NatureRemo');
  var data = dataSheet.getDataRange().getValues();
  var totalDuration = 0;
  var startTime = null;

  // 计算使用时间
  for (var i = 1; i < data.length; i++) {
    var currentACState = data[i][8]; // 根据Light_State的位置进行调整

    if (currentACState === 1 && startTime === null) {
      startTime = new Date(data[i][0]);
    } else if (currentACState === 0 && startTime !== null) {
      var endTime = new Date(data[i][0]);
      var duration = endTime - startTime;
      totalDuration += duration;
      startTime = null;
    }
  }

  // 将总时长转换为小时和分钟
  var totalMinutes = Math.round(totalDuration / (1000 * 60));
  var hours = Math.floor(totalMinutes / 60);
  var minutes = totalMinutes % 60;

  var formattedDuration = hours + '時間 ' + minutes + '分';

  // 获取上次保存的行号
  var lastRow = PropertiesService.getScriptProperties().getProperty('lastRow');

  // 更新日期和总时长
  var nextRow = lastRow ? parseInt(lastRow) + 1 : 1; // 如果没有保存的行号，则从第2行开始
  var dateCell = dateRange.getCell(nextRow, 1);
  dateCell.setValue(new Date());

  var totalDurationCell = totalDurationRange.getCell(nextRow, 1);
  totalDurationCell.setValue(formattedDuration);

  // 保存当前行号
  PropertiesService.getScriptProperties().setProperty('lastRow', nextRow.toString());
  
  //创建新的触发器
  setScheduleTrigger();
  }
