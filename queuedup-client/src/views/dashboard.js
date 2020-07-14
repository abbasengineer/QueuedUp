import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";
import Post from "../components/post";
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/data-actions";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 0),
  },
  Empty: {
    fontFamily: "Hind",
  },
});

export class dashboard extends Component {
  // fetch posts from server, using Axios to send HTTP requests to the server
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { classes } = this.props;
    const { posts, loading } = this.props.data;

    let discussionPosts;

    if (loading) {
      discussionPosts = <CircularProgress />;
    } else {
      // display the posts
      discussionPosts = posts.map((post) => (
        <Post key={post.postID} post={post} />
      ));
    }

    return (
      <Container container className={classes.root} spacing={0}>
        <Container item>{discussionPosts}</Container>
      </Container>
    );
  }
}

dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(
  withStyles(styles)(dashboard)
);
