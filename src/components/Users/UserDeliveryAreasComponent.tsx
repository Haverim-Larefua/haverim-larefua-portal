import React, {useContext} from "react";
import City from "../../models/City";
import {AreaUtil} from "../../Utils/Areas/AreaUtils";
import {citiesContext} from "../../contexts/citiesContext";

interface IUserDeliveryAreasComponentProps {
    cities: City[];
}


const UserDeliveryAreasComponent = ({cities}:IUserDeliveryAreasComponentProps) => {

    const districts = useContext(citiesContext);

    return (
        <div className={'ffh-user-delivery-areas'}>{AreaUtil.getTopAreasSelected(districts, cities)}</div>
    )
};

export default UserDeliveryAreasComponent;

