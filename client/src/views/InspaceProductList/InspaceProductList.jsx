import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { CustomToolbarSelect } from "./components";
import { InspaceProductService } from "services";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const InspaceProductList = () => {
  const classes = useStyles();

  const [inspaceProducts, setInspaceProducts] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const onChangeLicenseProduct = () => {
    getLicenseProducts();
  }

  const getLicenseProducts = () => {
    InspaceProductService.readAll()
      .then(res => {
        setInspaceProducts(res.data);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(false);
      });
  }

  useEffect(() => {
    getLicenseProducts();
  }, []);

  const columns = [
    {
      name: "Id",
      label: "Id",
      options: {
        display: "excluded",
        filter: false,
        sort: true,
      }
    },
    {
      name: "ProductName",
      label: "ProductName",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "Publisher",
      label: "Publisher",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "SoftwareType",
      label: "SoftwareType",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 0) {
            return "확인되지 않음"
          } if (value === 1) {
            return "상용소프트웨어"
          } if (value === 2) {
            return "프리웨어"
          } if (value === 3) {
            return "쉐어웨어"
          } if (value === 4) {
            return "범용소프트웨어"
          } if (value === 5) {
            return "번들소프트웨어"
          } else {
            return "알 수 없음"
          }
        }
      }
    },
    {
      name: "IsAuthorized",
      label: "IsAuthorized",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 1) {
            return "허용됨"
          } else {
            return "비인가"
          }
        }
      }
    }
  ];
  const options = {
    filterType: "multiselect",
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} onChangeLicenseProduct={onChangeLicenseProduct} />
    ),
  };

  if (load) {
    return (
      <MUIDataTable
        title={"Product List"}
        data={inspaceProducts}
        columns={columns}
        options={options}
      />
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    );
  }

};

export default InspaceProductList;