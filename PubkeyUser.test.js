import * as t from "https://deno.land/std/testing/asserts.ts";
import { PubkeyUser } from "./PubkeyUser.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

/*
b7f712631398a10f8578dbfbd92073b1f53ff821b113f6fa6936112f72011337
30GZ_EJR3_VDN6_W6U9_U4ZQ_L3M3_KCCE_M9VL_AYYN_04YE_Q4AG_M908_RLYH
*/

Deno.test("simple", async () => {
  const u = new PubkeyUser();
  const s = u.sign();
  console.log(s); // X-PUBKEYUSER: b7f712631398a10f8578dbfbd92073b1f53ff821b113f6fa6936112f72011337 2025-05-03T22:11:00.506+09:00 c9c7ace2a53793d78dcbddbe85ede8ef14817a015b0f92fd0c76b485ed0de4a008074f0ffe1186efb3dcbe1ff2cfb3c4a021e5e41f400548924fece9c9e1a80c
  //await sleep(5000);
  t.assertEquals(PubkeyUser.verify(s), u.pubkey);
});
Deno.test("timeout", async () => {
  const u = new PubkeyUser();
  const s = u.sign();
  //console.log(s); // X-PUBKEYUSER: b7f712631398a10f8578dbfbd92073b1f53ff821b113f6fa6936112f72011337 2025-05-03T22:11:00.506+09:00 c9c7ace2a53793d78dcbddbe85ede8ef14817a015b0f92fd0c76b485ed0de4a008074f0ffe1186efb3dcbe1ff2cfb3c4a021e5e41f400548924fece9c9e1a80c
  //await sleep(5000);
  t.assertEquals(PubkeyUser.verify(s, 0), null);
});
