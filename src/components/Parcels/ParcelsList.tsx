import React, { useContext }  from 'react'
import { parcelContext } from '../../contexts/parcelContext';
import parcel from '../../contexts/interfaces/parcels.interface';
import ParcelDetails from './ParcelDetails';


  const ParcelsList = () => {
      
    const { parcels } = useContext(parcelContext);

    const areThereparcels = () => {
        return parcels && parcels.parcels && parcels.parcels.length ;
    }

    return areThereparcels() 
    ? (
        <div>
          <ul>
            { parcels.parcels.map((pkg: parcel) => {
                return ( <ParcelDetails pkg={pkg} key={pkg.id} /> );
            })}
          </ul>
        </div>
      ) 
      : (
        <div className="empty">No pkg :).</div>
      );
    }

export default ParcelsList;
