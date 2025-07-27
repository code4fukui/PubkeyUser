import { makeFetch } from "./serverutil.js";

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

const api = async (path, param, pubkey, req, conn) => {
  //console.log(path, req, conn, req.headers.get("user-agent"));
  if (path == "inc") {
    if (!pubkey) return { pubkey: "null", count: "-" };
    const cnt = await incCount(pubkey);
    return { pubkey, count: cnt };
  }
};

export default { fetch: makeFetch(api) };
