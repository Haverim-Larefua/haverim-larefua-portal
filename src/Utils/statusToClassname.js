import { parcelStatusesValues } from '../contexts/interfaces/parcels.interface';

export default function statusToClassname(status) {
    const statusToClassname = Object.keys(parcelStatusesValues).find(key => parcelStatusesValues[key] === status);
    return statusToClassname.toLowerCase();
}