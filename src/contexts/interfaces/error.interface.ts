export class SystemError {
    title: string;
    code: number;
    text: string;
  
    constructor(title: string, code :number, text: string) {
      this.title = title;
      this.code = code;
      this.text = text;
    }
}

export const defaultError: SystemError= {title: '', code: 0 , text:''};