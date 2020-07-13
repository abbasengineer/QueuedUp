import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DeletePost from "./delete-post";
import PostModal from "./post-modal";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    // wrap: "nowrap",
    alignItems: "center",
  },
  Card: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    backgroundColor: "#eaf1fd",
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
});

class Post extends Component {
  render() {
    const {
      classes,
      post: { username, content, postID },
      user: { isAuth, credentials },
    } = this.props;

    let deleteButton;

    if (isAuth && username === credentials.username) {
      deleteButton = <DeletePost postID={postID} />;
    } else {
      deleteButton = null;
    }

    return (
      <Card className={classes.Card}>
        <Grid container className={classes.root} spacing={2}>
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
          <Grid item>{deleteButton}</Grid>
          <PostModal postID={postID} username={username}></PostModal>
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
