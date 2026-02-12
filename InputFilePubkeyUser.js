import { InputFile } from "https://code4fukui.github.io/input-file/input-file.js";

// for file upload
const MAX_FILE_SIZE_MB = 50;

export class InputFilePubkeyUser extends InputFile {
  constructor(pubkeyuser, maxfilesizemb = MAX_FILE_SIZE_MB) {
    super();
    this.pubkeyuser = pubkeyuser;
    this.maxfilesizemb = maxfilesizemb;
    this.onchange = async (e) => {
      const u = this.pubkeyuser;
      const files = e.detail.files;

      for (const file of files) {
        if (file.uploading) continue;
        file.uploading = true;
        const fn = file.name;
        const bin = new Uint8Array(await file.arrayBuffer());
        if (bin.length > this.maxfilesizemb * 1024 * 1024) {
          alert("アップロードするファイルは、" + this.maxfilesizemb + "MB以内にしてください");
          file.uploading = false;
          continue;
        }
        const res = await u.fetch("upload", { fn, bin });
        if (res.error) {
          alert(res.error);
          file.uploading = false;
          continue;
        }
        file.tid = res;
        file.uploaded = true;    
      }
    };
  }
  isFilesUploading() {
    const files = this.files;
    return files.filter(i => !i.uploaded).length > 0;
  }
  async getFiles() {
    const files = this.files;
    if (files.length == 0) return undefined;
    return files.map(i => ({ tid: i.tid, fn: i.name }));
  }
};

customElements.define("input-file-pubkey-user", InputFilePubkeyUser);
