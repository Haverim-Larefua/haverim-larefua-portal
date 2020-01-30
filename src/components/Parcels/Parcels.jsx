import React, { useState, useContext } from "react";
import ParcelsImporterService from "../../services/ParcelsImporter.service";
import { addParcels, setParcels } from "../../contexts/actions/parcels.action";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { parcelContext } from "../../contexts/parcelContext";
import Modal from "../shared/Modal/Modal";
import usePrevious from "../../contexts/userPrevious";

const SheetJSFT = ["xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt"]
  .map(function(x) { return "." + x;}).join(",");

const Parcels = () => {
  const [parcelExplained, dispatch] = useContext(parcelContext);
  const [show, setShow] = useState(false);
  const prevParcelExplained = usePrevious(parcelExplained);
  
  const searchByName = (value) => {
    console.log('[Parcels] searchByName ', value);
    if (!value || value.trim() ==='') {
        dispatch(setParcels(prevParcelExplained.parcels));
    } else {
        const val = value.toLowerCase();
        const filteredParcels = parcelExplained.parcels.filter(item => 
            item.name && item.name.toLowerCase().indexOf(val)!==-1);
        dispatch(setParcels(filteredParcels));
    }
  }

  const filterByStatus = (value) => {
    console.log('[Parcels] filterByStatus ', value);
    if (!value || value ==='') {
        dispatch(setParcels(prevParcelExplained.parcels));
    } else {
        const filteredParcels = parcelExplained.parcels.filter(item => item.status === value);
        dispatch(setParcels(filteredParcels));
    }
  }

  const filterByCity = (value) => {
    console.log('[Parcels] filterByCity ', value);
    if (!value || value ==='') {
        dispatch(setParcels(prevParcelExplained.parcels));
    } else {
        const filteredParcels = parcelExplained.parcels.filter(item => item.city === value);
        dispatch(setParcels(filteredParcels));
    }
  }

  const cities = ['באר שבע', 'תל אביב', 'הרצלייה', 'חיפה', 'עכו', 'ערד', 'תל שבע'];
  const statuses = ['הכל','מוכנה לחלוקה','בחלוקה','בחריגה','נמסרה'];

  // ToolbarOptions
  const options = [
    {title: 'סטטוס' , name: 'status', values: statuses, filter: filterByStatus},
    {title: 'עיר', name: 'cities', values: cities, filter: filterByCity}
  ];

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };


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
        data={parcelExplained.parcels}
        tableColumns={tableColumns}
        subHeaderComponent={ 
            <Toolbar 
            title="חבילות" 
            actionTitle= "+ הוספה מקובץ" 
            action={showModal} 
            options={options}
            search={searchByName}/> }
      />
    </div>
  );

};

export default Parcels;
