import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Link from "react-router-dom/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/user-actions";

const styles = {
  form: {
    textAlign: "center",
  },
  signupTitle: {
    margin: "2px auto 20px auto",
    fontFamily: "Hind",
  },
  textFieldMargin: {
    margin: "15px auto 12px auto",
  },
  textField: {
    fontFamily: "Hind",
  },
  button: {
    margin: "30px auto 0px auto",
    fontFamily: "Hind",
    textTransform: "none",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    fontFamily: "Hind",
  },
  logInLink: {
    fontFamily: "Hind",
    margin: "15px auto 12px auto",
  },
};

class signup extends Component {
  constructor() {
    super();

    this.state = {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    const newUserData = {
      fullName: this.state.fullName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;

    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography
            variant="h3"
            className={classes.signupTitle}
            color="secondary">
            Join Us
          </Typography>
          <form
            noValidate
            onSubmit={this.handleSubmit}
            style={{ margin: "20px" }}>
            <Grid container direction="column">
              <TextField
                id="fullName"
                name="fullName"
                type="text"
                label={<span style={{ fontFamily: "Hind" }}>Full Name</span>}
                className={classes.textFieldMargin}
                inputProps={{
                  className: classes.textField,
                }}
                helperText={errors.fullName}
                error={errors.fullName ? true : false}
                value={this.state.fullName}
                onChange={this.handleChange}
              />
              <TextField
                id="username"
                name="username"
                type="text"
                label={<span style={{ fontFamily: "Hind" }}>Username</span>}
                className={classes.textFieldMargin}
                inputProps={{
                  className: classes.textField,
                }}
                helperText={errors.username}
                error={errors.username ? true : false}
                value={this.state.username}
                onChange={this.handleChange}
              />
              <TextField
                id="email"
                name="email"
                type="email"
                label={<span style={{ fontFamily: "Hind" }}>UCSC Email</span>}
                className={classes.textFieldMargin}
                inputProps={{
                  className: classes.textField,
                }}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label={<span style={{ fontFamily: "Hind" }}>Password</span>}
                className={classes.textFieldMargin}
                inputProps={{
                  className: classes.textField,
                }}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label={
                  <span style={{ fontFamily: "Hind" }}>Confirm Password</span>
                }
                className={classes.textFieldMargin}
                inputProps={{
                  className: classes.textField,
                }}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              {errors.info && (
                <Typography variant="body2" className={classes.error}>
                  {errors.info}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                disabled={loading}>
                Sign Up
              </Button>
              <Typography className={classes.logInLink} color="secondary">
                <medium>
                  Already have an account? <Link to="/login">Log in here!</Link>
                </medium>
              </Typography>
              <br />
            </Grid>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
