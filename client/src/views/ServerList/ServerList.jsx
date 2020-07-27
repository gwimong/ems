import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Typography } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { ServerTableToolbarSelect, ServerTableToolbar, ServerDialog } from "./components";
import { ServerService } from "services";
import mockData from "./data";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ServerList = () => {
  const classes = useStyles();
  const [servers, setServers] = useState(mockData);
  const [serverId, setServerId] = useState(0);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState("");

  const [openState, setOpenState] = useState(false);
  const [isUpdateState, setIsUpdateState] = useState(0);

  const onChangeServers = () => {
    getServers();
  }

  const getServers = () => {
    ServerService.readAll()
      .then(res => {
        setServers(res.data);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(false);
      });
  }

  useEffect(() => {
    getServers();
  }, []);

  const handleOpenServerDialog = (isOpen) => {
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
      name: "update_date",
      label: "최근 갱신일",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "used",
      label: "사용 유무",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 1) {
            return "사용"
          } else {
            return "미사용"
          }
        }
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
            case 0: return "확인되지 않음";
            case 1: return "CHEKCING";
            case 2: return "ALIVE";
            case 3: return "DEAD";
            default: return "알 수 없음";
          }
        }
      }
    },
    {
      name: "server_ip",
      label: "서버 IP",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "purpose",
      label: "사용 용도",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "owner",
      label: "사용자",
      options: {
        filter: true,
        sort: true,
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
      name: "device_div",
      label: "장치 분류",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          switch (value) {
            case 0: return "확인되지 않음";
            case 1: return "단독운영";
            case 2: return "스토리지";
            case 3: return "클러스터";
            case 4: return "GPU서버";
            default: return "알 수 없음";
          }
        }
      }
    },
    {
      name: "device_manufacturer",
      label: "제조사",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          switch (value) {
            case 0: return "확인되지 않음";
            case 1: return "DELL";
            case 2: return "SUPERMICRO";
            case 3: return "COCOLINK";
            default: return "알 수 없음";
          }
        }
      }
    },
    {
      name: "device_type",
      label: "장치 타입",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          switch (value) {
            case 0: return "확인되지 않음";
            case 1: return "2베이 서버";
            case 2: return "4베이 서버";
            case 3: return "8베이 서버";
            case 4: return "10베이 서버";
            case 5: return "12베이 서버";
            case 6: return "14베이 서버";
            case 7: return "16베이 서버";
            case 8: return "18베이 서버";
            case 9: return "20베이 서버";
            case 10: return "클러스터 노드";
            case 20: return "GPU 서버";
            case 30: return "워크스테이션";
            default: return "알 수 없음";
          }
        }
      }
    },
    {
      name: "device_model",
      label: "장치 모델명",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "device_location",
      label: "장치 위치",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "device_size",
      label: "장치 크기",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "storage",
      label: "저장소",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "memory",
      label: "메모리",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "gpu",
      label: "GPU",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "ipmi_ip",
      label: "IPMI IP",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "ipmi_account",
      label: "IPMI 계정명",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "ipmi_password",
      label: "IPMI 계정 비밀번호",
      options: {
        filter: false,
        sort: true,
      }
    },

    {
      name: "os_type",
      label: "운영체제 종류",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          switch (value) {
            case 0: return "확인되지 않음";
            case 2: return "MAC";
            case 18: return "Windows NT";
            case 36: return "LINUX";
            default: return "알 수 없음";
          }
        }
      }
    },
    {
      name: "os_name",
      label: "운영체제 이름",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          switch (value) {
            case 0: return "확인되지 않음";
            case 1: return "Windows 7 Ultimate";
            case 2: return "Windows 7 Enterprise";
            case 3: return "Windows 7 Professional";
            case 4: return "Windows 7 Home Premium";
            case 5: return "Windows 7 Home Basic";
            case 6: return "Windows 7 Starter";
            case 7: return "Windows 8 Enterprise";
            case 8: return "Windows 8 Professional";
            case 9: return "Windows 8";
            case 10: return "Windows 10 Enterprise";
            case 11: return "Windows 10 Education";
            case 12: return "Windows 10 Professional";
            case 13: return "Windows 10 Home";
            case 101: return "CentOS 6.0";
            case 101: return "CentOS 6.1";
            case 102: return "CentOS 6.2";
            case 103: return "CentOS 6.3";
            case 104: return "CentOS 6.4";
            case 105: return "CentOS 6.5";
            case 106: return "CentOS 6.6";
            case 107: return "CentOS 6.7";
            case 108: return "CentOS 6.8";
            case 109: return "CentOS 6.9";
            case 110: return "CentOS 7.0";
            case 111: return "CentOS 7.1";
            case 112: return "CentOS 7.2";
            case 113: return "CentOS 7.3";
            case 114: return "CentOS 7.4";
            case 115: return "CentOS 7.5";
            case 116: return "CentOS 7.6";
            case 117: return "CentOS 7.7";
            case 18: return "CentOS 8.0";
            case 201: return "Ubuntu 14.04 LTS";
            case 202: return "Ubuntu 14.10";
            case 203: return "Ubuntu 15.04";
            case 204: return "Ubuntu 15.10";
            case 205: return "Ubuntu 16.04 LTS";
            case 206: return "Ubuntu 16.10";
            case 207: return "Ubuntu 17.04";
            case 208: return "Ubuntu 17.10";
            case 209: return "Ubuntu 18.04 LTS";
            case 210: return "Ubuntu 18.10";
            case 211: return "Ubuntu 19.04";
            case 212: return "Ubuntu 19.10";
            default: return "알 수 없음";
          }
        }
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
      <ServerTableToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} onChangeServers={onChangeServers} />
    ),
    customToolbar: () => {
      return (
        <ServerTableToolbar setIsUpdateState={setIsUpdateState} onChangeServers={onChangeServers} handleOpenServerDialog={handleOpenServerDialog} />
      );
    },
    onRowClick: (rowData, rowMeta) => {
      console.log(rowData);
      setServerId(rowData[0]);
      setOpenState(true);
      setIsUpdateState(true);
    },
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
            title={"Server List"}
            data={servers}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
        <ServerDialog openState={openState}
          isUpdateState={isUpdateState}
          mockData={mockData[0]}
          serverId={serverId}
          onChangeServers={onChangeServers}
          handleOpenServerDialog={handleOpenServerDialog} />
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

export default ServerList;