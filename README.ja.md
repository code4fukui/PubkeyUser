# PubkeyUser

公開鍵を使った簡易ユーザー認証ウェブアプリ用のライブラリです。

## デモ
API サーバーとクライアントのデモアプリが用意されています。
ブラウザで http://localhost:8101/ を開いてご確認ください。

## 機能
- 公開鍵/秘密鍵による認証
- 電子署名付きAPIアクセス
- ファイルアップロード

## 使い方
### API アクセス
```js
import { PubkeyUser } from "https://code4fukui.github.io/PubkeyUser/PubkeyUser.js";

const u = new PubkeyUser(); // 秘密鍵がLocalStorageに保存される
console.log(u.pubkey); // 公開鍵の表示
const res = await u.fetch("inc", { param: "abc" }); // 署名付きでAPIにアクセス
```

### ファイルアップロード
```js
import { InputFilePubkeyUser } from "./InputFilePubkeyUser.js";

const u = new PubkeyUser(); // 秘密鍵がLocalStorageに保存される

const infile = new InputFilePubkeyUser(u);
document.body.appendChild(infile);
```

## ライセンス
MIT License