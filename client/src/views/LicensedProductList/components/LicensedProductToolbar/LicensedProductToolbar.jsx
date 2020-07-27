import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const LicensedProductToolbar = props => {
  const { className, handleOpenNewLicenseProductDialog, ...rest } = props;
  const classes = useStyles();

  const onClickAdd = () => {
    handleOpenNewLicenseProductDialog(true);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={onClickAdd}
        >
          Add Licensed Software
        </Button>
      </div>
    </div>
  );
};

LicensedProductToolbar.propTypes = {
  className: PropTypes.string
};

export default LicensedProductToolbar;
