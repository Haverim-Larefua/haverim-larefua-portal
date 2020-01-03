import { IPackage } from "../interfaces/packages.interface";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IPackageState } from '../reducers/packages.reducer';
import axios from 'axios';

export const ADD_PACKAGE: string = "ADD_PACKAGE";
export const EDIT_PACKAGE: string = "EDIT_PACKAGE";
export const REMOVE_PACKAGE: string = "REMOVE_PACKAGE";
export const LOAD_PACKAGES: string = "LOAD_PACKAGES";

export function loadPackagesSuccess(packages: IPackage[]): ILoadPackagesActionType {
    return {type: LOAD_PACKAGES, packages };
}

export function addPackage(tmppackage: IPackage): IAddPackageActionType {
    return { type: ADD_PACKAGE, package: tmppackage }; 
}

export function editPackage(tmppackage: IPackage): IEditPackageActionType {
    return { type: EDIT_PACKAGE, package: tmppackage };
}

export function removePackage(packageId: number): IRemovePackageActionType {
    return { type: REMOVE_PACKAGE, packageId: packageId };
}

interface ILoadPackagesActionType { type: string, packages: IPackage[] };
interface IAddPackageActionType { type: string, package: IPackage };
interface IEditPackageActionType { type: string, package: IPackage };
interface IRemovePackageActionType { type: string, packageId: number };

export type PackageActions = ILoadPackagesActionType;

/* Get All Packages */
// TODO: Use the packageservice
export const getAllPackages: ActionCreator<
        ThunkAction<Promise<any>, IPackageState, null, ILoadPackagesActionType>
    > = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://localhost:4202/api/packages');
      dispatch({
        packages: response.data.default,
        type: LOAD_PACKAGES,
      });
    } catch (err) {
      console.error(err);
    }
  };
};