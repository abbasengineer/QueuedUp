import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import { deletePost } from "../redux/actions/data-actions";

const styles = (theme) => ({
  celeteButton: {
    opacity: "0.2",
    size: "small",
  },
  confirmButton: {
    fontFamily: "Hind",
    color: "#434343",
  },
  dialogTitle: {
    fontFamily: "Hind",
    color: "#434343",
  },
  dialogContent: {
    fontFamily: "Hind",
  },
});

class DeletePost extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deletePost = () => {
    this.props.deletePost(this.props.postID);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <IconButton className={classes.deleteButton} onClick={this.handleOpen}>
          <DeleteOutlineIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
            {"Delete post"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              className={classes.dialogContent}
              id="alert-dialog-description">
              Are you sure you want to permanently delete this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.confirmButton}
              onClick={this.handleClose}
              color="#434343">
              No
            </Button>
            <Button
              className={classes.confirmButton}
              onClick={this.deletePost}
              color="#434343"
              autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeletePost.propTypes = {
  classes: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
