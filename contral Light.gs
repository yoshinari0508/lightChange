

function getLightId() {
  var data = getNatureRemoData("appliances");
  var lightId = "照明"; // 空调设备的ID

  // 遍历设备信息，找到空调设备并提取ID
  for (var i = 0; i < data.length; i++) {
    var device = data[i];
    if (device.nickname === NICKNAME_LIGHT) {
      lightId = device.id;
      break; 
    }
  }
  return lightId;
}

function setLight(cmd) {
  
var url = 'https://api.nature.global/1/appliances/' + lightId + '/light';

const payload = {"button" : cmd,};
const headers = {'Authorization': 'Bearer ' + ACCESS_TOKEN,}; 

const options = {
"method" : "post",
"headers" : headers,
"payload" : payload
};

Logger.log("Sending this request: " + url);
 
var response = UrlFetchApp.fetch(url, options);
  
Logger.log("Received this response: " + response.getContentText());
  
}
