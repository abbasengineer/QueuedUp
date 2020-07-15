import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeletePost from "./delete-post";
import EditPost from "./edit-post";
import PostModal from "./post-modal";
import { connect } from "react-redux";

const styles = (theme) => ({
  card: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    backgroundColor: "#eaf1fd",
    textAlign: "left",
  },
  postInfoGrid: {
    paddingLeft: 5,
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
    minWidth: 80,
    minHeight: 80,
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

    // only display edit and delete buttons for logged in users
    if (isAuth && username === credentials.username) {
      editButton = <EditPost postID={postID} />;
      deleteButton = <DeletePost postID={postID} />;
    } else {
      editButton = null;
      deleteButton = null;
    }

    return (
      <Card className={classes.card}>
        <Grid container className={classes.root} spacing={2}>
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
            <Typography className={classes.contents}>{content}</Typography>
          </Grid>
          <Grid item>{editButton}</Grid>
          <Grid item>{deleteButton}</Grid>
          <Fragment>
            <PostModal postID={postID} username={username}></PostModal>
          </Fragment>
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
