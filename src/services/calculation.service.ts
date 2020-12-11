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

  static sum(value1: string, value2: string, decimalPlace = 2): string {
    const result = Big(value1).plus(Big(value2));
    return CalculationService.round(result, decimalPlace);
  }
}
