import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { incrementPost } from "../redux/actions/data-actions";

const styles = (theme) => ({
  grid: {
    marginTop: 15,
  },
  incrementButton: {
    opacity: "0.6",
    margin: "0",
    padding: "0",
  },
  unincrementButton: {
    opacity: "0.3",
    margin: "0",
    padding: "0",
  },
});

class Increment extends Component {
  handleSubmit = () => {
    this.props.incrementPost(this.props.postID);
  };

  render() {
    const {
      classes,
      post: { increments },
    } = this.props;

    //let incrementStyle = classes.incrementButton;
    //let unincrementStyle = classes.unincrementButton;

    return (
      <Fragment>
        <Grid container className={classes.grid}>
          <Grid item>
            <Tooltip title={`${increments} increments`} placement="bottom">
              <IconButton
                className={classes.incrementButton}
                onClick={this.handleSubmit}
                size="small">
                <img
                  style={{ display: "flex", padding: 0 }}
                  src="increment.png"
                  alt="increment"></img>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Increment.propTypes = {
  classes: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  increments: PropTypes.string.isRequired,
  incrementPost: PropTypes.func.isRequired,
};

export default connect(null, { incrementPost })(withStyles(styles)(Increment));
