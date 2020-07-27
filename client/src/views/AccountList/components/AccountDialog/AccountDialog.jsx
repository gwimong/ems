import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
    Grid,
    Button,
    FormHelperText,
    Typography,
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { AccountService } from "services";
import mockData from "./newAccount.data"

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative",
    },
    title: {
        flex: 1,
    },
    subTitle: {
        marginLeft: theme.spacing(1)
    },
    TextValidator: {
        marginTop: theme.spacing(2)
    },
    formControl: {
        width: "100%",
        height: "100%",
        paddingRight: 20,
        marginTop: theme.spacing(2)
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
        margin: theme.spacing(2, 0),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AccountDialog = props => {
    const classes = useStyles();

    const { openState, accountId, isUpdateState, serverItems, handleOpenAccountDialog, onChangeAccounts, ...rest } = props;

    const [formState, setFormState] = useState({
        isValid: true,
        values: {},
        touched: {},
        errors: {}
    });

    const [accountData, setAccountData] = useState(mockData);


    const handleSubmitServer = event => {
        event.preventDefault();
        if (isUpdateState) {
            AccountService.update(accountId, accountData).then(res => {
                onChangeAccounts();
                handleOpenAccountDialog(false);
            });
        } else {
            AccountService.create(accountData).then(res => {
                onChangeAccounts();
                handleOpenAccountDialog(false);
            });
        }

    };

    const handleUpdateClick = event => {
    }

    const handleError = errors => {
        console.log(errors)
        alert(errors[0].getErrorMessage());
    };

    const handleChange = event => {
        event.persist();
        const { name, value } = event.target;
        setAccountData({ ...accountData, [name]: value });
    };

    const handleCheckedChange = event => {
        event.persist();
        const { name, checked } = event.target;
        setAccountData({ ...accountData, [name]: checked });
    };

    const OnClickClose = () => {
        handleOpenAccountDialog(false);
    }

    useEffect(() => {
        if (openState && (accountId > 0) && isUpdateState) {
            AccountService.read(accountId).then(res => {
                setAccountData(res.data);
            });
        }
    }, [openState]);

    return (
        <div>
            <Dialog
                open={openState}
                TransitionComponent={Transition}>
                <DialogTitle id="msortware-type-dialog-title">Server Dialog</DialogTitle>
                <DialogContent>
                    <Grid
                        className={classes.content}
                        item
                        lg={12}
                        xs={12}
                    >
                        <div className={classes.content}>
                            <div className={classes.contentBody}>
                                <ValidatorForm
                                    className={classes.form}
                                    onSubmit={handleSubmitServer}
                                    onError={handleError}
                                >
                                    <Typography
                                        className={classes.title}
                                        variant="h2"
                                    >
                                        {isUpdateState ? "계정 정보" : "신규 계정 등록하기"}
                                    </Typography>
                                    <Typography
                                        className={classes.subTitle}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        insert account information
                                    </Typography>
                                    <FormControl className={classes.formControl} xs={6} sm={6}>
                                        <InputLabel htmlFor="server_id">대상 서버 </InputLabel>
                                        <Select
                                            autoFocus
                                            //value={accountData.health}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "server_id",
                                                id: "server_id",
                                            }}
                                            value={accountData.server_id}
                                        >
                                            {
                                                serverItems.map((server, i) => (
                                                    <MenuItem key={i} value={server.id} >
                                                        {server.server_name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="서버 계정"
                                        name="server_account"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={accountData.server_account}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="서버 비밀번호"
                                        name="server_password"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={accountData.server_password}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="비고"
                                        name="comment"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        value={accountData.comment}
                                    />
                                    <FormControlLabel
                                        className={classes.Checkbox}
                                        control={<Checkbox color="primary" name="use_ssh" onChange={handleCheckedChange} checked={accountData.use_ssh} />}
                                        label="SSH 사용"
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
                                        {isUpdateState ? "Update" : "Add"}
                                    </Button>
                                </ValidatorForm>
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

export default AccountDialog;