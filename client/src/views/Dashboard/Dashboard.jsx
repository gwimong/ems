import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { LicensedProductService, InspaceProductService, PcService } from "services";

import {
  TotalPC,
  TotalLicensed,
  TotalProduct,
  TasksProgress,
  LatestUpdated,
  OSByDevice,
  LatestLicensed,
  LatestTasks
} from "./components";
import muiThemeable from "material-ui/styles/muiThemeable";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  // Test Mockup data
  // const [productList, setProductList] = useState(mockInspaceData);
  // const [pcList, setPcList] = useState(mockPCData);
  // const [licensedList, setLicensedList] = useState([mockLicensedData]);

  const [productList, setProductList] = useState([]);
  const [pcList, setPcList] = useState([]);
  const [licensedList, setLicensedList] = useState([]);

  const getTotalData = async () => {

    InspaceProductService.readAll()
      .then(res => {
        setProductList(res.data);
      });

    PcService.readAll().then(res => {
      setPcList(res.data);
    });

    LicensedProductService.readAll().then(res => {
      setLicensedList(res.data);
    });
  }

  useEffect(() => {
    getTotalData();
  }, []);

  return (
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalProduct productList={productList} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalPC pcList={pcList} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalLicensed licensedList={licensedList} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TasksProgress pcList={pcList} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestUpdated pcList={pcList} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <OSByDevice pcList={pcList} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <LatestLicensed licensedList={licensedList} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestTasks pcList={pcList} />
            </Grid>
          </Grid>
        </div>
  );
};

export default Dashboard;