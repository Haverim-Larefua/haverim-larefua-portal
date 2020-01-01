import React, { Component, Fragment } from 'react'
import XLSX from 'xlsx';
import PackagesList from './PackagesList';

interface state {
    file: Blob;
    data: Array<any>;
    cols: Array<any>
}

const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

class Packages extends Component<any, state> {
    constructor(props:any) {
      super(props);
      this.state = {
        file: new Blob(),
        data: [],
        cols: []
      }
      this.handleFile = this.handleFile.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e: any) {
      const files = e.target.files;
      if (files && files[0]) this.setState({ file: files[0] });

      this.handleFile();
    };
   
    make_cols(refstr: any) {
        let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
        for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
        return o;
    };

    handleFile() {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
   
      reader.onload = (e: any) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */
        this.setState({ data: data, cols: this.make_cols(ws['!ref']) }, () => {
          console.log(JSON.stringify(this.state.data, null, 2));
        });
      };
   
      if (rABS) {
        reader.readAsBinaryString(this.state.file);
      } else {
        reader.readAsArrayBuffer(this.state.file);
      };
    }

    render() {
        return (
            <Fragment>
                
                <div>
                    <label htmlFor="file">Upload a file:</label>
                    <br />
                    <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />  
                </div>

                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-green">Product List</h6>
                                {/* <div className="header-buttons">
                                    <button className="btn btn-success btn-green" onClick={() =>
                                    dispatch(setModificationState(ProductModificationStatus.Create))}>
                                    <i className="fas fa fa-plus"></i>
                                    </button>
                                    <button className="btn btn-success btn-blue" onClick={() =>
                                    dispatch(setModificationState(ProductModificationStatus.Edit))}>
                                    <i className="fas fa fa-pen"></i>
                                    </button>
                                    <button className="btn btn-success btn-red" onClick={() => onProductRemove()}>
                                    <i className="fas fa fa-times"></i>
                                    </button>
                                </div> */}
                            </div>
                            <div className="card-body">
                                <PackagesList 
                                    // onSelect={onProductSelect}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment> 
        )
    }
}

export default Packages;
