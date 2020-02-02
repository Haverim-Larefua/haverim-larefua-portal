import React, { useState, useContext, useEffect } from "react";
import ParcelsImporterService from "../../services/ParcelsImporter.service";
import { addParcels, loadParcels } from "../../contexts/actions/parcels.action";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { parcelContext } from "../../contexts/parcelContext";
import Modal from "../shared/Modal/Modal";
// import usePrevious from "../../contexts/userPrevious";
import httpService from "../../services/http";
import AppConstants from '../../constants/AppConstants';

const SheetJSFT = ["xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt"]
  .map(function(x) {
    return "." + x;
  })
  .join(",");

const Parcels = () => {
  const [parcelExplained, dispatch] = useContext(parcelContext);
  const [show, setShow] = useState(false);
//   const prevParcelExplained = usePrevious(parcelExplained);

  const [statusFilterTerm, setStatusFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);


  useEffect(() => {
    async function fetchData() {
        setSearching(true);
        const response = await httpService.searchParcels(statusFilterTerm, cityFilterTerm, nameSearchTerm );
        dispatch(loadParcels(response));
        setSearching(false);
    }
    fetchData();
    //throttle(fetchData, 300);
  }, [statusFilterTerm && !searching, cityFilterTerm && !searching, nameSearchTerm && !searching]);


  const cities = [ "באר שבע","תל אביב",  "הרצלייה", "חיפה",  "עכו",  "ערד",  "תל שבע" ];
  const statuses = ["הכל", "מוכנה לחלוקה", "בחלוקה", "בחריגה", "נמסרה"];

  // ToolbarOptions
  const options = [
      {title: AppConstants.statusUIName, name: "status", values: statuses, filter: setStatusFilterTerm },
      {title: AppConstants.cityUIName,   name: "cities", values: cities,   filter: setCityFilterTerm }
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
      <Table
        data={parcelExplained.parcels}
        tableColumns={tableColumns}
        subHeaderComponent={
          <Toolbar
            title="חבילות"
            actionTitle="הוספה מקובץ"
            action={handleChange}
            options={options}
            search={setNameSearchTerm}
            uploadButton
          />
        }
      />
      {/* {searching && <Loader color="#d36ac2" width={6} speed={2} />} */}
    </div>
  );
};

export default Parcels;
