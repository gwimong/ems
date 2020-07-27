import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from "@material-ui/core";

import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import AndroidIcon from "@material-ui/icons/Android";
import AppleIcon from "@material-ui/icons/Apple";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  chartContainer: {
    position: "relative",
    height: "300px"
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  },
  device: {
    textAlign: "center",
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const OSByDevice = props => {
  const { className, pcList, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [osCount, setOSCount] = useState([100, 0, 0, 0]);

  const data = {
    datasets: [
      {
        data: osCount,
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.warning.main,
          theme.palette.success.main,
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ["Windows 10", "Mac", "Linux", "Etc"]
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: "Windows 10",
      value: osCount[0],
      icon: <LaptopMacIcon />,
      color: theme.palette.primary.main
    },
    {
      title: "Windows 8",
      value: osCount[1],
      icon: <LaptopMacIcon />,
      color: theme.palette.secondary.main
    },
    {
      title: "Linux",
      value: osCount[2],
      icon: <AndroidIcon />,
      color: theme.palette.warning.main
    },
    {
      title: "Mac",
      value: osCount[3],
      icon: <AppleIcon />,
      color: theme.palette.success.main
    }
  ];

  useEffect(() => {
    if (pcList != null) {
      let win10Count = 0;
      let macCount = 0;
      let linuxCount = 0;
      let etcCount = 0;
      const total = pcList.length;
      pcList.forEach(item => {
        if (item.OSType == 18) win10Count++;
        else if (item.OSType == 1) macCount++;
        else if (item.OSType == 1) linuxCount++;
        else etcCount++;
      });
      
      setOSCount([win10Count/total*100, macCount/total*100, linuxCount/total*100, etcCount/total*100]);
    }
  }, [pcList]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Users By Device"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h5"
              >
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

OSByDevice.propTypes = {
  className: PropTypes.string
};

export default OSByDevice;
