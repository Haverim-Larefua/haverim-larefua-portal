import React, {useEffect, useState} from 'react';
import './AreaSelect.scss';
import ClickOutsideHandler from '../../../shared/ClickOutsideHandler/ClickOutsideHandler';
import SelectRow from './SelectRow';
import District from '../../../../models/District';
import {AreaUtil} from "../../../../Utils/Areas/AreaUtils";
import SearchFilter from "./SearchFilter";
import AppConstants from "../../../../constants/AppConstants";
import City from "../../../../models/City";

interface IAreaSelectProps {
    districts: District[];
    userDeliveryAreas?: City[];
    onSave: Function;
}

export enum AreaLevel {
    DISTRICT = "district",
    SUBDISTRICT = "subdistrict",
    CITY = "city"
}

const AreaSelect = ({districts, userDeliveryAreas = [], onSave}:IAreaSelectProps) => {

    const [districtsSelected, setDistrictsSelected] = React.useState<string[]>([]);
    const [subdistrictsSelected,  setSubdistrictsSelected] = React.useState<string[]>([]);
    const [citiesSelected, setCitiesSelected]  = React.useState<City[]>(userDeliveryAreas);
    const [districtsExpanded, setDistrictsExpanded] = React.useState<string[]>([]);
    const [subdistrictsExpanded,  setSubdistrictsExpanded] = React.useState<string[]>([]);
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [searchInput, setSearchInput] = useState<string | undefined>(undefined);

    useEffect(() => {
        setSelectedOption(calculateSelectedOption());
    }, [districtsSelected, subdistrictsSelected, citiesSelected]);

    useEffect(() => {
        districts.forEach(district => {
            if (isAllDistrictSubSelected(district.name) && !districtsSelected.includes(district.name)) {
                setDistrictsSelected([...districtsSelected, district.name]);
            }
        });
    }, [districts, subdistrictsSelected]);

    useEffect(() => {
        districts.flatMap(district => district.subdistricts).forEach(sub => {
            if (isAllSubdistrictCitiesSelected(sub.name) && !subdistrictsSelected.includes(sub.name)) {
                setSubdistrictsSelected([...subdistrictsSelected, sub.name])
            }
        });
        citiesSelected.forEach(city => {
            if (!subdistrictsExpanded.includes(city.subdistrict.name)) {
                setSubdistrictsExpanded([...subdistrictsExpanded, city.subdistrict.name]);
            }
            if (!districtsExpanded.includes(city.district.name)) {
                setDistrictsExpanded([...districtsExpanded, city.district.name]);
            }
        })
    }, [districts, citiesSelected]);


    const calculateSelectedOption = ():string => {
        if (districtsSelected.length === 1) {
            const subDistricts = AreaUtil.getSubDistricts(districts, districtsSelected[0]);
            const cities = AreaUtil.getCities(districts, AreaLevel.DISTRICT, districtsSelected[0]);
            if (subdistrictsSelected.filter(sub => !subDistricts.includes(sub)).length === 0
                && citiesSelected.filter(city => !cities?.includes(city)).length === 0) {
                return districtsSelected[0];
            }
        } else if (districtsSelected.length === 0 && subdistrictsSelected.length === 1) {
            const cities = AreaUtil.getCities(districts, AreaLevel.SUBDISTRICT, subdistrictsSelected[0]);
            if (citiesSelected.filter(city => !cities?.includes(city)).length === 0) {
                return subdistrictsSelected[0];
            }
        } else if (districtsSelected.length === 0 && subdistrictsSelected.length === 0) {
            if (citiesSelected.length === 0) {
                return "";
            } else if (citiesSelected.length === 1) {
                return citiesSelected[0].name;
            }
        }
        return "בחירה מרובה";
    };

    const onExpand = (areaName:string, areaLevel:AreaLevel, keepExpanded:boolean = false) => {
        switch (areaLevel) {
            case AreaLevel.SUBDISTRICT:
                setSubdistrictsExpanded(AreaUtil.addOrRemoveIfExists(subdistrictsExpanded, areaName, keepExpanded));
                break;
            case AreaLevel.DISTRICT:
                setDistrictsExpanded(AreaUtil.addOrRemoveIfExists(districtsExpanded, areaName, keepExpanded));
        }
    };

    const onSelected = React.useCallback((areaName, areaLevel:AreaLevel) => {
        const cities = AreaUtil.getCities(districts, areaLevel, areaName);
        switch (areaLevel) {
            case AreaLevel.CITY:
                setCitiesSelected(AreaUtil.addOrRemoveIfExists(citiesSelected, areaName));
                break;
            case AreaLevel.SUBDISTRICT:
                const newSubSelected = AreaUtil.addOrRemoveIfExists(subdistrictsSelected, areaName);
                if (newSubSelected.includes(areaName)) {
                    setCitiesSelected([...citiesSelected, ...cities]);
                } else {
                    setCitiesSelected(AreaUtil.removeListFromList(citiesSelected, cities));
                }
                setSubdistrictsSelected(newSubSelected);
                break;
            case AreaLevel.DISTRICT: {
                const subdistricts = AreaUtil.getSubDistricts(districts, areaName);
                const newDistricts = AreaUtil.addOrRemoveIfExists(districts, areaName);
                if (newDistricts.includes(areaName)) {
                    setSubdistrictsSelected([...subdistrictsSelected, ...subdistricts]);
                    setCitiesSelected([...citiesSelected, ...cities]);
                } else {
                    setSubdistrictsSelected(AreaUtil.removeListFromList(subdistrictsSelected, subdistricts));
                    setDistrictsSelected(AreaUtil.removeListFromList(citiesSelected, cities));
                }
            }
        }
    }, [citiesSelected, subdistrictsSelected, districtsSelected]);

    const save = () => {
        setDropDownVisible(false);
        onSave(citiesSelected);
    };

    const clearSelection = () => {
        setDistrictsSelected([]);
        setSubdistrictsSelected([]);
        setCitiesSelected([]);
        setDistrictsExpanded([]);
        setSubdistrictsExpanded([]);
        setSearchInput(undefined);
    };
    const hideDropDown = () => {
        if (citiesSelected.length === 0) {
            clearSelection();
        }
        setDropDownVisible(false);
    };
    const toggleDropDown = () => {
        setDropDownVisible(!dropDownVisible);
    };

    const isAllDistrictSubSelected = React.useCallback((district:string) => {
        const subDistricts = AreaUtil.getSubDistricts(districts, district);
        return subDistricts.length > 0 && subDistricts.filter(sub => subdistrictsSelected.includes(sub)).length === subDistricts.length;
    }, [subdistrictsSelected]);

    const isAllSubdistrictCitiesSelected = React.useCallback((sub:string) => {
        const cities = AreaUtil.getCities(districts, AreaLevel.SUBDISTRICT, sub);
        return cities ? cities.length > 0 && cities.filter(city => citiesSelected.map(c=>c.name).includes(city.name)).length === cities.length : false;
    }, [citiesSelected]);

    useEffect(() => {
        if (searchInput === undefined) {
            return;
        }
        if (searchInput === "") {
            setSubdistrictsExpanded([]);
            setDistrictsExpanded([]);
        } else {
            districts.forEach(district => {
                if (AreaUtil.isExpanded(AreaLevel.DISTRICT, district.name, searchInput, districts)) {
                    onExpand(district.name, AreaLevel.DISTRICT, true);
                }
            });
            districts.flatMap(dis => dis.subdistricts).forEach(sub => {
                if (AreaUtil.isExpanded(AreaLevel.SUBDISTRICT, sub.name, searchInput, districts)) {
                    onExpand(sub.name, AreaLevel.SUBDISTRICT, true);
                }
            });
        }
    }, [searchInput, districts/*, subdistrictsExpanded, districtsExpanded*/]);

    return (
        <ClickOutsideHandler onClickOutside={hideDropDown}>
            <div className="ffh-area-selection">
                <div className="ffh-area-select__selected" onClick={toggleDropDown}>{selectedOption}</div>
                {dropDownVisible &&
                <div className="ffh-area-select__dropdown">
                    <div className="ffh-area-select__dropdown_areas">
                        <SearchFilter value={searchInput || ""} onSearch={(value:string) => setSearchInput(value)}/>
                        {districts.map((district, i) => {
                            return (
                                <>
                                    <SelectRow name={district.name} isChecked={districtsSelected.includes(district.name) || isAllDistrictSubSelected(district.name)}
                                               isExpanded={districtsExpanded.includes(district.name)}
                                               onSelected={() => onSelected(district.name, AreaLevel.DISTRICT)}
                                               onExpand={() => onExpand(district.name, AreaLevel.DISTRICT)} className={"ffh-district-selection__title"}/>
                                    {districtsExpanded?.includes(district.name) &&
                                    <label className="ffh-district-selection__sub" key={district.name+"1"}>
                                        {district.subdistricts.map((sub) => {
                                            return (
                                                <>
                                                    <SelectRow name={sub.name} isChecked={subdistrictsSelected.includes(sub.name) || isAllSubdistrictCitiesSelected(sub.name)}
                                                               isExpanded={subdistrictsExpanded.includes(sub.name)}
                                                               onSelected={() => onSelected(sub.name, AreaLevel.SUBDISTRICT)}
                                                               onExpand={() => onExpand(sub.name, AreaLevel.SUBDISTRICT)} className={"ffh-subdistrict-selection__title"}/>
                                                    {subdistrictsExpanded?.includes(sub.name) &&
                                                    <label className="ffh-city-selection__city" key={sub.name}>
                                                        {sub.cities.filter(city => city.name.includes(searchInput || "")).map((city) => {
                                                            return (

                                                                <SelectRow name={city.name} isChecked={citiesSelected.map(c=>c.name).includes(city.name)}
                                                                           onSelected={() => onSelected(city.name, AreaLevel.CITY)}
                                                                           expendable={false} className={"ffh-city-selection__title"}/>
                                                            )
                                                        })}
                                                    </label>}
                                                </>
                                            )
                                        })}
                                    </label>}
                                </>
                            )
                        })}
                    </div>
                    <div className={"area-select-footer"}>
                        <label className={"area-select-clear-btn"} onClick={clearSelection}>{AppConstants.clear}</label>
                        <label className={"area-select-save-btn"} onClick={save}>{AppConstants.choose}</label>
                    </div>
                </div>
                }
            </div>
        </ClickOutsideHandler>
    )
};

export default AreaSelect;