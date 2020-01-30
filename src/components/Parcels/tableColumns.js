
const tableColumns  = [
   {
    name: 'מזהה',
    selector: 'id',
    sortable: true,
    },
    {
    name: 'סטטוס',
    selector: 'status',
    sortable: true,
    },
    {
      name: 'שם',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'כתובת',
      selector: 'address',
      sortable: true,
    },
    {
      name: 'עיר',
      selector: 'city',
      sortable: true,
    },
    {
      name: 'טלפון',
      selector: 'phones',
      sortable: true,
    },
    {
      name: 'שליח',
      selector: 'signature',
      sortable: false,
    },
  ]

  export default tableColumns;