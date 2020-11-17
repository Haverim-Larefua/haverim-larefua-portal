export default class StringUtil {

  public static readonly EMPTY = "";
  public static readonly SPACE = " ";
  public static readonly NEW_LINE = "\n";
  public static readonly QUESTION_MARK = "`";


  public static isEmpty(str: string): boolean {
    return !str || str.length === 0;
  }

  public static isNotEmpty(str: string): boolean {
    return !this.isEmpty(str);
  }

  public static equalIgnoreCase(str1: string, str2: string) : boolean {
    if(this.isEmpty(str1) && this.isEmpty(str2)) {
      return true;
    }
    return str1.toUpperCase === str2.toUpperCase;
  }

  public static removeAll(str: string, subStr: string) : string {
      if(!str) {
        return str;
      }
      return str.replaceAll(subStr, this.EMPTY);
  }

  public static split(str: string, seperator: string): string[] {
    if (this.isEmpty(str)) {
      return [];
    }
    return str.split(seperator);
  }
}
