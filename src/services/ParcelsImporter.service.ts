import XLSX from 'xlsx';
import parcel from '../contexts/interfaces/parcels.interface';

class ImportedData {
    data: any[];
    cols: any;

    constructor(data: any[], cols: any) {
        this.data = Object.assign([], data);
        this.cols = cols;
    }
}

export default class ParcelsImporterService {

    static make_cols(refstr: any) {
        let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
        for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
        return o;
    };

    static jsonDataToparcels(jsonData: any[]) : parcel[]{
        let parcels: parcel[] = [];
        jsonData.forEach(async data => {
            const name = data['שם כרטיס'] ? data['שם כרטיס'] : '';
            const address = data['כתובת'] ? data['כתובת'] : '';
            const city = data['עיר'] ? data['עיר'] : '';
            const phones = data['טלפון'] ? data['טלפון'].split(',') : [];
            const comments = data['הערות'] ? data['הערות'] : '';
            const signature = data['חתימה'] ? data['חתימה'] : '';
            const aparcel = new parcel(name, address, city, phones, comments, signature);
            console.log('[ParcelsImporterService] jsonDataToparcels pushing ', aparcel);
            parcels.push(aparcel);
        });
        return parcels;
    }

    public static async ImportFromExcel(file: File): Promise<parcel[]> { 
        return new Promise((resolve, reject) => {

        /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
   
      reader.onload = (e: any) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json<any>(ws); // any[]
        let result = new ImportedData(data, this.make_cols(ws['!ref']));
        let parcels = this.jsonDataToparcels(result.data);
        resolve(parcels);
      };

      reader.onerror = reject;
   
      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      };
        })
    }

}

