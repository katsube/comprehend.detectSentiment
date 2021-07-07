/**
 * ファイルを1行ずつ感情分析にかける
 *
 * @version 1.0.0
 * @author M.Katsube
 */

const AWS = require('aws-sdk')
const fs = require('fs')

// 解析対象のファイルを決定
const FILE_LIST = [
  'data/novel/hashire_merosu.txt',      // 0:走れメロス
  'data/novel/gongitsune.txt',          // 1:ごん狐
  'data/novel/gingatetsudono_yoru.txt', // 2:銀河鉄道の夜
  'data/etc/kaomoji.txt',   // 3:顔文字
  'data/etc/tweet.txt',     // 4:ツイート
]
const FILE = FILE_LIST[3]

// .envの内容を環境変数化
require('dotenv').config()

// IAM設定
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

// ファイル読み込み
const lines = fs.readFileSync(FILE, 'utf8')
                  .toString()
                  .split('\n')

// Comprehendで解析
async function requestComprehend(){
  const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
  }

  const comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});
  for(let i=0; i<lines.length; i++ ){
    if( lines[i].length <= 0  ){
      continue;
    }
    if( (i % 3) === 0 ){
      await sleep(1000)
    }

    const params = {
      LanguageCode: 'ja',
      Text: lines[i].substr(0, 4999)
    }

    // Comprehendで解析
    comprehend.detectSentiment(params, (err, data)=>{
      // エラー時
      if (err){
        throw new Error(err)
      }
      // 正常なレスポンス
      else{
        const key = data.Sentiment.charAt(0).toUpperCase() + data.Sentiment.slice(1).toLowerCase()
        const value = data.SentimentScore[key]
        const result = [
          i,
          data.Sentiment,
          value,
          lines[i].substr(0,30)
        ]
        console.log(result.join('\t'))
      }
    })
  }
}

!(async ()=>{
  await requestComprehend()
})()
