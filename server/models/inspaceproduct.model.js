class LicenseProductModel {
  constructor(p) {
    this.ProductName = p.ProductName;
    this.Publisher = p.Publisher;
    this.SoftwareType = p.SoftwareType;
    this.IsAuthorized = p.IsAuthorized;
  }
}

module.exports = LicenseProductModel