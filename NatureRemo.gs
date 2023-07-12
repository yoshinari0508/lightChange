function fillNatureRemo(){
  var data = [getDate()];
  var columns = ['Datetime']; 
  
  var appliances_data = appliances();
  
  columns = columns.concat(appliances_data['columns']);
  
  data = data.concat(appliances_data['data']);  

  fillValues('NatureRemo', columns, [data], 'yyyy/MM/dd HH:mm:ss');
}

function getNatureRemoData(target){
  if (typeof ACCESS_TOKEN === 'undefined') throw new Error('Set ACCESS_TOKEN'); 

  var url = "https://api.nature.global/1/" + target;
  var headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };
  var options = {
    "method" : "get",
    "headers" : headers,
  };
  return JSON.parse(UrlFetchApp.fetch(url, options));
}

function appliances() {
  var data = getNatureRemoData("appliances");
  var ac_temp = "";
  var ac_mode = "";
  var ac_button = "";
  var ac_state = 0;
  var li_brightness = "";
  var li_power = "";
  var li_last_button = "";
  var li_state = 0;
  data.forEach(function(e) {
    if(e.nickname == NICKNAME_AIR_CONDITIONER){
      ac_temp = e.settings.temp;
      ac_mode = e.settings.mode;
      ac_button = e.settings.button;
      if(ac_button != "power-off"){
        ac_state = 1;
      }
    }else if(e.nickname == NICKNAME_LIGHT){
      li_brightness = e.light.state.brightness;
      li_power = e.light.state.power;
      li_last_button = e.light.state.last_button;
      if(li_power == "on"){
        li_state = 1;
      }
    }
  });
  
  return {'columns': ['AC_Temp', 'AC_Mode', 'AC_Button', 'AC_State', 'Light_Brightness', 'Light_Power', 'Light_Last_Button', 'Light_State'],
          'data': [ac_temp, ac_mode, ac_button, ac_state, li_brightness, li_power, li_last_button, li_state]}
}


