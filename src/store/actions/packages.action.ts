import { IPackage } from "../interfaces/packages.interface";

export const ADD_PACKAGE: string = "ADD_PACKAGE";
export const EDIT_PACKAGE: string = "EDIT_PACKAGE";
export const REMOVE_PACKAGE: string = "REMOVE_PACKAGE";

export function addPackage(tmppackage: IPackage): IAddPackageActionType {
    return { type: ADD_PACKAGE, package: tmppackage }; 
}

export function editPackage(tmppackage: IPackage): IEditPackageActionType {
    return { type: EDIT_PACKAGE, package: tmppackage };
}

export function removePackage(packageId: number): IRemovePackageActionType {
    return { type: REMOVE_PACKAGE, packageId: packageId };
}

interface IAddPackageActionType { type: string, package: IPackage };
interface IEditPackageActionType { type: string, package: IPackage };
interface IRemovePackageActionType { type: string, packageId: number };