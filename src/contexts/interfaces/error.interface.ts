export default class Error {
    title: string;
    code: number;
    text: string;
  
    constructor(title: string, code :number, text: string) {
      this.title = title;
      this.code = code;
      this.text = text;
    }
}

export const defaultError = {
    title: '', code: 0 , text: ''
  };