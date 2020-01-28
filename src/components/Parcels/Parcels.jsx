import React, { Fragment, useReducer } from 'react'
import ParcelsImporterService from '../../services/ParcelsImporter.service'
import { addParcels } from '../../contexts/actions/parcels.action';
import { parcelReducer } from '../../reducers/parcelReducer';
import ParcelsList from './ParcelsList';

const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");


const Parcels = () => {

  const [ parcels, dispatch ] = useReducer(parcelReducer);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files){
       handleFile(files[0]);
    }
  };
  
  const handleFile = async(file) => {
      const data = await ParcelsImporterService.ImportFromExcel(file);
      dispatch(addParcels(data));
  }
  
  return (
    <Fragment>
                <div>
                    <label htmlFor="file">Upload a file:</label>
                    <br />
                    <input type="file" className="form-control" 
                    id="file" accept={SheetJSFT} onChange={handleChange} />  
                </div>

                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-green">רשימת חבילות</h6>
                                
                            </div>
                            <div className="card-body">
                                <ParcelsList  />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment> 
        )
}
 
export default Parcels;

