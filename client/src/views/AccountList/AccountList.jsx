import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Typography } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { AccountTableToolbarSelect, AccountTableToolbar, AccountDialog } from "./components";
import { AccountService, ServerService } from "services";
import mockData from "./data";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const AccountList = () => {
  const classes = useStyles();
  const [accounts, setAccounts] = useState(mockData);
  const [serverItems, setServerItems] = useState([]);
  const [accountId, setAccountId] = useState(0);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState("");

  const [openState, setOpenState] = useState(false);
  const [isUpdateState, setIsUpdateState] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const onChangeAccounts = () => {
    getAccounts();
  }

  const getAccounts = () => {
    AccountService.readAll()
      .then(res => {
        setAccounts(res.data);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(false);
      });
  }

  const getServerItems = () => {
    ServerService.readAll().then(res => {
      setServerItems(res.data);
    });
  }

  useEffect(() => {
    getAccounts();
    getServerItems();
  }, []);

  const handleOpenAccountDialog = (isOpen) => {
    setOpenState(isOpen);
  }

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: "excluded",
        filter: false,
        sort: true,
      }
    },
    {
      name: "health",
      label: "상태",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          switch (value) {
            case 0: return "변경 완료";
            case 1: return "CHEKCING";
            case 2: return "ALIVE";
            case 3: return "ALIVE_SSH";
            case 4: return "SUCCESS PASSWD";
            case 9: return "DEAD";
            case 11: return "ARG_ERROR";
            case 12: return "SVR_WRNG_ACCOUNT";
            case 13: return "CONN_FAILED";
            case 14: return "DB_ERROR";
            case 15: return "DB_FAIL";
            case 16: return "DB_DUPLICATE";
            case 21: return "COMMAND_FAIL";
            default: return "알 수 없음";
          }
        }
      }
    },
    {
      name: "use_ssh",
      label: "SSH",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value) { return "허용" }
          else { return "미허용" }
        }
      }
    },
    {
      name: "server_name",
      label: "서버명",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "server_account",
      label: "서버 계정명",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "server_password",
      label: "서버 비밀번호",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "server_password_update_date",
      label: "서버 비밀번호 변경일",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "create_date",
      label: "최초 생성일",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "comment",
      label: "비고",
      options: {
        filter: true,
        sort: true,
      }
    }


  ];

  const options = {
    filterType: "multiselect",
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <AccountTableToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} onChangeAccounts={onChangeAccounts} />
    ),
    customToolbar: () => {
      return (
        <AccountTableToolbar setIsUpdateState={setIsUpdateState} onChangeAccounts={onChangeAccounts} handleOpenAccountDialog={handleOpenAccountDialog} />
      );
    },
    onRowClick: (rowData, rowMeta) => {
      console.log(rowData);
      setAccountId(rowData[0]);
      setOpenState(true);
      setIsUpdateState(true);
    }
  };


  const myTheme = createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
        root: {
          "whiteSpace": "nowrap",
          "text-align": "center"
        }
      },
      MUIDataTableBodyCell: {
        root: {
          "whiteSpace": "nowrap",
          "text-align": "center"
        }
      }
    },
  });


  if (load) {
    return (
      <div>
        <MuiThemeProvider theme={myTheme}>
          <MUIDataTable
            title={"Account List"}
            data={accounts}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
        <AccountDialog openState={openState}
          isUpdateState={isUpdateState}
          accountId={accountId}
          onChangeAccounts={onChangeAccounts}
          handleOpenAccountDialog={handleOpenAccountDialog}
          serverItems={serverItems}
           />
      </div>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    );
  }
};

export default AccountList;