const tableStyles = {
  table: {
    style: {
    },
  },

  tableWrapper: {
    style: {
      height: 'auto',
    },
  },

  rows: {
    style: {
      minHeight: '60px', // override the row height
    }
  },
  headCells: {
    style: {
      fontSize: 16,
      fontWeight: 'bold',
      borderLeft: '1px solid #dcdeea',
      borderImage:  'linear-gradient(to top, #dcdeea, rgb(255, 255, 255, 0)) 1 50%'
    },
  },
  cells: {
    style: {
      borderLeft: '1px solid #dcdeea',
      fontSize: 16,
    },
  },
};

export default tableStyles;