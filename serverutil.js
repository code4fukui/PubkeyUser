import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { PubkeyUser } from "./PubkeyUser.js";
import { get, ret } from "./httputil.js";
export { get, ret };

export const makeFetch = (api) => {
  const serveAPI = async (path, req, conn) => {
    if (req.method == "OPTIONS") return ret("ok");
    const ctype = req.headers.get("Content-Type");
    const data = await get(req, ctype);
    let pubkey = null;
    let param = data;
    if (data && data.sign) {
      pubkey = PubkeyUser.verify(data.sign);
      param = data.param;
    }
    const res = await api(path, param, pubkey, req, conn);
    if (res !== undefined) {
      return ret(res, 200, ctype);
    }
    return ret("not found", 404);
  };
  const serve = async (req, conn) => {
    const path = new URL(req.url).pathname;
    if (path.startsWith("/api/")) {
      return serveAPI(path.substring("/api/".length), req, conn);
    } else if (path == "/PubkeyUser.js") {
      return serveFile(req, "." + path);
    } else {
      return serveDir(req, { fsRoot: "static", urlRoot: "" });
    }
  };
  return serve;
};
