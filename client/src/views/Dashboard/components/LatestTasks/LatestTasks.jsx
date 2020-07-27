import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import mockData from "./data";
import { StatusBullet } from "components";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800,
    maxHeight: 430,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center"
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const statusColors = {
  delivered: "success",
  pending: "info",
  refunded: "danger"
};

const LatestTasks = props => {
  const { className, pcList, ...rest } = props;

  const classes = useStyles();
  const toDay = moment();
  const [pcs, setPCs] = useState(mockData);

  useEffect(() => {
    if (pcList != null) {
      setPCs(pcList.filter(item => {
        return moment.duration(toDay.diff(pcList.UpdateDate)).asMonths() < 1;
      }));
    }
  }, [pcList]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        // action={
        //   <Button
        //     color="primary"
        //     size="small"
        //     variant="outlined"
        //   >
        //     New entry
        //   </Button>
        // }
        title="Latest Tasks"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PC 이름</TableCell>
                  <TableCell>소유자</TableCell>
                  <TableCell>갱신일</TableCell>
                  <TableCell>OS 점검</TableCell>
                  <TableCell>비밀번호 정책</TableCell>
                  <TableCell>화면보호기 정책</TableCell>
                  <TableCell>설치된 프로그램</TableCell>
                  <TableCell>백신 설치</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pcs.map(pc => (
                  <TableRow
                    hover
                    key={pc.PCId}
                  >
                    <TableCell>{pc.PCName}</TableCell>
                    <TableCell>{pc.PCOwner}</TableCell>
                    <TableCell>{pc.UpdateDate}</TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={pc.IsOSValidation === 1 ? "success" : "danger"}
                          size="sm"
                        />
                        {pc.IsOSValidation === 1 ? "완료" : "미완료"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={pc.IsPasswordPolicyValidation === 1 ? "success" : "danger"}
                          size="sm"
                        />
                        {pc.IsPasswordPolicyValidation === 1 ? "완료" : "미완료"}
                      </div></TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={pc.IsScreenValidation === 1 ? "success" : "danger"}
                          size="sm"
                        />
                        {pc.IsScreenValidation === 1 ? "완료" : "미완료"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={pc.IsProductValidation === 1 ? "success" : "danger"}
                          size="sm"
                        />
                        {pc.IsProductValidation === 1 ? "완료" : "미완료"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={pc.IsVaccineValidation === 1 ? "success" : "danger"}
                          size="sm"
                        />
                        {pc.IsVaccineValidation === 1 ? "완료" : "미완료"}
                      </div></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
          href="/pcs"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestTasks.propTypes = {
  className: PropTypes.string
};

export default LatestTasks;
