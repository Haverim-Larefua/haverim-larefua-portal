import { ICurrentParcel } from "../components/Parcels/ParcelDetails/DetailsParcelTable";
import ParcelTracking from "./ParcelTracking";
import User from "./User";

export default class Parcel implements ICurrentParcel {
    id: number;
    city: string;
    address: string;
    phone: string;
    customerName: string;
    currentUserId: number;
    parcelTrackingStatus: string;
    comments: string;
    lastUpdateDate: Date;
    signature: string;
    exception: boolean;
    parcelTracking: ParcelTracking[];
    user: User;
    userName: string;
    identity: number;

    constructor(
        identity: number,
        customerName: string,
        address: string,
        city: string,
        phone: string,
        comments: string,
        parcelTrackingStatus: string,
        lastUpdateDate: Date,
        signature: string
    ) {
        this.identity = identity;
        this.customerName = customerName;
        this.address = address;
        this.city = city;
        this.comments = comments;
        this.parcelTrackingStatus = parcelTrackingStatus;
        this.signature = signature;
        this.lastUpdateDate = lastUpdateDate;
        this.phone = phone;
    }
}