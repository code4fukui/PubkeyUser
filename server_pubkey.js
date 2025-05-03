import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { PubkeyUser } from "./PubkeyUser.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";
import { ret } from "./ret.js";

await Deno.mkdir("pubkey", { recursive: true });

const incCount = async (pubkey) => {
  const fn = "pubkey/" + pubkey + ".txt";
  let n = 0;
  try {
    const s = await Deno.readTextFile(fn);
    n = parseInt(s);
  } catch (e) {
  }
  n++;
  await Deno.writeTextFile(fn, n.toString());
  return n;
};

const serveAPI = async (req, conn) => {
  if (req.method == "OPTIONS") return ret("ok");
  const data = CBOR.decode(await req.bytes());

  if (!PubkeyUser.verify(data.sign)) return ret("auth err", 401);
  const pubkey = PubkeyUser.getUser(data.sign);

  const cnt = await incCount(pubkey);
  return ret(`count: ${cnt} pubkey: ${pubkey}`);
};

const serve = async (req, conn) => {
  const path = new URL(req.url).pathname;
  if (path.startsWith("/api/")) {
    return serveAPI(req, conn);
  } else if (path == "/PubkeyUser.js") {
    return serveFile(req, "." + path);
  } else {
    return serveDir(req, { fsRoot: "static", urlRoot: "" });
  }
};

export default { fetch: serve };
