import React from "react";
import Moment from "react-moment";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Link,
  Button,
  Label
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GetAppIcon from "@material-ui/icons/GetApp";
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { LicensedProductService } from "services";

const defaultToolbarSelectStyles = {
  root: {
    minHeight: 200
  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: "0 auto",
    //border: `1px solid ${theme.palette.divider}`,
    border: `1px solid`,
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  imageField: {
    width: "inherit"
  },
  cardBody: {
    minHeight: 100
  },
  button: {
    minWidth: 40,
    width: 40,
    display: "flex",
    alignItems: "center"
  },
  statsItem: {
    display: "flex",
    alignItems: "center"
  },
  statsIcon: {
    //color: theme.palette.icon,
    //marginRight: theme.spacing(1)
  }
}

class LicensedProductCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  onClickInfoView = param => e => {
    window.open(param);
  }

  onClickDownload = param => e => {
    window.open(param);
  }

  onClickDelete = param => e => {
    LicensedProductService.delete(param)
      .then(res => {
        this.props.onChangeLicensedProduct();
      });
  }

  onClickClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card>
          <CardContent>
            <div className={classes.imageContainer}>
              <img
                //alt="Product"
                className={classes.imageField}
                src={this.props.product.LogoImage}
              />
            </div>
            <Typography
              align="center"
              gutterBottom
              variant="h4"
            >
              {this.props.product.Name}
            </Typography>
            <div className={classes.cardBody}>
              <Typography
                align="center"
                variant="body1"
              >
                {this.props.product.Description}
              </Typography>
            </div>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid
              container
              justify="space-between"
            >
              <Grid
                className={classes.statsItem}
                item
              >
                <AccessTimeIcon className={classes.statsIcon} />
                <Typography
                  display="inline"
                  variant="body2"
                > {"Updated "}
                  <Moment format="YYYY-MM-DD HH:mm:ss" >{this.props.product.CreateDate}</Moment>
                </Typography>
              </Grid>
              <Grid
                className={classes.statsItem}
                item
              >
                <Button className={classes.button} onClick={this.onClickDelete(this.props.product.Id)}><DeleteIcon /></Button>
                <Button className={classes.button} onClick={this.onClickDownload(this.props.product.DownloadURL)}><GetAppIcon /></Button>
                <Button className={classes.button} onClick={this.onClickInfoView(this.props.product.InfoURL)}><InfoIcon /></Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>

      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "LicensedProductCard" })(LicensedProductCard);