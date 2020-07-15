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
import ChatIcon from "@material-ui/icons/Chat";
import AddCommentForm from "./add-comment-form";
import Comments from "./comments";
import Tooltip from "@material-ui/core/Tooltip";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { getPost } from "../redux/actions/data-actions";

const styles = (theme) => ({
  dialogContent: {
    padding: 20,
    paddingLeft: 15,
  },
  postInfoGrid: {
    paddingLeft: 15,
  },
  username: {
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "Hind",
    textDecoration: "none",
  },
  contents: {
    textAlign: "left",
    fontFamily: "Hind",
  },
  chatButton: {
    opacity: "0.3",
    margin: "0",
    padding: "0",
  },
  closeButton: {
    color: "secondary",
    opacity: "0.2",
    size: "small",
    position: "absolute",
    left: "90%",
  },
  image: {
    minWidth: 60,
    minHeight: 60,
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
      post: { postID, username, content, comments, imageURL },
    } = this.props;

    const postDialog = (
      <Grid container>
        <Grid item>
          <Avatar
            variant="rounded"
            src={imageURL}
            title={username}
            className={classes.image}></Avatar>
        </Grid>
        <Grid item xs className={classes.postInfoGrid}>
          <Typography
            className={classes.username}
            color="secondary"
            component={Link}
            to={`/users/${username}`}>
            {username}
          </Typography>
          <Typography className={classes.contents} noWrap="false">
            {content}
          </Typography>
        </Grid>
      </Grid>
    );

    return (
      <Fragment>
        <Tooltip title="View comments" placement="bottom">
          <IconButton
            className={classes.chatButton}
            onClick={this.handleOpen}
            size="small">
            <ChatIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <IconButton
            className={classes.closeButton}
            onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
          <DialogContent className={classes.dialogContent}>
            {postDialog}
          </DialogContent>
          {comments && (
            <Fragment>
              <DialogContent className={classes.dialogContent}>
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
