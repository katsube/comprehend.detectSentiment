const AWS = require('aws-sdk')

// .envの内容を環境変数化
require('dotenv').config()

// IAM設定
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

// Comprehendに渡す値を準備
const comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});
const params = {
  LanguageCode: 'ja',
  Text: 'お腹が減って死にそうです(^q^)'
}

// Comprehendで解析
comprehend.detectSentiment(params, (err, data)=>{
  // エラー時
  if (err){
    console.error(err, err.stack)
  }
  // 正常なレスポンス
  else{
    console.log(data)
  }
})
