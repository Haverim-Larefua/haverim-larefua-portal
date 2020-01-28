/*
export enum parcelModificationStatus {
  None = 0,
  Create = 1,
  Edit = 2
}

export interface IparcelsState {
    parcels: parcel[];
    selectedparcel: parcel | null;
    modificationState: parcelModificationStatus;
}
*/

export default class parcel {
  id: number | undefined;
  name: string;
  address: string;
  city: string;
  phones: [];
  comments: string;
  signature: string; // base64

  constructor(name: string, address: string, city: string, 
              phones: [], comments: string, signature: string) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.comments = comments;
    this.signature = signature;
    this.phones = Object.assign([], phones);
  }
}

//DB definition
export class Parcel {
  id: number | undefined; // @PrimaryGeneratedColumn()
  no: string | undefined; // @Column()
  destination: string | undefined; // @Column()
  destinationAddress: string | undefined; // @Column({ name: 'destination_address' })
  destinationPhone: string | undefined; // @Column({ name: 'destination_phone' })
  address: string | undefined; // @Column()
  deliveryPerson: string | undefined; // @Column({ name: 'delivery_person' })
  deliveryPersonPhone: string | undefined; // @Column({ name: 'delivery_person_phone' })
  comments: string | undefined; // @Column()
  updateDate: Date | undefined; // @Column({ name: 'update_date' })
}
