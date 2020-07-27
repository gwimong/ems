import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { PCTableToolbarSelect } from "./components";
import { PcService } from "services";
import mockData from "./data";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PCList = () => {
  const classes = useStyles();
  const [pcs, setPCs] = useState(mockData);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const onChangePCs = () => {
    getPCs();
  }

  const getPCs = () => {
    PcService.readAll()
      .then(res => {
        setPCs(res.data);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(false);
      });
  }

  useEffect(() => {
    getPCs();
  }, []);

  const columns = [
    {
      name: "PCId",
      label: "Id",
      options: {
        display: "excluded",
        filter: false,
        sort: true,
      }
    },
    {
      name: "PCName",
      label: "이름",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "PCOwner",
      label: "소유자",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "IsOSValidation",
      label: "OS 점검",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 1) {
            return "통과"
          } else {
            return "미통과"
          }
        }
      }
    },
    {
      name: "IsPasswordPolicyValidation",
      label: "비밀번호 정책",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 1) {
            return "통과"
          } else {
            return "미통과"
          }
        }
      }
    },
    {
      name: "IsScreenValidation",
      label: "화면 보호 정책",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 1) {
            return "통과"
          } else {
            return "미통과"
          }
        }
      }
    },
    {
      name: "IsProductValidation",
      label: "프로그램 정책",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 1) {
            return "통과"
          } else {
            return "미통과"
          }
        }
      }
    },
    {
      name: "IsVaccineValidation",
      label: "백신 설치",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 1) {
            return "통과"
          } else {
            return "미통과"
          }
        }
      }
    },
    {
      name: "OSType",
      label: "운영체제 종류",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 18) {
            return "Windows NT"
          } else {
            return "알 수 없음"
          }
        }
      }
    },
    {
      name: "OSName",
      label: "운영체제 이름",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "OSSerialNumber",
      label: "운영체제 시리얼",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "UpdateDate",
      label: "최근 갱신일",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "MinimumPasswordAge",
      label: "최소 패스워드 변경일",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "MaximumPasswordAge",
      label: "최대 패스워드 변경일",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "MinimumPasswordLength",
      label: "최대 비밀번호 길이",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "PasswordComplexity",
      label: "비밀번호 복잡도 사용",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "PasswordHistorySize",
      label: "최근 비밀번호 기록 수",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "LockoutBadCount",
      label: "계정 잠금 횟수",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "ResetLockoutCount",
      label: "계장 잠금 해제 횟수",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "LockoutDuration",
      label: "계정 잠금 설정",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "ScreenSaverIsSecure",
      label: "화면 보호기 설정",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "ScreenSaveTimeOut",
      label: "화면 보호기 시간",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "ScreenSaveFilePath",
      label: "화면 호보기 경로",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "Processor",
      label: "프로세서",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "MemorySize",
      label: "메모리",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "ComputerName",
      label: "컴퓨터 이름",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "ComputerDescription",
      label: "컴퓨터 설명",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "PhysicalAddress",
      label: "물리 주소",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "IP4Address",
      label: "IP 주소",
      options: {
        filter: false,
        sort: true,
      }
    },

  ];

  const options = {
    filterType: "multiselect",
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <PCTableToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} onChangePCs={onChangePCs} />
    ),
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
    return (<MuiThemeProvider theme={myTheme}>
      <MUIDataTable
        title={"PC List"}
        data={pcs}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    );
  }

};

export default PCList;