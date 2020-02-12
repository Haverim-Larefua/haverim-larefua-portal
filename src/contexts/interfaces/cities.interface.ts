export class citieAndSettlementRecord {
    "_id": number = 0;
    "טבלה": string | undefined = undefined;
    "סמל_ישוב": number = 0;
    "שם_ישוב": string  = '';
    "שם_ישוב_לועזי": string | undefined = undefined;
    "סמל_נפה": number = 0;
    "שם_נפה": string | undefined = undefined;
    "סמל_לשכת_מנא": number = 0;
    "לשכה": string | undefined = undefined;
    "סמל_מועצה_איזורית": number = 0;
    "שם_מועצה": string | undefined = undefined;
}

export class citiesAndSettlementsResult {
    include_total: boolean = true;
    resource_id: string | undefined = undefined;
    fields: any = undefined;
    records_format: string | undefined = undefined;
    records: citieAndSettlementRecord[] = [];
    limit: number = 0;
    _links: any;
    total: number = 0;
}

export default class CitiesAndSettlements {
    help: string | undefined = undefined;
    success: boolean = true;
    result: citiesAndSettlementsResult = {
        include_total:true, 
        resource_id:undefined, 
        fields:undefined, 
        records_format: undefined,  
        records: [], 
        limit:0, 
        _links: 0, 
        total:0 };

}