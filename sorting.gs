function sorting_message(userMessage, previous_flg) {
   let resMessage;
   var flg = 0;
   switch(userMessage){
    case "on":
      resMessage = "部屋の照明をonにします";
      setLight(cmd = "on");
      break;
    case "off":
      resMessage = "部屋の照明をoffにします";
      setLight(cmd = "off");
      break;
    case "start":
      resMessage = "照明をonにする開始時刻を設定します\n24時間の有効数字を入力してください(0000~2359)";
      flg = 1;
      break;
    case "end":
      resMessage = "照明をoffにする終了時刻を設定します\n24時間の有効数字を入力してください(0000~2359)";
      flg = 2;
      break;
    default:
      switch(previous_flg){
        case "1"://開始時刻の設定
          if(userMessage % 100 < 0 || 60 < userMessage % 100 || 0 > userMessage / 100 || userMessage / 100 > 24 || userMessage / 100 >= 100){
            resMessage = "24時間表記で有効な値を入力してください(0000~2359)";
            flg = 1;
          }else if(0 < userMessage && userMessage < 9999){
            startTime = userMessage;
            change_start_time(startTime);
            setScheduleTrigger();
            resMessage = "開始時刻を記録しました！"
          }else{
            resMessage = "24時間表記で有効な値を入力してください(0000~2359)";
            flg = 1;
          }
          break;

        case "2"://終了時刻の設定
          if(userMessage % 100 < 0 || 60 < userMessage % 100 || 0 > userMessage / 100 || userMessage / 100 > 24 || userMessage / 100 >= 100){
            resMessage = "24時間表記で有効な値を入力してください(0000~2359)";
            flg = 2;
          }else if(0 < userMessage && userMessage < 9999){
            endTime = userMessage;
            change_end_time(endTime);
            setScheduleTrigger();
            resMessage = "終了時刻を記録しました！"
          }else{
            resMessage = "24時間表記で有効な値を入力してください(0000~2359)";
            flg = 2;
          }
          break;
        default:
          resMessage = "正しいコマンドを入力してください"
          res = 0;
          break;
      }
      break;
    }
    //スプレットシートに記録
    write_ss(flg);
    return resMessage;

    aaaa
}


    
    
