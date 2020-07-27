import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import CachedIcon from "@material-ui/icons/Cached";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class ServerTableToolbar extends React.Component {

  handleRefreshClick = () => {
    this.props.onChangeServers();
  }

  handleAddServerClick = () => {
    this.props.handleOpenServerDialog(true);
    this.props.setIsUpdateState(false);
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Add server icon"}>
          <IconButton className={classes.iconButton} onClick={this.handleAddServerClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Refresh icon"}>
          <IconButton className={classes.iconButton} onClick={this.handleRefreshClick}>
            <CachedIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "ServerTableToolbar" })(ServerTableToolbar);