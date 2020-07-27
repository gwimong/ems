import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Grid, Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { LicensedProductToolbar, LicensedProductCard, NewLicensedProductDialog } from "./components";
import { LicensedProductService } from "services";
import mockData from "./data";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  }
}));

const LicensedProductList = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [licensedProducts, setLicensedProducts] = useState(mockData);

  const onChangeLicensedProduct = () => {
    LicensedProductService.readAll()
      .then(res => {
        setLicensedProducts(res.data);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(false);
      });
  }

  const handleOpenNewLicenseProductDialog = (isOpen) => {
    setOpenState(isOpen);
  }

  useEffect(() => {
    onChangeLicensedProduct();
  }, []);

  if (load) {
    return (
      <div className={classes.root}>
        <LicensedProductToolbar handleOpenNewLicenseProductDialog={handleOpenNewLicenseProductDialog} />
        <div className={classes.content}>
          <Grid
            container
            spacing={3}
          >
            {licensedProducts.map(product => (
              <Grid
                item
                key={product.Id}
                lg={4}
                md={6}
                xs={12}
              >
                <LicensedProductCard product={product} onChangeLicensedProduct={onChangeLicensedProduct} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.pagination}>
          <Typography variant="caption">1-6 of 20</Typography>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <NewLicensedProductDialog openState={openState} onChangeLicensedProduct={onChangeLicensedProduct} handleOpenNewLicenseProductDialog={handleOpenNewLicenseProductDialog} />
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

export default LicensedProductList;
