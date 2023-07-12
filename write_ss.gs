function write_ss(flg) {
  //最新行取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
	const wSheet = ss.getSheetByName('switch');
  const lastRow = wSheet.getLastRow();
	const nRow = lastRow + 1;
	//本日日付を取得
	const date = new Date();
	const today = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'); 

  //操作対象
  var subject = flg;

	//スプレッドシートへ内容を記録
	wSheet.getRange(nRow, 1).setValue(today);
	wSheet.getRange(nRow, 2).setValue(subject); 
  wSheet.getRange(nRow, 3).setValue(flg);
}