import {AreaLevel} from "../../components/Users/UserForm/AreaSelect/AreaSelect";
import District from '../../models/District';
import City from "../../models/City";

export class AreaUtil {

    static getCities(districts:District[], areaLevel:AreaLevel, areaName:string) {
        let cities:string[] | undefined = [];
        if (areaLevel === AreaLevel.SUBDISTRICT) {
            const correctDistrict = districts.find(dis => dis.subdistricts.find(sub => sub.name === areaName));
            if (correctDistrict) {
                cities = correctDistrict.subdistricts.find(sub => sub.name === areaName)
                    ?.cities.map((c) => c.name);
            }
        } else if (areaLevel === AreaLevel.DISTRICT) {
            const correctDistrict = districts.find(dis => dis.name === areaName);
            if (correctDistrict) {
                correctDistrict.subdistricts.forEach(sub => {
                    const subCities = sub.cities.map(c => c.name);
                    cities = cities ? [...cities, ...subCities] : [];
                });
            }
        }
        return cities ? cities : [];
    }

    static getSubDistricts(districts:District[], district:string) {
        const correctDistrict = districts.find(dis => dis.name === district);
        return correctDistrict? correctDistrict.subdistricts.map(sub => sub.name): [];
    }

    static getCitiesSubdistrictsSet(cities:City[]) {
        return [...new Set(cities.flatMap(city => city.subdistrict.name))];
    }

    static getCitiesDistrictsSet(cities:City[]) {
        return [...new Set(cities.flatMap(city => city.district.name))];
    }

    static getAnchorDistrict(districts:District[], sub:string) {
        return districts.find(dis => dis.subdistricts.map(s => s.name).includes(sub))?.name;
    }

    static getTopAreasSelected(districts:District[], cities:City[]) {

        const selectedCities:City[] = [];
        let selectedSub:string[] = [];
        const selectedDis:string[] = [];
        let clonedCities:City[] = cities ? [...cities] : [];
        const citiesSubdistricts = this.getCitiesSubdistrictsSet(clonedCities);
        const citiesDistricts = this.getCitiesDistrictsSet(clonedCities);

        citiesSubdistricts.forEach(sub => {
            const subCities = this.getCities(districts, AreaLevel.SUBDISTRICT, sub);
            const filteredCities = clonedCities.filter(city => subCities.includes(city.name));
            if (filteredCities.length === subCities.length) {
                selectedSub.push(sub);
            } else {
                selectedCities.push(...filteredCities);
            }
            clonedCities = clonedCities.filter(city => !subCities.includes(city.name));
        });

        citiesDistricts.forEach(dis => {
            const districtsSubs = this.getSubDistricts(districts, dis);
            const filteredSubs = selectedSub.filter(sub => this.getAnchorDistrict(districts, sub) === dis);
            if (districtsSubs.length === filteredSubs.length) {
                selectedDis.push(dis);
                selectedSub = selectedSub.filter(sub => filteredSubs.includes(sub));
            }
        });

        const citiesStr = selectedCities.length > 0 ? `${selectedCities.map(city => city.print()).join(', ')}. ` : "";
        const subStr = selectedSub.length > 0 ? `${selectedSub.join(', ')}. ` : "";
        const disStr = selectedDis.length > 0 ? `${selectedDis.join(', ')}. ` : "";
        return `${citiesStr}${subStr}${disStr}`;
    }
}