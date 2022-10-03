export const NOT_A_NUMBER_LABEL = "N/A";

const unitSettings = [
  // { suffix: 'T', unitName: 'trillion', value: 10 ** 12 },
  { suffix: "B", unitName: "billion", scale: 10 ** 9 },
  { suffix: "M", unitName: "million", scale: 10 ** 6 },
];

const FRACTION_DIGITS = 2;

const SIGNIFICANT_DIGITS = 4;

class Format {
  decimalFormatCache: { [p: number]: any } = {};
  effectiveNumberFormatCache: { [p: number]: any } = {};

  // handle undefined, NaN or null
  // if there have some wrong format value, you can debug here, this function handle all the currency format by default
  handleNAN =
    (formatFunction: (v: number, ...res: any[]) => string) =>
    (value?: number, ...res: any[]) => {
      if (!value && value !== 0) return NOT_A_NUMBER_LABEL;
      return formatFunction(value, ...res);
    };

  _getDecimalFormat = (digit: number): Intl.NumberFormat => {
    if (!this.decimalFormatCache[digit]) {
      this.decimalFormatCache[digit] = new Intl.NumberFormat(undefined, {
        maximumFractionDigits: digit,
        minimumFractionDigits: digit,
      });
    }
    return this.decimalFormatCache[digit];
  };

  _getEffectiveNumberFormat = (digit: number): Intl.NumberFormat => {
    if (!this.effectiveNumberFormatCache[digit]) {
      this.effectiveNumberFormatCache[digit] = new Intl.NumberFormat(undefined, {
        maximumSignificantDigits: digit,
      });
    }
    return this.effectiveNumberFormatCache[digit];
  };

  /**
   * e.g.  digit = 2: 1 ==> 1.00, 1.345 ==> 1.35
   *                  1.344 ==> 1.34  1000 ==> 1,000.00
   *       digit = 0: 1 ==> 1, 1.345 ==> 1
   *                  1.344 ==> 1 1000 ==> 1,000
   */
  _formatDecimal = (number: number, digit = 0) => {
    return this._getDecimalFormat(digit).format(number);
  };
  formatDecimal = this.handleNAN((number: number, digit = 0) => this._formatDecimal(number, digit));

  /**
   * e.g.  digit = 2: 1 ==> 1, 1.345 ==> 1.3
   *                  1.355 ==> 1.4 1234 ==> 1,200
   */
  _formatEffectiveNumber = (number: number, digit = 4) => {
    return this._getEffectiveNumberFormat(digit).format(number);
  };
  formatEffectiveNumber = this.handleNAN((number: number, digit = 4) => this._formatEffectiveNumber(number, digit));

  /**
   * use formatDecimal with digit = 2
   */
  _formatPercentage = (value: number) => this._formatDecimal(value, 2);
  formatPercentage = this.handleNAN((value: number) => this._formatDecimal(value, 2));

  /**
   * Format token price in two cases(>=1 or not)
   */
  _formatPrice = (price: number) => {
    // When price >= 1, price should retain 2 decimal digits and thousands separated
    // e.g. 1 => '1.00', 123456.789 => '123,456.79'
    if (Math.abs(price) >= 1) {
      return this._formatDecimal(price, FRACTION_DIGITS);
    }
    // When price < 1, there should be 4 significant digits, but, trailing 0 should be dropped
    // e.g. 0.00045678 => '0.0004568', 0.244 => '0.244'
    return this._formatEffectiveNumber(price, SIGNIFICANT_DIGITS);
  };
  formatPrice = this.handleNAN((price: number) => this._formatPrice(price));

  /**
   * Format mint price in two cases(>=1 or not)
   * Display different characters in mobile and pc current is 13 for pc 16 for mobile
   */
  _formatMintPrice = (price: number, limitLength: number): string => {
    // When price >= 1, price should retain 2 decimal digits and thousands separated
    // e.g. 1 => '1.00', 123456.789 => '123,456.79'
    // if the whole length is beyond limitLength , cut the digits length to fit the limit
    // if the whole length is less than limit length ,show all digits
    const priceStr = price.toString();
    if (Math.abs(price) >= 1) {
      // shoud cut the limited decimal places
      const intLength = priceStr.split(".")[0].length;
      const hasDigits = priceStr.includes(".");
      const digitsLength = hasDigits ? priceStr.split(".")[1].length : 0;
      let digitsLimitLength = FRACTION_DIGITS;
      if (hasDigits && digitsLength > FRACTION_DIGITS) {
        // if digits length is too long should limit it
        if (digitsLength > limitLength - intLength - 1) {
          digitsLimitLength = limitLength - intLength - 1;
        } else {
          digitsLimitLength = digitsLength;
        }
      }

      return this._formatDecimal(price, digitsLimitLength);
    }
    // When price < 1,
    // show all digits
    if (price.toString().length > limitLength) {
      return price.toFixed(limitLength - 2);
    }
    // there should be 4 significant digits, but, trailing 0 should be droppeda
    // e.g. 0.00045678 => '0.0004568', 0.244 => '0.244'
    return this._formatEffectiveNumber(price, limitLength - 2);
  };
  formatMintPrice = this.handleNAN((number: number, limitLength = SIGNIFICANT_DIGITS + 2) => this._formatMintPrice(number, limitLength));
  /**
   * use value * 100 to formatDecimal with digit = 2
   */
  toPercentage = this.handleNAN((value: number) => this._formatPercentage(value * 100));

  /**
   * same to toPercentage but with '%'
   */
  toPercentageWithSymbol = this.handleNAN((value: number) => this._formatPercentage(value * 100) + "%");

  /**
   * use formatDecimal with digit = 0, return integer
   * e.g.   1.00 ==> 1, 0.00 ==> 0
   *        10000.00 ==> 10,000, 1000 ==> 1,000
   */
  formatNumberWithCommas = this.handleNAN((value: number) => this._formatDecimal(value));

  /**
   * e.g.   0.00 ==> N/A, 1230 ==> 1,230
   *        100000.34 ==> 100,000, 1000000,98 ==> 1M
   */
  formatMarketCap = this.handleNAN((value: number) => {
    if (value === 0) return NOT_A_NUMBER_LABEL;
    for (const { suffix, scale } of unitSettings) {
      if (value / scale >= 1) {
        let re = this._formatPrice(value / scale).replace(/0+$/, "");
        if (re.endsWith(".")) re = re.slice(0, -1);
        return `${re} ${suffix}`;
      }
    }

    if (Math.abs(value) > 1) return this._formatDecimal(value);

    return this._formatEffectiveNumber(value, SIGNIFICANT_DIGITS);
  });
}

const formatter = new Format();

export const {
  formatDecimal,
  formatMarketCap,
  formatPrice,
  formatMintPrice,
  formatNumberWithCommas,
  toPercentageWithSymbol,
  toPercentage,
  formatEffectiveNumber,
} = formatter;
