class LicenseProductModel {
  constructor(p) {
    this.PCId = p.PCId;
    this.PCName = p.PCName;
    this.PCOwner = p.PCOwner;
    this.OSType = p.OSType;
    this.OSName = p.OSName;
    this.OSSerialNumber = p.OSName;
    this.UpdateDate = p.UpdateDate;
    this.MinimumPasswordAge = p.MinimumPasswordAge;
    this.MaximumPasswordAge = p.MaximumPasswordAge
    this.MinimumPasswordLength = p.MinimumPasswordLength;
    this.PasswordComplexity = p.PasswordComplexity;
    this.PasswordHistorySize = p.PasswordHistorySize;
    this.LockoutBadCount = p.LockoutBadCount;
    this.ResetLockoutCount = p.ResetLockoutCount;
    this.LockoutDuration = p.LockoutDuration;
    this.ScreenSaverIsSecure = p.ScreenSaverIsSecure;
    this.ScreenSaveTimeOut = p.ScreenSaveTimeOut;
    this.ScreenSaveFilePath = p.ScreenSaveFilePath;
    this.Processor = p.Processor;
    this.MemorySize = p.MemorySize;
    this.ComputerName = p.ComputerName;
    this.ComputerDescription = p.ComputerDescription;
    this.PhysicalAddress = p.PhysicalAddress;
    this.IP4Address = p.IP4Address;
    this.IsOSValidation = p.IsOSValidation;
    this.IsPasswordPolicyValidation = p.IsPasswordPolicyValidation;
    this.IsScreenValidation = p.IsScreenValidation;
    this.IsProductValidation = p.IsProductValidation;
    this.IsVaccineValidation = p.IsVaccineValidation;
  }
}

module.exports = LicenseProductModel