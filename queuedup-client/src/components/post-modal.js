import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import AddCommentForm from "./add-comment-form";
import Comments from "./comments";
import { connect } from "react-redux";
import { getPost } from "../redux/actions/data-actions";

const styles = (theme) => ({
  DialogContent: {
    padding: 20,
  },
  Username: {
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "Hind",
    color: "#434343",
    textDecoration: "none",
  },
  Contents: {
    textAlign: "left",
    fontFamily: "Hind",
  },
  IconButton: {
    color: "#434343",
    opacity: "0.2",
    size: "small",
  },
  CloseButton: {
    color: "#434343",
    opacity: "0.2",
    size: "small",
    position: "absolute",
    left: "90%",
  },
});

class PostModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getPost(this.props.postID);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      post: { postID, username, content, comments },
    } = this.props;

    const postDialog = (
      <Grid container spacing={2}>
        <Grid item>
          <Typography
            className={classes.Username}
            component={Link}
            to={`/users/${username}`}>
            {username}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography className={classes.Contents}>{content}</Typography>
        </Grid>
      </Grid>
    );

    return (
      <Fragment>
        <IconButton className={classes.IconButton} onClick={this.handleOpen}>
          <UnfoldMore />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <IconButton
            className={classes.CloseButton}
            onClick={this.handleClose}
            alignItems="center">
            <CloseIcon />
          </IconButton>
          <DialogContent className={classes.DialogContent}>
            {postDialog}
          </DialogContent>
          {comments && (
            <Fragment>
              <DialogContent className={classes.DialogContent}>
                <Comments comments={comments}></Comments>
              </DialogContent>
            </Fragment>
          )}
          <AddCommentForm postID={postID}></AddCommentForm>
        </Dialog>
      </Fragment>
    );
  }
}

PostModal.propTypes = {
  classes: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  getPost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostModal));
