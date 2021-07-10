export default class City {
    id: number;
    name: string;
    district: any;
    subdistrict: any;

    constructor(
        id: number,
        name: string,
        district: any,
        subdistrict: any
    ) {
        this.name = name;
        this.id = id;
        this.id = id;
        this.district = district;
        this.subdistrict = subdistrict;
    }

    public print():string {
        return `${this.name} (${this.district.name}, ${this.subdistrict.name})`;
    }
}