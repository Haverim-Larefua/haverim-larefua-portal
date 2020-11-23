export class DateUtil {

    public static getDate2DigitsFormat(date: string): string {
        return this.getDate2DigitsFormatFromDate(new Date(date));
    }

    public static getDate2DigitsFormatFromDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day: "2-digit" });
    }

    public static getDateHEDate(date: Date): string {
        return date.toLocaleDateString('he-IL');
    }

    public static getDateHEDay(date: Date): string {
        return date.toLocaleDateString('he-IL', {weekday: 'long'});
    }

}
