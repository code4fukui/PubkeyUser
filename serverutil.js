import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { PubkeyUser } from "./PubkeyUser.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

export const ret = (body, status = 200, mime = "text/plain") => {
  if (body instanceof Uint8Array) {
    if (mime == "text/plain") {
      mime = "application/octet-stream";
    }
  }  else if (typeof body == "object") {
    body = CBOR.encode(body);
    mime = "application/cbor";
  }
  return new Response(
    body,
    {
      status,
      headers: {
        "Content-Type": mime,
        "Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Headers": "*",
      },
    },
  );
};

export const makeFetch = (api) => {
  const serveAPI = async (path, req, conn) => {
    if (req.method == "OPTIONS") return ret("ok");
    const data = CBOR.decode(await req.bytes());

    const pubkey = PubkeyUser.verify(data.sign);
    const param = data.param;

    const res = await api(path, param, pubkey, req, conn);
    if (res) {
      return ret(res)
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
