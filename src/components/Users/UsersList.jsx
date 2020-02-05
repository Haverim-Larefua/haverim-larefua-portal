import React, { useContext, useState, useEffect } from "react";
import Select from 'react-select';
import { userContext } from "../../contexts/userContext";
// import AppConstants from "../../constants/AppConstants";

const UsersList = (props) => {
    const [userExtendedData, dispatch] = useContext(userContext);
    const [options, setOptions] = useState([]);
    // const [selectedOption, setSelectedOption] = useState({});

    useEffect(() => {
        function createList() {
          const opts = [];
          userExtendedData.users.forEach(user => {
            opts.push({value: user.id, label: `${user.firstName}  ${user.lastName}`});
          })
          setOptions(opts);
        }
        createList();
      }, [userExtendedData]);
    

      const handleChange = selectedOption => {
        // setSelectedOption(selectedOption);
        console.log(`[UsersList] handleChange : Option selected:`, selectedOption);
        props.updateSelectedUser(selectedOption);
      };

    return (
        <Select
        value={options}
        onChange={handleChange}
        options={options}
        isSearchable
        isClearable
        placehoslder=''
        />
      );
}
 
export default UsersList;