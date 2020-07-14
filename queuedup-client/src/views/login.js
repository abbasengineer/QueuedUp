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
    frontSize: "0.8rem",
    fontFamily: "Hind",
  },
  signUpLink: {
    fontFamily: "Hind",
    margin: "15px auto 12px auto",
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
          <Typography
            variant="h4"
            className={classes.loginTitle}
            color="secondary">
            Welcome Back
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
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
              fullWidth
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
              fullWidth
            />
            {errors.info && (
              <Typography variant="body2" className={classes.error}>
                {errors.info}
              </Typography>
            )}
            <Typography className={classes.signUpLink} color="secondary">
              <medium>
                New to Queued Up? <Link to="/signup">Sign up here!</Link>
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
