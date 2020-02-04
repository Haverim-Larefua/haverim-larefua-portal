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
import logger from "../../Utils/logger";

const Parcels = () => {
  const [parcelExtendedData, dispatch] = useContext(parcelContext);
  //   const prevparcelExtendedData = usePrevious(parcelExtendedData);

  const [statusFilterTerm, setStatusFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  const [selectedRowsState, setSelectedRowsState] = useState({allSelected: false, selectedCount: 0, selectedRows: []});

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

  //selectedRowsState = { allSelected, selectedCount, selectedRows }
  const onSelectedRowsChanged = selectedRowsState => {
    logger.log('[Parcels] onSelectedRowsChanged ', selectedRowsState);
    setSelectedRowsState(selectedRowsState);
  }

  const buildSubTitle = () => {
    return (
        selectedRowsState.selectedCount > 0 
          ? `${selectedRowsState.selectedCount} חבילות נבחרו` 
          : ''
          )
  }

  const isWithOptionsAnSearch = () => {
    return selectedRowsState.selectedCount === 0
  }

  const handleAction = e => {
    if (isWithOptionsAnSearch()) { // load from file
      const files = e.target.files;
      if (files) {
        handleFile(files[0]);
      }
    } else { // associate user to parcels
      logger.log('[Parcel] handleAction associate user to parcel' );
    }
  };

  const handleFile = async file => {
    const data = await ParcelsImporterService.ImportFromExcel(file);
    dispatch(addParcels(data));
  };

  const buildToolBar = () => {
    const withOptionsAndSearch = isWithOptionsAnSearch();
    const actionTitle = withOptionsAndSearch ? AppConstants.addFromFileUIName : AppConstants.associateUserUIName;
    return (  
      <Toolbar
        title={AppConstants.parcelsUIName}
        subTitle={buildSubTitle()}
        actionTitle={actionTitle}
        action={handleAction}
        withOptions = {withOptionsAndSearch}
        options={options}
        search={setNameSearchTerm}
        withSearch = {withOptionsAndSearch}
        uploadButton = {withOptionsAndSearch}
      />)
  }

  return (
    <div>
      <Table
        data={parcelExtendedData.parcels}
        tableColumns={tableColumns}
        onSelectedRowsChange={onSelectedRowsChanged}
        subHeaderComponent={buildToolBar()}
      />
      {/* {searching && <Loader color="#d36ac2" width={6} speed={2} />} */}
    </div>
  );
}

export default Parcels;
