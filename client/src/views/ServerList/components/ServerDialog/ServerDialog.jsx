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
import { ServerService } from "services";

const validatorStr_ip4 = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";
const validatorStr_errorMsg = "IP 형식에 맞지 않습니다.";

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

const ServerDialog = props => {
    const classes = useStyles();

    const { openState, serverId, isUpdateState, mockData, handleOpenServerDialog, onChangeServers, ...rest } = props;

    const [formState, setFormState] = useState({
        isValid: true,
        values: {},
        touched: {},
        errors: {}
    });

    const [serverData, setServerData] = React.useState(mockData);

    const handleSubmitServer = event => {
        event.preventDefault();
        console.log("click");
        if (isUpdateState) {
            console.log("update!!1");
            ServerService.update(serverId, serverData).then(res => {
                onChangeServers();
                handleOpenServerDialog(false);
            }).catch(error => { console.log(error)});
        } else {
            console.log("create!!!");
            ServerService.create(serverData).then(res => {
                onChangeServers();
                handleOpenServerDialog(false);
            }).catch(error => { console.log(error)});
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
        setServerData({ ...serverData, [name]: value });
    };

    const handleCheckedChange = event => {
        event.persist();
        const { name, checked } = event.target;
        setServerData({ ...serverData, [name]: checked });
    };

    const OnClickClose = () => {
        handleOpenServerDialog(false);
    }

    useEffect(() => {
        if (serverId > 0) {
            ServerService.read(serverId)
                .then(res => {
                    setServerData(res.data);
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
                                        {isUpdateState ? "서버 정보" : "신규 서버 등록하기"}
                                    </Typography>
                                    <Typography
                                        className={classes.subTitle}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        insert server information
                                    </Typography>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="used">사용 유무</InputLabel>
                                        <Select
                                            autoFocus
                                            value={serverData.used}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "used",
                                                id: "used",
                                            }}
                                        >
                                            <MenuItem value="0">확인되지 않음</MenuItem>
                                            <MenuItem value="1">사용</MenuItem>
                                            <MenuItem value="2">미사용</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl} xs={6} sm={6}>
                                        <InputLabel htmlFor="health">서버 상태</InputLabel>
                                        <Select disabled
                                            autoFocus
                                            value={serverData.health}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "health",
                                                id: "health",
                                            }}
                                        >
                                            <MenuItem value="0">확인되지 않음</MenuItem>
                                            <MenuItem value="1">CHECKING</MenuItem>
                                            <MenuItem value="2">ALIVE</MenuItem>
                                            <MenuItem value="3">ALIVE_SSH</MenuItem>
                                            <MenuItem value="4">SUCCESS_PASSWD</MenuItem>
                                            <MenuItem value="9">DEAD</MenuItem>
                                            <MenuItem value="11">ARG_ERROR</MenuItem>
                                            <MenuItem value="12">SVR_WRNG_ACCOUNT</MenuItem>
                                            <MenuItem value="13">CONN_FAILED</MenuItem>
                                            <MenuItem value="14">DB_ERROR</MenuItem>
                                            <MenuItem value="15">DB_FAIL</MenuItem>
                                            <MenuItem value="16">DB_DUPLICATE</MenuItem>
                                            <MenuItem value="21">COMMAND_FAIL</MenuItem>
                                            <MenuItem value="99">TIMEOUT</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="device_div">장치 분류</InputLabel>
                                        <Select
                                            autoFocus
                                            value={serverData.device_div}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "device_div",
                                                id: "device_div",
                                            }}
                                        >
                                            <MenuItem value="0">확인되지 않음</MenuItem>
                                            <MenuItem value="1">단독운영</MenuItem>
                                            <MenuItem value="2">스토리지</MenuItem>
                                            <MenuItem value="3">클러스터</MenuItem>
                                            <MenuItem value="4">GPU서버</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="device_manufacturer">제조사</InputLabel>
                                        <Select
                                            autoFocus
                                            value={serverData.device_manufacturer}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "device_manufacturer",
                                                id: "device_manufacturer",
                                            }}
                                        >
                                            <MenuItem value="0">확인되지 않음</MenuItem>
                                            <MenuItem value="1">DELL</MenuItem>
                                            <MenuItem value="2">SUPERMICRO</MenuItem>
                                            <MenuItem value="3">COCOLINK</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="device_type">장치 분류</InputLabel>
                                        <Select
                                            autoFocus
                                            value={serverData.device_type}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "device_type",
                                                id: "device_type",
                                            }}
                                        >
                                            <MenuItem value="0">확인되지 않음</MenuItem>
                                            <MenuItem value="1">2베이 서버</MenuItem>
                                            <MenuItem value="2">4베이 서버</MenuItem>
                                            <MenuItem value="3">8베이 서버</MenuItem>
                                            <MenuItem value="4">10베이 서버</MenuItem>
                                            <MenuItem value="5">12베이 서버</MenuItem>
                                            <MenuItem value="6">14베이 서버</MenuItem>
                                            <MenuItem value="7">16베이 서버</MenuItem>
                                            <MenuItem value="8">18베이 서버</MenuItem>
                                            <MenuItem value="9">20베이 서버</MenuItem>
                                            <MenuItem value="10">클러스터 노드</MenuItem>
                                            <MenuItem value="20">GPU 서버</MenuItem>
                                            <MenuItem value="30">워크스테이션</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="서버명"
                                        name="server_name"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.server_name}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="사용 용도"
                                        name="purpose"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.purpose}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="서버 IP"
                                        name="server_ip"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["matchRegexp:" + validatorStr_ip4]}
                                        errorMessages={[validatorStr_errorMsg]}
                                        value={serverData.server_ip}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="소유자"
                                        name="owner"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.owner}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="장치 모델명"
                                        name="device_model"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.device_model}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="장치 위치"
                                        name="device_location"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.device_location}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="장치 크기"
                                        name="device_size"

                                        onChange={handleChange}
                                        type="number"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.device_size}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="저장소"
                                        name="storage"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.storage}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="메모리"
                                        name="memory"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.memory}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="GPU"
                                        name="gpu"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.gpu}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="IPMI IP"
                                        name="ipmi_ip"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["matchRegexp:" + validatorStr_ip4]}
                                        errorMessages={[validatorStr_errorMsg]}
                                        value={serverData.ipmi_ip}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="IPMI 계정"
                                        name="ipmi_account"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.ipmi_account}
                                    />
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="IPMI 비밀번호"
                                        name="ipmi_password"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                        value={serverData.ipmi_password}
                                    />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="os_type">운영체제 종류</InputLabel>
                                        <Select
                                            autoFocus
                                            value={serverData.os_type}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "os_type",
                                                id: "os_type",
                                            }}
                                        >
                                            <MenuItem value="0">확인되지 않음</MenuItem>
                                            <MenuItem value="2">MAC</MenuItem>
                                            <MenuItem value="18">Windows NT</MenuItem>
                                            <MenuItem value="36">LINUX</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl} xs={6} sm={6}>
                                        <InputLabel htmlFor="os_name">운영체제 이름</InputLabel>
                                        <Select
                                            autoFocus
                                            value={serverData.os_name}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "os_name",
                                                id: "os_name",
                                            }}
                                        >
                                            <MenuItem value="0" selected>확인되지 않음</MenuItem>
                                            <MenuItem value="1">Windows 7 Ultimate</MenuItem>
                                            <MenuItem value="2">Windows 7 Enterprise</MenuItem>
                                            <MenuItem value="3">Windows 7 Professional</MenuItem>
                                            <MenuItem value="4">Windows 7 Home Premium</MenuItem>
                                            <MenuItem value="5">Windows 7 Home Basic</MenuItem>
                                            <MenuItem value="6">Windows 7 Starter</MenuItem>
                                            <MenuItem value="7">Windows 8 Enterprise</MenuItem>
                                            <MenuItem value="8">Windows 8 Professional</MenuItem>
                                            <MenuItem value="9">Windows 8</MenuItem>
                                            <MenuItem value="10">Windows 10 Enterprise</MenuItem>
                                            <MenuItem value="11">Windows 10 Education</MenuItem>
                                            <MenuItem value="12">Windows 10 Professional</MenuItem>
                                            <MenuItem value="13">Windows 10 Home</MenuItem>

                                            <MenuItem value="101">CentOS 6.0</MenuItem>
                                            <MenuItem value="101">CentOS 6.1</MenuItem>
                                            <MenuItem value="102">CentOS 6.2</MenuItem>
                                            <MenuItem value="103">CentOS 6.3</MenuItem>
                                            <MenuItem value="104">CentOS 6.4</MenuItem>
                                            <MenuItem value="105">CentOS 6.5</MenuItem>
                                            <MenuItem value="106">CentOS 6.6</MenuItem>
                                            <MenuItem value="107">CentOS 6.7</MenuItem>
                                            <MenuItem value="108">CentOS 6.8</MenuItem>
                                            <MenuItem value="109">CentOS 6.9</MenuItem>
                                            <MenuItem value="110">CentOS 7.0</MenuItem>
                                            <MenuItem value="111">CentOS 7.1</MenuItem>
                                            <MenuItem value="112">CentOS 7.2</MenuItem>
                                            <MenuItem value="113">CentOS 7.3</MenuItem>
                                            <MenuItem value="114">CentOS 7.4</MenuItem>
                                            <MenuItem value="115">CentOS 7.5</MenuItem>
                                            <MenuItem value="116">CentOS 7.6</MenuItem>
                                            <MenuItem value="117">CentOS 7.7</MenuItem>
                                            <MenuItem value="18">CentOS 8.0</MenuItem>

                                            <MenuItem value="201">Ubuntu 14.04 LTS</MenuItem>
                                            <MenuItem value="202">Ubuntu 14.10</MenuItem>
                                            <MenuItem value="203">Ubuntu 15.04</MenuItem>
                                            <MenuItem value="204">Ubuntu 15.10</MenuItem>
                                            <MenuItem value="205">Ubuntu 16.04 LTS</MenuItem>
                                            <MenuItem value="206">Ubuntu 16.10</MenuItem>
                                            <MenuItem value="207">Ubuntu 17.04</MenuItem>
                                            <MenuItem value="208">Ubuntu 17.10</MenuItem>
                                            <MenuItem value="209">Ubuntu 18.04 LTS</MenuItem>
                                            <MenuItem value="210">Ubuntu 18.10</MenuItem>
                                            <MenuItem value="211">Ubuntu 19.04</MenuItem>
                                            <MenuItem value="212">Ubuntu 19.10</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextValidator
                                        className={classes.TextValidator}
                                        fullWidth
                                        label="비고"
                                        name="comment"
                                        onChange={handleChange}
                                        type="text"
                                        variant="outlined"
                                        value={serverData.comment}
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

export default ServerDialog;