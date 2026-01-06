import { CBOR } from "https://code4fukui.github.io/CBOR-es/CBOR.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const get = async (req, ctype) => {
  //console.log(ctype, req.headers);
  if (!ctype) return null;
  const bin = await req.bytes();
  if (ctype == "text/plain") {
    return decoder.decode(bin);
  } else if (ctype == "application/cbor") {
    return CBOR.decode(bin);
  } else if (ctype == "application/json") {
    return JSON.parse(decoder.decode(bin));
  } else if (ctype == "application/octet-stream") {
    return bin;
  } // application/x-www-form-urlencoded
  //throw new Error("unsupported ctype");
  return null;
};

export const ret = (body, status = 200, mime = "text/plain") => {
  if (mime == "application/cbor") {
    body = CBOR.encode(body);
  } else if (mime == "application/json") {
    body = encoder.encode(JSON.stringify(body));
  } else if (body instanceof Uint8Array) {
    if (mime == "text/plain") {
      mime = "application/octet-stream";
    }
  } else if (typeof body == "object") {
    body = encoder.encode(JSON.stringify(body));
    mime = "application/json";
  }
  return new Response(
    body,
    {
      status,
      headers: {
        "Content-Type": mime,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    },
  );
};
