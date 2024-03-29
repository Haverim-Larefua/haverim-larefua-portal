import { ICurrentParcel } from "../components/Parcels/ParcelDetails/DetailsParcelTable/DetailsParcelTable";
import City from "./City";
import ParcelTracking from "./ParcelTracking";
import User from "./User";

export default class Parcel implements ICurrentParcel {
    id: number;
    city: City | null;
    address: string;
    phone: string;
    phone2: string;
    customerName: string;
    customerId: string;
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
    startDate: Date;
    startTime: Date;
    tree: string;

    constructor(
        identity: number,
        customerName: string,
        customerId: string,
        address: string,
        city: City | null,
        phone: string,
        phone2: string,
        comments: string,
        parcelTrackingStatus: string,
        lastUpdateDate: Date,
        signature: string,
        startDate: Date,
        startTime: Date,
        tree: string,
    ) {
        this.identity = identity;
        this.customerName = customerName;
        this.customerId = customerId;
        this.address = address;
        this.city = city;
        this.comments = comments;
        this.parcelTrackingStatus = parcelTrackingStatus;
        this.signature = signature;
        this.lastUpdateDate = lastUpdateDate;
        this.phone = phone;
        this.phone2 = phone2;
        this.startTime = startTime;
        this.startDate = startDate;
        this.tree = tree;
    }
}
