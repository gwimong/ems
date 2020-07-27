import React, { useState, useEffect } from "react";
import moment from "moment";
import palette from "theme/palette";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { data, options } from "./chart";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 430,
    position: "relative"
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const LatestUpdated = props => {
  const { className, pcList, ...rest } = props;

  const classes = useStyles();
  const toDay = moment();

  const [latestUpdatedData, setLatestUpdatedData] = useState({
    labels: [],
    datasets: [
      {
        label: "완료",
        backgroundColor: palette.success.main,
        data: []
      },
      {
        label: "미완료",
        backgroundColor: palette.error.main,
        data: []
      }
    ]
  });

  useEffect(() => {
    if (pcList != null) {

      let d = moment().add(-15, "day");
      const dateArr = [];
      const successArr = [];
      const failArr = [];
      do {
        const dStr = d.format("YYYY-MM-DD");
        let s = 0;
        let f = 0;
        dateArr.push(dStr);
        pcList.filter(item => {
          return dStr == item.UpdateDate.split(" ")[0]
        })
          .forEach(pc => {
            if ((pc.IsOSValidation == 1)
              && (pc.IsPasswordPolicyValidation == 1)
              && (pc.IsScreenValidation == 1)
              && (pc.IsProductValidation == 1)
              && (pc.IsVaccineValidation == 1)) {
              s++;
            } else {
              f++;
            }
          });
        successArr.push(s);
        failArr.push(f);
      } while (moment.duration(toDay.diff(d.add(1, "day"))).asDays() > 0);

      setLatestUpdatedData({
        labels: dateArr,
        datasets: [
          {
            label: "완료",
            backgroundColor: palette.success.main,
            data: successArr
          },
          {
            label: "미완료",
            backgroundColor: palette.error.main,
            data: failArr
          }
        ]
      });
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
        //     size="small"
        //     variant="text"
        //   >
        //     Last 7 days <ArrowDropDownIcon />
        //   </Button>
        // }
        title="Latest Updated"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={latestUpdatedData}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
      {/* <CardActions className={classes.actions}>
        <Button`
          color="primary"
          size="small"
          variant="text"
        >
          Overview <ArrowRightIcon />
        </Button>
      </CardActions> */}
    </Card>
  );
};

LatestUpdated.propTypes = {
  className: PropTypes.string
};

export default LatestUpdated;