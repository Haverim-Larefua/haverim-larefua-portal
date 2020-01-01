export interface IPackage {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    phone: string;
    comments: string;
    signature: string;
}

export enum PackageModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}