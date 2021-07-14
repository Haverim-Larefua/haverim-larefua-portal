import XLSX from 'xlsx';
import logger from '../Utils/logger';
import AppConstants from '../constants/AppConstants';
import StringUtil from "../Utils/Common/StringUtil";
import Parcel from '../models/Parcel';
import City from '../models/City';
import { cityList } from '../contexts/Cities';

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
    for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
    return o;
    }

    static jsonDataToParcels(jsonData: any[], dt: Date, cities: City[]) :Parcel[]{
    let parcels: Parcel[] = [];
    jsonData.forEach(async data => {
            const no = data[AppConstants.identifierUIName] ? data[AppConstants.identifierUIName] : StringUtil.EMPTY;
            const startDate = data[AppConstants.startDate]? data[AppConstants.startDate].toISOString().slice(0, 10): null;
            const startTime = data[AppConstants.startTime] ? data[AppConstants.startTime].toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) : null;
            const customerId = data[AppConstants.cardId] ? data[AppConstants.cardId] : StringUtil.EMPTY;
            const customerName = data[AppConstants.cardName] ? data[AppConstants.cardName] : StringUtil.EMPTY;
            const address = data[AppConstants.addressUIName] ? data[AppConstants.addressUIName].replace(/\d{5,}/gm,'') : StringUtil.EMPTY;
            let city = null;
            const cityName = data[AppConstants.cityUIName];
            if(cityName) {
              const foundCity = cities.find(c => this.normaolizeCity(c.name) === this.normaolizeCity(cityName));
              if(foundCity) {
                city = foundCity;
              }
            }
            const phones = data[AppConstants.phone] ? data[AppConstants.phone].toString().split(',') : [];
            const phone = phones[0] ? phones[0] : StringUtil.EMPTY;
            const phone2 = phones[1] ? phones[1] : StringUtil.EMPTY;
            const comments = data[AppConstants.commentsUIName] ? data[AppConstants.commentsUIName] : StringUtil.EMPTY;
            const signature = data[AppConstants.signatureUIName] ? data[AppConstants.signatureUIName] : StringUtil.EMPTY;
          
              const parcel = new Parcel(
                no,
                customerName,
                customerId,
                address,
                city,
                phone,
                phone2,
                comments,
                'ready',
                dt,
                signature,
                startDate,
                startTime
              );

              logger.log(
                "[ParcelsImporterService] jsonDataToParcels pushing ",
                parcel
              );
              parcels.push(parcel);

        });
        return parcels;
    }

  private static normaolizeCity(city: string): string {
    return city.replace(/ /g, '').replace(/קרית/g, 'קריית')

  }

    public static async ImportFromExcel(file: File, cities: City[]): Promise<Parcel[]> {
        return new Promise((resolve, reject) => {

        /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onload = (e: any) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true , cellDates:true});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json<any>(ws, {dateNF:'mm/dd/yyyy;@'}); // any[]
        let result = new ImportedData(data, this.make_cols(ws['!ref']));
        const dt = new Date();
        let parcels = this.jsonDataToParcels(result.data, dt, cities);
        resolve(parcels);
        /*
        * This part of the code is for keeping the file with Format name in this format yyy-mm-dd.xls
        * there bug in this code as it should verify if there is already a package with this date and ID - but its not working
        */
        /*
        const dt = new Date(file.name.split('.')[0]);
        if (dt instanceof Date && (dt.toString() !== "Invalid Date")) {
          let parcels = this.jsonDataToParcels(result.data, dt);
          resolve(parcels);
        } else {
          logger.error('[ParcelsImporterService] ImportFromExcel: invliad file name - must be of the form yyyy-mm-dd.xls');
          resolve([]);
        }*/
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
