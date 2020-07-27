import React, { useState, useEffect } from "react";
import moment from "moment";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DevicesIcon from "@material-ui/icons/Devices";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.info.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center"
  },
  differenceSuccessIcon: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  },
  differenceErrorIcon: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  differenceValue: {
    //color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const TotalPC = props => {
  const { className, pcList, ...rest } = props;

  const classes = useStyles();

  const toDay = moment();
  const [totalCount, setTotalCount] = useState(0);
  const [increaseValue, setIncreaseValue] = useState(0);

  let icon;
  if(increaseValue > 0) {
    icon = <ArrowUpwardIcon className={classes.differenceSuccessIcon} />
  } else if(increaseValue < 0) {
    icon = <ArrowDownwardIcon className={classes.differenceErrorIcon} />
  } 

  useEffect(() => {
    if(pcList != null) {
      setTotalCount(pcList.length);
      setIncreaseValue(pcList.filter(item => {
        return moment.duration(toDay.diff(item.CreateDate)).asMonths() < 1;
      }).length);
    }
  }, [pcList]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Total PC Count
            </Typography>
            <Typography variant="h3">{totalCount}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <DevicesIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {icon}
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {increaseValue} 
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Changed Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalPC.propTypes = {
  className: PropTypes.string
};

export default TotalPC;
