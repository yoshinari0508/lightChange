// LINE developersのメッセージ送受信設定に記載のアクセストークン
const LINE_TOKEN = 'HqiOcxiTlvW3t1m9EmPFg9rJBM5X163QTmTbZx8m/xT/O4AUZW7LrYPIQN2qhmm8J0pDR7px7r/El1ec6Xo8wb8wscLPb96paNjU+HixWnz9B5AZHI0+4wduzQCBIhjnbtcsgSi35oPYH5wKCQWligdB04t89/1O/w1cDnyilFU=';
//参考：https://www2.kobe-u.ac.jp/~tnishida/programming/GAS-03.html

function doPost(e){
  // WebHookで受信した応答用Token
  const replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  // ユーザーのメッセージを取得
	const userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  // 応答メッセージ用のAPI URLを定義
	const url = 'https://api.line.me/v2/bot/message/reply';
  //応答メッセージ
	let resMessage;

  //記録先シート
  const ss = SpreadsheetApp.getActiveSpreadsheet();
	const wSheet = ss.getSheetByName('switch');
  //前回の行を取得
  const lastRow = wSheet.getLastRow();
  //前回のflgを取得
  var previos_flg = wSheet.getRange(lastRow, 3).getDisplayValue();

  resMessage = sorting_message(userMessage, previos_flg);

  UrlFetchApp.fetch(url, {
		'headers': {
			'Content-Type': 'application/json; charset=UTF-8',
			'Authorization': 'Bearer ' + LINE_TOKEN,
		},
		'method': 'post',
		'payload': JSON.stringify({
			'replyToken': replyToken,
			'messages': [{
				'type': 'text',
				'text': resMessage,
				//'text': userMessage,
			}],//messages
		}),//payload
	});//fetch



	return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}
