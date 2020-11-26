export interface WithId {
  id: number;
}

export class CollectionUtil {
  public static isEmpty(arr: any[]): boolean {
    return !arr || arr.length === 0;
  }

  public static isNotEmpty(arr: any[]): boolean {
    return !this.isEmpty(arr);
  }

  public static mapById<T extends { id: number }>(array: T[]) {
    return array.reduce((mapByIdObject: { [id in number]: T }, item) => {
      mapByIdObject[item.id] = item;
      return mapByIdObject;
    }, {});
  }
}
