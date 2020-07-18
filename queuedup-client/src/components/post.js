import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import DeletePost from "./delete-post";
import EditPost from "./edit-post";
import IncrementPost from "./increment-post";
import PostModal from "./post-modal";
import { connect } from "react-redux";

const styles = (theme) => ({
  card: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    textAlign: "left",
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
    objectFit: "cover",
  },
  image: {
    minWidth: 90,
    minHeight: 90,
  },
});

class Post extends Component {
  render() {
    const {
      classes,
      post: { username, content, postID, imageURL },
      user: { isAuth, credentials },
    } = this.props;

    let editButton;
    let deleteButton;
    let incrementButton;

    // only display edit and delete buttons for logged in users
    if (isAuth && username === credentials.username) {
      editButton = <EditPost postID={postID} />;
      deleteButton = <DeletePost postID={postID} />;
      incrementButton = null; // can't increment your own post
    } else {
      editButton = null;
      deleteButton = null;
      incrementButton = <IncrementButton postID={postID} />;
    }

    let popoutButton = <PostModal postID={postID} username={username} />;

    return (
      <Card className={classes.card}>
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
            <Typography className={classes.contents} component="p">
              {content}
            </Typography>
          </Grid>
          <Grid>
            <Grid item>
              {popoutButton} {editButton} {deleteButton} {incrementButton}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
