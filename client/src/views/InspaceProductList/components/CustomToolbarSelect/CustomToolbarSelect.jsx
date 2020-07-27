import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

import InspaceProductDialog from "../InspaceProductDialog";
import { InspaceProductService } from "services";

const defaultToolbarSelectStyles = {
  iconButton: {
  },
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
};

class CustomToolbarSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClickInverseSelection = () => {
    const nextSelectedRows = this.props.displayData.reduce((nextSelectedRows, _, index) => {
      if (!this.props.selectedRows.data.find(selectedRow => selectedRow.index === index)) {
        nextSelectedRows.push(index);
      }
      return nextSelectedRows;
    }, []);
    this.props.setSelectedRows(nextSelectedRows);
  };

  handleClickOnClose = () => {
    this.setState({ open: false });
  }

  handleClickDeselectAll = () => {
    this.props.setSelectedRows([]);
  };

  handleClickEditSelected = () => {
    this.setState({ open: true });
  };

  handleClickDeleteSelected = async () => {

    const ids = [];
    this.props.selectedRows.data.forEach(element => {
      ids.push(this.props.displayData[element.index].data[0]);
    });

    await InspaceProductService.DeleteList(ids);
    this.props.onChangeLicenseProduct();
  };

  updateLicenseProducts = async (softwareType, isAuthorized) => {

    const ids = [];
    this.props.selectedRows.data.forEach(element => {
      ids.push(this.props.displayData[element.index].data[0]);
    });

    await InspaceProductService.UpdateList(ids, softwareType, isAuthorized);
    this.props.onChangeLicenseProduct();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.iconContainer}>
        <Tooltip title={"Deselect ALL"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>
            <IndeterminateCheckBoxIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Inverse selection"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickInverseSelection}>
            <CompareArrowsIcon className={[classes.icon, classes.inverseIcon].join(" ")} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Edit selected"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickEditSelected}>
            <EditIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Delete selected"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickDeleteSelected}>
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <InspaceProductDialog open={this.state.open} onClose={this.handleClickOnClose} updateLicenseProducts={this.updateLicenseProducts} />
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);