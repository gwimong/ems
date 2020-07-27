import React, { useState, useEffect } from "react";
import moment from "moment";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import mockData from "./data";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const LatestLicensed = props => {
  const { className, licensedList, ...rest } = props;

  const classes = useStyles();

  const [products, setLicensedList] = useState(mockData);
  const toDay = moment();

  useEffect(() => {
    if (licensedList != null) {
      setLicensedList(licensedList.filter(item => {
        return moment.duration(toDay.diff(item.UpdateDate)).asMonths() < 1;
      }));
    }
  }, [licensedList]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Latest licensed"
      >
      </CardHeader>
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {products.map((product, i) => (
            <ListItem
              divider={i < products.length - 1}
              key={product.Id}
            >
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={product.LogoImage}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.Name}
                secondary={`Updated ${product.UpdateDate}`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
          href="/licensed-products"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestLicensed.propTypes = {
  className: PropTypes.string
};

export default LatestLicensed;
