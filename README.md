# PubkeyUser

- an easy user authentication by pubkey for webapp
- 公開鍵を使った簡易ユーザー認証ウェブアプリ用

## uage

fetch API with sign (電子署名付きAPIアクセス)
```js
import { PubkeyUser } from "https://code4fukui.github.io/PubkeyUser/PubkeyUser.js";

const u = new PubkeyUser(); // prikey saved to localStorage
const res = await u.fetch("inc", { param: "abc" });
```

sign (電子署名)
```js
const s = u.sign();
console.log(s);
// [pubkey] [dt] [sign]
// 30GZ_EJR3_VDN6_W6U9_U4ZQ_L3M3_KCCE_M9VL_AYYN_04YE_Q4AG_M908_RLYH 2025-05-03T22:13:03.860+09:00 4AUT_UFKP_0TG2_H3UQ_LNNQ_MGMZ_7H2K_AM0W_T36R_N4CP_7ENR_M18R_H5M9_JUD3_K4WE_UUWP_DMMY_5WEZ_V40A_E28M_CGQA_6UFZ_MLHK_7HTY_1NVT_R0H
```

verify (検証)
```js
const pubkey = PubkeyUser.verify(sign);
console.log(pubkey);
// 30GZ_EJR3_VDN6_W6U9_U4ZQ_L3M3_KCCE_M9VL_AYYN_04YE_Q4AG_M908_RLYH
```

## demo app: API server with PubkeyUser

- server: [server_pubkey.js](server_pubkey.js)
```sh
deno serve -A --port 8101 server_pubkey.js
```

- client: [static/index.html](static/index.html)
open http://localhost:8101/

## reference

- [sec.js](https://github.com/code4fukui/sec.js/)
