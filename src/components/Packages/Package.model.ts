export default class Package {
  name: string;
  address: string;
  city: string;
  phones: [];
  comments: string;
  signature: string; // base64

  constructor(
    name: string,
    address: string,
    city: string,
    phones: [],
    comments: string,
    signature: string
  ) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.comments = comments;
    this.signature = signature;
    this.phones = Object.assign([], phones);
  }
}

export class Parcel {
  // @PrimaryGeneratedColumn()
  id: number | undefined;
  // @Column()
  no: string | undefined;
  // @Column()
  destination: string | undefined;;
  // @Column({ name: 'destination_address' })
  destinationAddress: string | undefined;;
  // @Column({ name: 'destination_phone' })
  destinationPhone: string | undefined;;
  // @Column()
  address: string | undefined;;
  // @Column({ name: 'delivery_person' })
  deliveryPerson: string | undefined;;
  // @Column({ name: 'delivery_person_phone' })
  deliveryPersonPhone: string | undefined;;
  // @Column()
  comments: string | undefined;;
  // @Column({ name: 'update_date' })
  updateDate: Date | undefined;;
}
