import React from 'react'
import { IPackage } from '../../store/interfaces/packages.interface';
import { IStateType, IPackagesState } from '../../store/interfaces/root.interface';
import { useSelector } from 'react-redux';

export type packageListProps = {
    onSelect?: (temppackage: IPackage) => void;
    children?: React.ReactNode;
  };

function PackagesList(props: packageListProps): JSX.Element {
    const packages: IPackagesState = useSelector((state: IStateType) => state.packages);

    const packageElements: (JSX.Element | null)[] = packages.packages.map(tmppackage => {
        if (!tmppackage) { return null; }
        return (
            <tr className={`table-row ${(packages.selectedPackage && packages.selectedPackage.id === tmppackage.id) ? "selected" : ""}`}
                onClick={() => {
                    if(props.onSelect) props.onSelect(tmppackage);
                }}
                key={`product_${tmppackage.id}`}>
                <th scope="row">{tmppackage.id}</th>
                <td>{tmppackage.firstname} + ' ' {tmppackage.lastname}</td>
                <td>{tmppackage.address}</td>
                <td>{tmppackage.city}</td>
                <td>{tmppackage.phone}</td>
                <td>{tmppackage.signature}</td>
            </tr>
        );
    });


    return (
        <div className="table-responsive portlet">
        <table className="table">
            <thead className="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">Phone</th>
                <th scope="col">Signature</th>
            </tr>
            </thead>
            <tbody>
            {packageElements}
            </tbody>
        </table>
        </div>

    );
}

export default PackagesList;
