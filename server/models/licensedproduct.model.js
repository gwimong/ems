class LicensedProductModel {
  constructor(p) {
    this.Name = p.Name;
    this.Description = p.Description;
    this.LogoImage = p.LogoImage;
    this.DownloadURL = p.DownloadURL;
    this.InfoURL = p.InfoURL;
  }
}

module.exports = LicensedProductModel