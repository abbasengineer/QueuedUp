import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import {
  incrementPost,
  unincrementPost,
  decrementPost,
  undecrementPost,
} from "../redux/actions/data-actions";

const styles = (theme) => ({
  grid: {
    marginTop: 15,
  },
  incrementDecrementButtons: {
    margin: "0",
    padding: "0",
  },
});

class IncrementDecrementPost extends Component {
  isPostIncrementedByUser = () => {
    let isIncremented =
      this.props.user.increments &&
      this.props.user.increments.find(
        (increment) => increment.postID === this.props.postID
      );

    if (isIncremented) {
      return true;
    }

    return false;
  };

  isPostDecrementedByUser = () => {
    let isDecremented =
      this.props.user.decrements &&
      this.props.user.decrements.find(
        (decrement) => decrement.postID === this.props.postID
      );

    if (isDecremented) {
      return true;
    }

    return false;
  };

  incrementPost = () => {
    this.props.incrementPost(this.props.postID);
  };

  unincrementPost = () => {
    this.props.unincrementPost(this.props.postID);
  };

  decrementPost = () => {
    this.props.decrementPost(this.props.postID);
  };

  undecrementPost = () => {
    this.props.undecrementPost(this.props.postID);
  };

  render() {
    const {
      classes,
      user: { isAuth },
    } = this.props;

    let incrementButton;
    let decrementButton;

    if (isAuth) {
      if (this.isPostIncrementedByUser()) {
        incrementButton = (
          <IconButton
            className={classes.incrementDecrementButtons}
            style={{ opacity: "0.8" }}
            onClick={this.unincrementPost}>
            <img
              style={{ opacity: "0.8" }}
              width="23"
              height="23"
              src="increment.png"
              alt="increment"></img>
          </IconButton>
        );
      } else {
        incrementButton = (
          <IconButton
            className={classes.incrementDecrementButtons}
            style={{ opacity: "0.5" }}
            onClick={this.incrementPost}>
            <img
              style={{ opacity: "0.5" }}
              width="23"
              height="23"
              src="increment.png"
              alt="increment"></img>
          </IconButton>
        );
      }

      if (this.isPostDecrementedByUser()) {
        decrementButton = (
          <IconButton
            className={classes.incrementDecrementButtons}
            style={{ opacity: "0.8" }}
            onClick={this.undecrementPost}>
            <img
              style={{ opacity: "0.8" }}
              width="23"
              height="23"
              src="decrement.png"
              alt="decrement"></img>
          </IconButton>
        );
      } else {
        decrementButton = (
          <IconButton
            className={classes.incrementDecrementButtons}
            style={{ opacity: "0.5" }}
            onClick={this.decrementPost}>
            <img
              style={{ opacity: "0.5" }}
              width="23"
              height="23"
              src="decrement.png"
              alt="decrement"></img>
          </IconButton>
        );
      }
    } else {
      incrementButton = (
        <Link to="/login">
          <IconButton
            className={classes.incrementDecrementButtons}
            style={{ opacity: "0.5" }}>
            <img
              style={{ opacity: "0.5" }}
              width="23"
              height="23"
              src="increment.png"
              alt="increment"></img>
          </IconButton>
        </Link>
      );

      decrementButton = (
        <Link to="/login">
          <IconButton
            className={classes.incrementDecrementButtons}
            style={{ opacity: "0.5" }}>
            <img
              style={{ opacity: "0.5" }}
              width="23"
              height="23"
              src="decrement.png"
              alt="decrement"></img>
          </IconButton>
        </Link>
      );
    }

    return (
      <Fragment>
        <Grid container className={classes.grid}>
          <Grid item>
            <Tooltip
              title={`${this.props.increments} increments`}
              placement="bottom">
              {incrementButton}
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item>
            <Tooltip
              title={`${this.props.decrements} decrements`}
              placement="bottom">
              {decrementButton}
            </Tooltip>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

IncrementDecrementPost.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  increments: PropTypes.string.isRequired,
  incrementPost: PropTypes.func.isRequired,
  decrements: PropTypes.string.isRequired,
  decrementPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
  user: state.user,
});

const mapActionsToProps = {
  incrementPost,
  unincrementPost,
  decrementPost,
  undecrementPost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(IncrementDecrementPost));
