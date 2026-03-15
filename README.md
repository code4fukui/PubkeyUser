# PubkeyUser

An easy user authentication system using public key cryptography for web applications.

## Features
- User authentication using public/private key pairs
- Signing API requests with private key
- Verifying signatures on the server side
- File upload with signed requests
- Offline-first, private key stored in browser localStorage

## Requirements
- Modern browser that supports `Crypto` API
- [Deno](https://deno.land/) runtime for the server-side implementation

## Usage

### API Access with Signed Requests
```js
import { PubkeyUser } from "https://code4fukui.github.io/PubkeyUser/PubkeyUser.js";

const u = new PubkeyUser(); // private key saved to localStorage
console.log(u.pubkey); // get public key

const res = await u.fetch("inc", { param: "abc" });
// sends a signed request to the server
```

### Server Implementation
```js
import { makeFetch } from "./serverutil.js";

const api = async (path, param, pubkey, req, conn) => {
  if (path == "inc") {
    if (!pubkey) return { pubkey: "null", count: "-" };
    const cnt = await incCount(pubkey);
    return { pubkey, count: cnt };
  }
};

export default { fetch: makeFetch(api) };
```

### File Upload with PubkeyUser
```js
import { InputFilePubkeyUser } from "./InputFilePubkeyUser.js";

const u = new PubkeyUser();
const infile = new InputFilePubkeyUser(u);
document.body.appendChild(infile);
```

## License
MIT