# PubkeyUser

公開鍵を使った簡易ユーザー認証システムです。

## 機能
- 公開鍵/秘密鍵によるユーザー認証
- 秘密鍵を使ったAPI呼び出しの署名
- サーバー側での署名の検証
- 署名付きファイルアップロード
- オフラインでも利用可能、秘密鍵はブラウザのLocalStorageに保存される

## 必要環境
- `Crypto` APIをサポートする最新のブラウザ
- サーバー実装には[Deno](https://deno.land/)ランタイムが必要

## 使い方

### 署名付きAPIアクセス
```js
import { PubkeyUser } from "https://code4fukui.github.io/PubkeyUser/PubkeyUser.js";

const u = new PubkeyUser(); // 秘密鍵がLocalStorageに保存される
console.log(u.pubkey); // 公開鍵の表示

const res = await u.fetch("inc", { param: "abc" });
// 署名付きでAPIにアクセス
```

### ファイルアップロード
```js
import { InputFilePubkeyUser } from "./InputFilePubkeyUser.js";

const u = new PubkeyUser();
const infile = new InputFilePubkeyUser(u);
document.body.appendChild(infile);
```

## ライセンス
MIT License