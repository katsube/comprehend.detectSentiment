# Amazon Comprehendのサンプルスクリプト

## 解説ページ
* [[AWS] Comprehendで日本語の感情分析を行う](https://blog.katsubemakito.net/aws/comprehend-detectsentiment)

## インストール
```shellsession
$ git clone https://github.com/katsube/comprehend.detectSentiment.git
$ cd comprehend.detectSentiment
$ npm install
```

またAWSのマネジメントコンソールでIAMを作成し、アクセスキーIDとシークレットを「.env」という名前のファイルに保存してください（詳細は解説ページをご覧ください）

## 実行
簡単なサンプルを実行します。
```shellsession
$ node sample.js
```

dataフォルダ内にある小説を1行ずつ分析にかけます。
```shellsession
$ node analytics.js | sort -n
```


