import XLSX from 'xlsx';
import logger  from '../Utils/logger';
import Parcel from '../contexts/interfaces/parcels.interface';
import AppConstants from '../constants/AppConstants';

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

    static jsonDataToparcels(jsonData: any[], dt: Date) :Parcel[]{
        let parcels: Parcel[] = [];
        jsonData.forEach(async data => {
            const no = data[AppConstants.identifierUIName] ? data[AppConstants.identifierUIName] : '';
            const customerName = data[AppConstants.cardName] ? data[AppConstants.cardName] : '';
            const address = data[AppConstants.addressUIName] ? data[AppConstants.addressUIName] : '';
            const city = data[AppConstants.cityUIName] ? data[AppConstants.cityUIName] : '';
            const phone = data[AppConstants.phoneUIName] ? data[AppConstants.phoneUIName] : '';
            const comments = data[AppConstants.commentsUIName] ? data[AppConstants.commentsUIName] : '';
            const signature = data[AppConstants.signatureUIName] ? data[AppConstants.signatureUIName] : '';
            const aparcel = new Parcel(no, customerName, address, city, phone, comments, 'new_status', dt, signature);
            logger.log('[ParcelsImporterService] jsonDataToparcels pushing ', aparcel);
            parcels.push(aparcel);
        });
        return parcels;
    }

    public static async ImportFromExcel(file: File): Promise<Parcel[]> { 
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
        const dt = new Date(file.name.split('.')[0]);
        let parcels = this.jsonDataToparcels(result.data, dt);
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

