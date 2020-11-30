export class DateUtil {

    public static getDate2DigitsFormat(date: string): string {
        return this.getDate2DigitsFormatFromDate(new Date(date));
    }

    public static getDate2DigitsFormatFromNumber(date: number): string {
        return this.getDate2DigitsFormatFromDate(new Date(date));
    }

    public static getDate2DigitsFormatFromDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day: "2-digit" });
    }

    public static getDate2DigitsFormatFromDateOnlyDate(date: Date): string {
        return new Date(date).toLocaleDateString('hl-IL', {  day: "2-digit" }) + "." + new Date(date).toLocaleDateString('hl-IL', {  month: "2-digit" });
    }

    public static getDateHEDate(date: Date): string {
        return date.toLocaleDateString('he-IL');
    }

    public static getDateHEDay(date: Date): string {
        return date.toLocaleDateString('he-IL', {weekday: 'long'});
    }

    public static addDaysToDate(date: Date, numDay: number): number {
        return new Date().setDate(date.getDate() + numDay);
      }

      public static addDaysToDateNumber(date: number, numDay: number): number {
        return this.addDaysToDate(new Date(date), numDay);
      }

}
