class Validator {
  isLengthLessOrEqual(value, length) {
    if (value === "") return null;
    else if (value.length <= length) return false;
    else return true;
  }
  isNotEmpty(value) {
    if (value === "" || value === null || value === undefined) return null;
    else return true;
  }
  isPrice(value) {
    if (this.cleanPrice(value) === 0.0 || isNaN(this.cleanPrice(value)))
      return null;
    else if (this.cleanPrice(value) < 0.1) return false;
    else return true;
  }
  isRate(value) {
    if (this.cleanRate(value) === 0.0 || isNaN(this.cleanPrice(value)))
      return null;
    else if (this.cleanPrice(value) <= 0 || this.cleanPrice(value) > 100) return false;
    else return true;
  }
  isDiscount(value) {
    if (this.cleanRate(value) === 0.0 || isNaN(this.cleanPrice(value)))
      return null;
    else if (this.cleanPrice(value) <= 0 || this.cleanPrice(value) > 99) return false;
    else return true;
  }
  cleanRate(value) {
    let cleanValue = value.replaceAll("%", "").replaceAll(" ", "");
    cleanValue = parseFloat(cleanValue);
    return cleanValue;
  }
  
  cleanPrice(value) {
    let cleanValue = value.replaceAll("R$", "");
    cleanValue = parseFloat(cleanValue);
    return cleanValue;
  }
}

module.exports = new Validator();
