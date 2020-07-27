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

class AccountTableToolbar extends React.Component {
  
  handleRefreshClick = () => {
    this.props.onChangeAccounts();
  }

  handleAddAccountClick = () => {
    this.props.handleOpenAccountDialog(true);
    this.props.setIsUpdateState(false);
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Add account icon"}>
          <IconButton className={classes.iconButton} onClick={this.handleAddAccountClick}>
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

export default withStyles(defaultToolbarStyles, { name: "AccountTableToolbar" })(AccountTableToolbar);
