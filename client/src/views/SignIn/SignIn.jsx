import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Facebook as FacebookIcon, Google as GoogleIcon } from "icons";
import { SessionService } from "services";
import { LoginContext } from "contexts";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  userPassword: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
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
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false)

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const loginContext = useContext(LoginContext);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

  }, [formState.values]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = async event => {
    event.preventDefault();

    SessionService
      .login(formState.values)
      .then(res => {
        loginContext.login(res.data.loginUser);
      }).catch(err => {
        setFormState(formState => ({
          ...formState,
          isValid: false,
          errors: { userPassword: ["사용자 정보를 확인하세요."] }
        }));
      });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

    if(loginContext.authenticatedUser) {
      return <Redirect to='/dashboard' />
    } else {
      return (
        <div className={classes.root}>
          <Grid
            className={classes.grid}
            container
          >
            <Grid
              className={classes.quoteContainer}
              item
              lg={5}
            >
              <div className={classes.quote}>
                <div className={classes.quoteInner}>
                  <Typography
                    className={classes.quoteText}
                    variant="h1"
                  >
                    Hella narwhal Cosby sweater McSweeney"s, salvia kitsch before
                    they sold out High Life.
                  </Typography>
                  <div className={classes.person}>
                    <Typography
                      className={classes.name}
                      variant="body1"
                    >
                      Takamaru Ayako
                    </Typography>
                    <Typography
                      className={classes.bio}
                      variant="body2"
                    >
                      Manager at inVision
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              className={classes.content}
              item
              lg={7}
              xs={12}
            >
  
              <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                  Invalid Login or password.
                </Alert>
              </Snackbar>
              <div className={classes.content}>
                <div className={classes.contentHeader}>
                  <IconButton onClick={handleBack}>
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <div className={classes.contentBody}>
                  <form
                    className={classes.form}
                    onSubmit={handleSignIn}
                  >
                    <Typography
                      className={classes.title}
                      variant="h2"
                    >
                      Sign in
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                    >
                      Sign in with social media
                    </Typography>
                    <Grid
                      className={classes.socialButtons}
                      container
                      spacing={2}
                    >
                      <Grid item>
                        <Button
                          color="primary"
                          onClick={handleSignIn}
                          size="large"
                          variant="contained"
                        >
                          <FacebookIcon className={classes.socialIcon} />
                          Login with Facebook
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={handleSignIn}
                          size="large"
                          variant="contained"
                        >
                          <GoogleIcon className={classes.socialIcon} />
                          Login with Google
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography
                      align="center"
                      className={classes.sugestion}
                      color="textSecondary"
                      variant="body1"
                    >
                      or login with email address
                    </Typography>
                    <TextField
                      className={classes.textField}
                      error={hasError("email")}
                      fullWidth
                      helperText={
                        hasError("email") ? formState.errors.email[0] : null
                      }
                      label="Email address"
                      name="email"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.email || ""}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasError("userPassword")}
                      fullWidth
                      helperText={
                        hasError("userPassword") ? formState.errors.userPassword[0] : null
                      }
                      label="Password"
                      name="userPassword"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.userPassword || ""}
                      variant="outlined"
                    />
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!formState.isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Don"t have an account?{" "}
                      <Link
                        component={RouterLink}
                        to="/sign-up"
                        variant="h6"
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }
    
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);