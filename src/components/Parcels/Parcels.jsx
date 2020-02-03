import React, { useState, useContext, useEffect } from "react";
import ParcelsImporterService from "../../services/ParcelsImporter.service";
import { addParcels, loadParcels } from "../../contexts/actions/parcels.action";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { parcelContext } from "../../contexts/parcelContext";
// import usePrevious from "../../contexts/userPrevious";
import httpService from "../../services/http";
import AppConstants from "../../constants/AppConstants";
import { parcelStatusesValues } from "../../contexts/interfaces/parcels.interface";

const Parcels = () => {
  const [parcelExtendedData, dispatch] = useContext(parcelContext);
  //   const prevparcelExtendedData = usePrevious(parcelExtendedData);

  const [statusFilterTerm, setStatusFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (searching) {
        return;
      }
      setSearching(true);
      const response = await httpService.searchParcels(statusFilterTerm, cityFilterTerm,  nameSearchTerm);
      dispatch(loadParcels(response));
      setSearching(false);
    }
    fetchData();
    //throttle(fetchData, 300);
  }, [statusFilterTerm, cityFilterTerm, nameSearchTerm, dispatch]);


  const statuses = [AppConstants.all, ...Object.values(parcelStatusesValues)];

  // ToolbarOptions
  const options = [
    { title: AppConstants.statusUIName, name: "status", values: statuses, filter: setStatusFilterTerm, bullets: true },
    { title: AppConstants.cityUIName,   name: "cities", values: [AppConstants.all, ...parcelExtendedData.cities], filter: setCityFilterTerm }
  ];



  const handleChange = e => {
    const files = e.target.files;
    if (files) {
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
        data={parcelExtendedData.parcels}
        tableColumns={tableColumns}
        subHeaderComponent={
          <Toolbar
            title={AppConstants.parcelsUIName}
            actionTitle={AppConstants.addFromFileUIName}
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
