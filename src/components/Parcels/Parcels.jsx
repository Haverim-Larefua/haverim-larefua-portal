import React, { useState, useContext } from "react";
import ParcelsImporterService from "../../services/ParcelsImporter.service";
import { addParcels } from "../../contexts/actions/parcels.action";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { parcelContext } from "../../contexts/parcelContext";
import Modal from "../shared/Modal/Modal";

const SheetJSFT = ["xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt"]
  .map(function(x) { return "." + x;}).join(",");

const Parcels = () => {
  const [parcels, dispatch] = useContext(parcelContext);
  const [show, setShow] = useState(false);

  const cities = ['באר שבע', 'תל אביב', 'הרצלייה', 'חיפה', 'עכו', 'ערד', 'תל שבע'];
  const statuses = ['הכל','מוכנה לחלוקה','בחלוקה','בחריגה','נמסרה'];

  // ToolbarOptions
  const options = [
    {title: 'סטטוס' , name: 'status', values: statuses},
    {title: 'עיר', name: 'cities', values: cities},
  ];
  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const search = (searchTerm) => {
      //TODO: search parcels here
      console.log('[Parcels] search ', searchTerm);
  }

  //dispatch(removeParcel(pkg.id))}

  const handleChange = e => {
    const files = e.target.files;
    if (files) {
      setShow(false);
      handleFile(files[0]);
    }
  };

  const handleFile = async file => {
    const data = await ParcelsImporterService.ImportFromExcel(file);
    dispatch(addParcels(data));
  };

  return (
    <div>
      <Modal show={show} handleClose={hideModal}>
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange}/>
      </Modal>

      <Table
        data={parcels}
        tableColumns={tableColumns}
        subHeaderComponent={ 
            <Toolbar 
            title="חבילות" 
            actionTitle= "+ הוספה מקובץ" 
            action={showModal} 
            options={options}
            search={search}/> }
      />
    </div>
  );

};

export default Parcels;
