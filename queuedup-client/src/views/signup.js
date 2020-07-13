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
    color: "#434343",
    fontFamily: "Hind",
  },
  TextField: {
    margin: "12px auto 12px auto",
  },
  button: {
    margin: "35px auto 0px auto",
    fontFamily: "Hind",
    textTransform: "none",
  },
  Error: {
    color: "red",
    frontSize: "0.8rem",
    fontFamily: "Hind",
  },
  LogInLink: {
    fontFamily: "Hind",
    color: "#434343",
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
          <Typography variant="h3" className={classes.signupTitle}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="fullName"
              name="fullName"
              type="text"
              label="Full Name"
              className={classes.TextField}
              helperText={errors.fullName}
              error={errors.fullName ? true : false}
              value={this.state.fullName}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username"
              className={classes.TextField}
              helperText={errors.username}
              error={errors.username ? true : false}
              value={this.state.username}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="UCSC Email"
              className={classes.TextField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.TextField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.TextField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.info && (
              <Typography variant="body2" className={classes.Error}>
                {errors.info}
              </Typography>
            )}
            <Typography className={classes.LogInLink}>
              <medium>
                Already have an account? <Link to="/login">Log in here!</Link>
              </medium>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              disabled={loading}>
              Sign Up
            </Button>
            <br />
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
