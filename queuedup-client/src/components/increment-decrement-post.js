import React, { Component } from "react";
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
  state = {
    inc: false,
    dec: false,
  };

  componentDidMount() {
    this.setState({
      inc: this.isPostIncrementedByUser() ? true : false,
      dec: this.isPostDecrementedByUser() ? true : false,
    });
  }

  isPostIncrementedByUser = () => {
    let isIncremented =
      this.props.user.increments &&
      this.props.user.increments.find(
        (increment) => increment.postID === this.props.postID
      );

    return isIncremented;
  };

  isPostDecrementedByUser = () => {
    let isDecremented =
      this.props.user.decrements &&
      this.props.user.decrements.find(
        (decrement) => decrement.postID === this.props.postID
      );

    return isDecremented;
  };

  incrementPost = () => {
    this.props.incrementPost(this.props.postID);

    if (!this.state.dec) {
      this.setState({ inc: true });
    }
  };

  unincrementPost = () => {
    this.props.unincrementPost(this.props.postID);
    this.setState({ inc: false });
  };

  decrementPost = () => {
    this.props.decrementPost(this.props.postID);

    if (!this.state.inc) {
      this.setState({ dec: true });
    }
  };

  undecrementPost = () => {
    this.props.undecrementPost(this.props.postID);
    this.setState({ dec: false });
  };

  render() {
    const {
      classes,
      user: { isAuth },
    } = this.props;

    let incrementButton;
    let decrementButton;

    if (isAuth) {
      if (this.isPostIncrementedByUser() || this.state.inc) {
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

      if (this.isPostDecrementedByUser() || this.state.dec) {
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
      <div>
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
      </div>
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
