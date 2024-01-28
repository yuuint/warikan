# @ynetlabo/warikan

割り勘用の計算モジュールです。簡単なステップでメンバーの割り勘結果を取得できます。

## 開始方法

### 1.パッケージのインストール

[![npm version](https://badge.fury.io/js/@ynetlabo%2Fwarikan.svg)](https://badge.fury.io/js/@ynetlabo%2Fwarikan)

npm のパッケージインストールで簡単に取り込めます。

バグ修正を随時行なっていますので、最新版を取り込んでください。

```
npm i @ynetlabo/warikan
```

### 2.パッケージの取り込み

import 文でパッケージを取り込んでください

```:typescript
import { Warikan, WarikanCrItem, WarikanDrItem,
  WarikanMember,WarikanResult } from "@ynetlabo/warikan";
```

## 使用方法

### 1.Warikan インスタンスを初期化

```
const warikanUtil = new Warikan();
```

### 2.メンバーを作成

割り勘対象のメンバーを作成します。

第１引数に、ID を（一意である必要があります）
第２引数に、出力の際に使用するユーザ名を指定してください。

```
const yuuko = new WarikanMember("unique-key1", "yuuko");
const takeko = new WarikanMember("unique-key2", "takeko");
const setsuko = new WarikanMember("unique-key3", "setsuko");
```

### 3.メンバーに立替額／集金額を登録します

#### ⅰ. yuuko が ¥6,000 円建て替えました

```
yuuko.payUtils.addPayTrade(WarikanDrItem.TATEKAE, 6000);
```

#### ⅱ. takeko が ¥2,000 円 setsuko に集金を渡しました。

```
takeko.payUtils.addPayTrade(WarikanCrItem.SHUKIN, 2000);
setsuko.payUtils.addPayTrade(WarikanCrItem.SHUKIN, -2000);
```

### 4.Warikan インスタンスにメンバー登録します。

```
warikanUtil.addMembers([yuuko, takeko, setsuko]);
```

### 5.Warikan 結果を取得します。

Array<MemberSplitResult>型で取得できます

```
const results = warikanUtil.getSplitResultsByArray();
```

### *.Sample
```
console.log(JSON.stringify(results, null, 2));
```
result.payTasks:誰から／誰にの割り勘タスク（メンバーごと）
```
[
  {
    "totalCr": 0,
    "totalDr": 6000,
    "totalAmount": 6000,
    "balance": 0,
    "balanceInit": 4000,
    "payAt": -2000,
    "payTasks": [
      {
        "fromId": "unique-key3",
        "fromName": "setsuko",
        "toId": "unique-key1",
        "toName": "yuuko",
        "amount": 4000,
        "createAt": "unique-key1",
        "isPayOutTask": false,
        "isPayInTask": true
      }
    ],
    "id": "unique-key1",
    "name": "yuuko"
  },
  {
    "totalCr": 2000,
    "totalDr": 0,
    "totalAmount": 2000,
    "balance": 0,
    "balanceInit": 0,
    "payAt": -2000,
    "payTasks": [],
    "id": "unique-key2",
    "name": "takeko"
  },
  {
    "totalCr": -2000,
    "totalDr": 0,
    "totalAmount": -2000,
    "balance": 0,
    "balanceInit": -4000,
    "payAt": -2000,
    "payTasks": [
      {
        "fromId": "unique-key3",
        "fromName": "setsuko",
        "toId": "unique-key1",
        "toName": "yuuko",
        "amount": 4000,
        "createAt": "unique-key3",
        "isPayOutTask": true,
        "isPayInTask": false
      }
    ],
    "id": "unique-key3",
    "name": "setsuko"
  }
]
```
