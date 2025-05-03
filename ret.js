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
