import { IPackagesState, IActionBase } from "../interfaces/root.interface";
import { IPackage, PackageModificationStatus } from "../interfaces/packages.interface";
import { ADD_PACKAGE, EDIT_PACKAGE, REMOVE_PACKAGE, LOAD_PACKAGES } from "../actions/packages.action";

const initialState: IPackagesState = {
    modificationState: PackageModificationStatus.None,
    selectedPackage: null,
    packages: []
}

function packagesReducer(state: IPackagesState = initialState, action: IActionBase): IPackagesState {
    switch(action.type) {

        case LOAD_PACKAGES: {
            return { ...state, packages: action.packages };
        }
        case ADD_PACKAGE: {
            let maxId: number = Math.max.apply(Math, state.packages.map(function(o) { return o.id }));
            action.package.id = maxId + 1;
            return { ...state, packages: [ ...state.packages,  ] };
        }
        case EDIT_PACKAGE: {
            const foundIndex: number = state.packages.findIndex(pack => pack.id === action.package.id);
            let temppackages: IPackage[] = state.packages;
            temppackages[foundIndex] = action.package;
            return { ...state, packages: temppackages};
        }
        case REMOVE_PACKAGE: {
            return { ...state, packages: state.packages.filter(pack => pack.id !== action.id) };
        }
        default: 
            return state;
    }
}

// Define the Package State
export interface IPackageState {
    readonly packages: IPackage[];
  }
  

export default packagesReducer;