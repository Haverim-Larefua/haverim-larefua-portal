import { IPackage, PackageModificationStatus } from "./packages.interface";

export interface IRootPageStateType {
    area: string;
    subArea: string;
}

export interface IRootStateType {
    page: IRootPageStateType;
}

export interface IPackagesState {
    packages: IPackage[];
    selectedPackage: IPackage | null;
    modificationState: PackageModificationStatus;
}

export interface IStateType {
    root: IRootStateType;
    packages: IPackagesState;
}

export interface IActionBase {
    type: string;
    [prop: string]: any;
}