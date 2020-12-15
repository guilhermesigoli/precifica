import { Big, RoundingMode } from 'big.js';

export class CalculationService {
  private static round(amount: Big, decimalPlaces: number): string {
    return amount
      .round(decimalPlaces, RoundingMode.RoundDown)
      .toFixed(decimalPlaces);
  }

  static calcTotalPercent(amount: string, percent: string, decimalPlace = 2) {
    const bAmount = Big(amount);
    const bPercent = Big(percent).div(100);
    const r = bAmount.times(bPercent);
    return CalculationService.round(r, decimalPlace);
  }

  /**
   * Adds value1 and value2 and rounds the result
   * @param {string} value1
   * @param {string} value2
   * @param {number} decimalPlace - Decimal places to round
   */
  static sum(value1: string, value2: string, decimalPlace = 2): string {
    const result = Big(value1).plus(Big(value2));
    return CalculationService.round(result, decimalPlace);
  }

  /**
   * Subtracts value2 from value1 and rounds the result
   * @param {string} value1 - Value to be subtracted from
   * @param {string} value2 - Value to subtract
   * @param {number} decimalPlace - Decimal places to round
   */
  static sub(value1: string, value2: string, decimalPlace = 2): string {
    const result = Big(value1).sub(Big(value2));
    return CalculationService.round(result, decimalPlace);
  }
}
