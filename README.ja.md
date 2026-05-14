# PubkeyUser

ウェブアプリケーション向けの、公開鍵暗号を用いた簡単なユーザー認証システム。

## 機能
- 公開鍵/秘密鍵ペアによるユーザー認証
- 秘密鍵を使用したAPIリクエストの署名
- サーバー側での署名の検証
- 署名付きリクエストによるファイルアップロード
- オフラインファースト、秘密鍵はブラウザのlocalStorageに保存

## 要件
- `Crypto` APIをサポートするモダンブラウザ
- サーバー側実装のための[Deno](https://deno.land/)ランタイム

## 使い方

### 署名付きリクエストによるAPIアクセス
```js
import { PubkeyUser } from "https://code4fukui.github.io/PubkeyUser/PubkeyUser.js";

const u = new PubkeyUser(); // 秘密鍵をlocalStorageに保存
console.log(u.pubkey); // 公開鍵を取得

const res = await u.fetch("inc", { param: "abc" });
// サーバーに署名付きリクエストを送信
```

### PubkeyUserによるファイルアップロード
```js
import { InputFilePubkeyUser } from "./InputFilePubkeyUser.js";

const u = new PubkeyUser();
const infile = new InputFilePubkeyUser(u);
document.body.appendChild(infile);
```

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
