export class CollectionUtil {

    public static isEmpty(arr: any[]): boolean {
        return !arr || arr.length === 0;
    }

    public static isNotEmpty(arr: any[]): boolean {
        return !this.isEmpty(arr);
    }

}
