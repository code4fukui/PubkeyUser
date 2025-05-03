import { DateTime } from "https://js.sabae.cc/DateTime.js";
import * as sec from "https://code4fukui.github.io/sec.js/sec.js";
//import { Base64URL } from "https://code4fukui.github.io/Base64URL/Base64URL.js";
//import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";
import { Base32 } from "https://code4fukui.github.io/Base32/Base32.js";

//export const Coder = Base64URL;
//export const Coder = Base16;
export const Coder = Base32;

export const default_valid_dt = 60 * 1000; // 1min
//const valid_dt = 1 * 1000; // 1sec

// [pubkey] [dt] [sign]
// 30GZ_EJR3_VDN6_W6U9_U4ZQ_L3M3_KCCE_M9VL_AYYN_04YE_Q4AG_M908_RLYH 2025-05-03T22:13:03.860+09:00 4AUT_UFKP_0TG2_H3UQ_LNNQ_MGMZ_7H2K_AM0W_T36R_N4CP_7ENR_M18R_H5M9_JUD3_K4WE_UUWP_DMMY_5WEZ_V40A_E28M_CGQA_6UFZ_MLHK_7HTY_1NVT_R0H

export class PubkeyUser {
  constructor(name = "PubkeyUser") {
    this.prikey = localStorage.getItem(name);
    if (!this.prikey) {
      this.prikey = Coder.encode(sec.prikey());
      localStorage.setItem(name, this.prikey);
    }
    this.pubkey = Coder.encode(sec.pubkey(Coder.decode(this.prikey)));
  }
  sign() {
    const dt = new DateTime().toString();
    const sign = Coder.encode(sec.sign(Coder.decode(this.prikey), new TextEncoder().encode(dt)));
    return this.pubkey + " " + dt + " " + sign;
  }
  static getUser(ssign) {
    if (!ssign || typeof ssign != "string") return null;
    const ss = ssign.split(" ");
    if (ss.length < 3) return null;
    return ss[0];
  }
  static verify(ssign, valid_dt = default_valid_dt) {
    const pubkey = PubkeyUser.getUser(ssign);
    if (!pubkey) return false;
    const ss = ssign.split(" ");
    const dt = ss[1];
    const sign = Coder.decode(ss[2]);
    const nowdt = new DateTime().getTime() - new DateTime(dt).getTime();
    if (nowdt > valid_dt) return false;
    if (!sec.verify(sign, Coder.decode(pubkey), new TextEncoder().encode(dt))) return false;
    return true;
  }
}
