/*
export enum parcelStatus {
  None = 0,
  Create = 1,
  Edit = 2
}
*/

export default class Parcel {
  id: number | undefined;
  name: string;
  address: string;
  city: string;
  phones: [];
  comments: string;
  status: string; // should be enum
  signature: string; // base64
  updateDate: Date;

  constructor(name: string, address: string, city: string, 
              phones: [], comments: string, status: string, 
              updateDate: Date, signature: string) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.comments = comments;
    this.status = status;
    this.signature = signature;
    this.updateDate = updateDate;
    this.phones = Object.assign([], phones);
  }
}

//DB definition
export class Parcel_db {
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
