import React, { useState } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import {
    Grid,
    Button,
    TextField,
    FormHelperText,
    Typography,
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@material-ui/core";
import ImageUploader from "react-images-upload";

import { LicensedProductService } from "services";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    formControl: {
        width: 200,
        paddingRight: 20,
    },
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    contentHeader: {
        display: "flex",
        alignItems: "center",
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    signUpButton: {
        margin: theme.spacing(2, 0)
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewLicensedProductDialog = props => {
    const classes = useStyles();

    const { openState, handleOpenNewLicenseProductDialog, onChangeLicensedProduct, ...rest } = props;

    const [formState, setFormState] = useState({
        isValid: true,
        values: {},
        touched: {},
        errors: {}
    });

    const [pictureFile, setPictureFile] = useState(null);
    const [pictureData, setPictureData] = useState(null);

    const handleCreateLicensed = event => {
        event.preventDefault();
        LicensedProductService.create({
            Name: event.target.softwareName.value,
            Description: event.target.softwareDescription.value,
            LogoImage: pictureData,
            InfoURL: event.target.softwareInfoURL.value,
            DownloadURL: event.target.softwareDownloadURL.value

        }).then(res => {
            onChangeLicensedProduct();
            handleOpenNewLicenseProductDialog(false);
        });
    };

    const handleChange = event => {
        event.persist();
    };

    const handleUpdateClick = event => {
    }

    const onDrop = (pictureFiles, pictureDataURL) => {
        setPictureData(pictureDataURL[0]);
    }

    const OnClickClose = () => {
        handleOpenNewLicenseProductDialog(false);
    }
    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div>
            <Dialog
                open={openState}
                TransitionComponent={Transition}>
                <DialogTitle id="msortware-type-dialog-title">New Licensed Software Dialog</DialogTitle>
                <DialogContent>
                    <Grid
                        className={classes.content}
                        item
                        lg={12}
                        xs={12}
                    >
                        <div className={classes.content}>
                            <div className={classes.contentHeader}>
                            </div>
                            <div className={classes.contentBody}>
                                <form
                                    className={classes.form}
                                    onSubmit={handleCreateLicensed}
                                >
                                    <Typography
                                        className={classes.title}
                                        variant="h2"
                                    >
                                        Licensed software
                                    </Typography>
                                    <Typography
                                        className={classes.title}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        insert software information
                                    </Typography>
                                    <TextField
                                        className={classes.textField}
                                        error={hasError("softwareName")}
                                        fullWidth
                                        helperText={
                                            hasError("softwareName") ? formState.errors.softwareName[0] : null
                                        }
                                        label="소프트웨어명"
                                        name="softwareName"
                                        onChange={handleChange}
                                        type="text"
                                        //value={formState.values.softwareName || ""}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        error={hasError("softwareDescription")}
                                        fullWidth
                                        helperText={
                                            hasError("softwareDescription") ? formState.errors.softwareDescription[0] : null
                                        }
                                        label="설명"
                                        name="softwareDescription"
                                        onChange={handleChange}
                                        type="text"
                                        //value={formState.values.softwareDescription || ""}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        error={hasError("softwareInfoURL")}
                                        fullWidth
                                        helperText={
                                            hasError("softwareInfoURL") ? formState.errors.softwareInfoURL[0] : null
                                        }
                                        label="소프트웨어 정보 URL"
                                        name="softwareInfoURL"
                                        onChange={handleChange}
                                        type="text"
                                        //value={formState.values.softwareInfoURL || ""}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        error={hasError("softwareDownloadURL")}
                                        fullWidth
                                        helperText={
                                            hasError("softwareDownloadURL") ? formState.errors.softwareDownloadURL[0] : null
                                        }
                                        label="소프트웨어 로고 URL"
                                        name="softwareDownloadURL"
                                        onChange={handleChange}
                                        type="text"
                                        //value={formState.values.softwareDownloadURL || ""}
                                        variant="outlined"
                                    />
                                    {hasError("policy") && (
                                        <FormHelperText error>
                                            {formState.errors.policy[0]}
                                        </FormHelperText>
                                    )}
                                    <ImageUploader
                                        withIcon={true}
                                        buttonText="Choose images"
                                        onChange={onDrop}
                                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                        withPreview={true}
                                        maxFileSize={5242880}
                                        singleImage={true}
                                    />
                                    <Button
                                        className={classes.signUpButton}
                                        color="primary"
                                        disabled={!formState.isValid}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Add licensed</Button>
                                </form>
                            </div>
                        </div>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={OnClickClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewLicensedProductDialog;