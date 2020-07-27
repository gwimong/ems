import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from "@material-ui/core";
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";

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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  successFont: {
    color: theme.palette.success.main,
  },
  failFont: {
    color: theme.palette.error.main,
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TasksProgress = props => {
  const { className, pcList, ...rest } = props;

  const classes = useStyles();
  const [successCount, SetTotalSuccessCount] = useState(0);
  const [failCount, SetTotalFailCount] = useState(0);

  
    useEffect(() => {
      if(pcList != null) {
        const successList = pcList.filter(item => {
          return (item.IsOSValidation == 1)
            && (item.IsPasswordPolicyValidation == 1)
            && (item.IsScreenValidation == 1)
            && (item.IsProductValidation == 1)
            && (item.IsVaccineValidation == 1)
        });
    
        SetTotalSuccessCount(successList.length);
        SetTotalFailCount(pcList.length - successList.length);
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
              Task Progress
            </Typography>
            <Typography variant="h3" >{(successCount / (successCount+failCount) * 100).toFixed(0)} %</Typography>
            <Typography variant="h6" className={classes.successFont}>완료 : {successCount} </Typography>
            <Typography variant="h6" className={classes.failFont}>실패 : {failCount}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={Number((successCount / (successCount + failCount) * 100).toFixed(0))}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
