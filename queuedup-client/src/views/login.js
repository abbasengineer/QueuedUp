import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Link from "react-router-dom/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/user-actions";

const styles = {
  form: {
    textAlign: "center",
  },
  loginTitle: {
    margin: "2px auto 40px auto",
    color: "#434343",
    fontFamily: "Hind",
  },
  TextField: {
    margin: "60px auto 12px auto",
  },
  button: {
    margin: "80px auto 0px auto",
    fontFamily: "Hind",
    textTransform: "none",
  },
  Error: {
    color: "red",
    frontSize: "0.8rem",
    fontFamily: "Hind",
  },
  SignUpLink: {
    fontFamily: "Hind",
    color: "#434343",
  },
};

class login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  componentWillReceiveProps(props) {
    if (props.UI.errors) {
      this.setState({ errors: props.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
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
          <Typography variant="h3" className={classes.loginTitle}>
            Welcome Back
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
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
            {errors.info && (
              <Typography variant="body2" className={classes.Error}>
                {errors.info}
              </Typography>
            )}
            <Typography className={classes.SignUpLink}>
              <medium>
                New to QueuedUp? <Link to="/signup">Sign up here!</Link>
              </medium>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              disabled={loading}>
              Log In
            </Button>
            <br />
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
