# PubkeyUser

公開鍵を使った簡易なユーザー認証システムです。ブラウザ上で秘密鍵を管理し、サーバーへの API 呼び出しを署名付きで行うことができます。

## 機能
- ユーザー認証: 公開鍵/秘密鍵ペアによる認証
- 署名付き API 呼び出し
- サーバー側での署名検証
- 署名付きファイルアップロード
- オフラインでの利用: 秘密鍵はブラウザのローカルストレージに保存

## 必要環境
- `Crypto API` をサポートする最新のブラウザ
- サーバー実装には [Deno](https://deno.land/) ランタイムが必要

## 使い方

### API アクセスと署名
```js
import { PubkeyUser } from "https://code4fukui.github.io/PubkeyUser/PubkeyUser.js";

const u = new PubkeyUser(); // 秘密鍵がローカルストレージに保存される
console.log(u.pubkey); // 公開鍵の表示

const res = await u.fetch("inc", { param: "abc" });
// 署名付きでAPI にアクセス
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