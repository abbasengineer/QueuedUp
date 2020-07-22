import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { deletePost } from "../redux/actions/data-actions";

const styles = (theme) => ({
  grid: {
    marginTop: 15,
  },
  deleteButton: {
    opacity: "0.3",
    margin: "0",
    padding: "0",
  },
  confirmButton: {
    fontFamily: "Hind",
    textTransform: "none",
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
        <Grid container className={classes.grid}>
          <Grid item>
            <Tooltip title="Delete post" placement="bottom">
              <IconButton
                className={classes.deleteButton}
                onClick={this.handleOpen}
                size="medium">
                <DeleteOutlineIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle>
            <span
              id="alert-dialog-title"
              style={{ fontFamily: "Hind", color: "secondary" }}>
              Delete post
            </span>
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
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              onClick={this.handleClose}>
              No
            </Button>
            <Button
              className={classes.confirmButton}
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              onClick={this.deletePost}>
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
