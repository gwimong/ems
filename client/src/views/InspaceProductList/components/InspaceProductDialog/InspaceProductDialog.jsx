import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    formControl: {
        width: 140,
        paddingRight: 20,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InspaceProductDialog = props => {
    const classes = useStyles();
    const { className, open, onClose, updateLicenseProducts, ...rest } = props;
    const [selectedSoftwareType, setSelectedSoftwareType] = React.useState(0);
    const [selectedIsAuthorized, setSelectedIsAuthorized] = React.useState(0);

    const handleSoftwareTypeChange = event => {
        setSelectedSoftwareType(event.target.value);
    };

    const handleIsAuthorizedChange = event => {
        setSelectedIsAuthorized(event.target.value);
    };

    const handleUpdateClick = event => {
        updateLicenseProducts(selectedSoftwareType, selectedIsAuthorized);

    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}>
                <DialogTitle id="msortware-type-dialog-title">Update license</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="sortware-type">Software Type</InputLabel>
                            <Select
                                autoFocus
                                value={selectedSoftwareType}
                                onChange={handleSoftwareTypeChange}
                                inputProps={{
                                    name: "sortware-type",
                                    id: "sortware-type",
                                }}
                            >
                                <MenuItem value="0">확인되지 않음</MenuItem>
                                <MenuItem value="1">상용소프트웨어</MenuItem>
                                <MenuItem value="2">프리웨어</MenuItem>
                                <MenuItem value="3">쉐어웨어</MenuItem>
                                <MenuItem value="4">범용소프트웨어</MenuItem>
                                <MenuItem value="5">번들소프트웨어</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="is-authorized">Authorized</InputLabel>
                            <Select
                                autoFocus
                                value={selectedIsAuthorized}
                                onChange={handleIsAuthorizedChange}
                                inputProps={{
                                    name: "is-authorized",
                                    id: "is-authorized",
                                }}
                            >
                                <MenuItem value="1">허용됨</MenuItem>
                                <MenuItem value="0">비인가</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClick} color="primary">
                        Update
                    </Button>
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default InspaceProductDialog;