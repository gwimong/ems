import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import PingCheckIcon from "@material-ui/icons/NetworkCheck";
import PasswordChangeIcon from "@material-ui/icons/SettingsRemote";
import SSHCheckIcon from "@material-ui/icons/VpnLock";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { ServerService } from "services";

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

class ServerTableToolbarSelect extends React.Component {

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

  handleClickPingCheckSelection = async () => {
    const ids = [];
    this.props.selectedRows.data.forEach(element => {
        ids.push(this.props.displayData[element.index].data[0]);
    });
    await ServerService.updateToPingList(ids);
    this.props.onChangeServers();
  };

  handleClickDeleteSelected = async () => {
    const ids = [];
    this.props.selectedRows.data.forEach(element => {
      ids.push(this.props.displayData[element.index].data[0]);
    });
    await ServerService.deleteList(ids);
    this.props.onChangeServers();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.iconContainer}>
        <Tooltip title={"Inverse selection"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickInverseSelection}>
            <CompareArrowsIcon className={[classes.icon, classes.inverseIcon].join(" ")} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Ping Check selection"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickPingCheckSelection}>
            <PingCheckIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Delete selected"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickDeleteSelected}>
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "ServerTableToolbarSelect" })(ServerTableToolbarSelect);