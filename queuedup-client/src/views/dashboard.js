import React, { Component } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 0),
  },
  Card: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    background: "#eaf1fd",
  },
  Username: {
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "Hind",
  },
  Contents: {
    textAlign: "left",
    fontFamily: "Hind",
  },
  Empty: {
    fontFamily: "Hind",
  },
});

const errorMessage = "We encountered an error. Please try again later!";

export class dashboard extends Component {
  state = {
    posts: null,
  };

  // fetch posts from server, using Axios to send HTTP requests to the server
  componentDidMount() {
    axios
      .get("/getposts")
      .then((response) => {
        console.log(response.data);

        this.setState({
          posts: response.data,
        });
      })
      .catch((err) => {
        console.error(err);

        this.setState({
          posts: errorMessage,
        });
      });
  }

  render() {
    const { classes } = this.props;

    let postDisplay = (post) => (
      <Card className={classes.Card}>
        <Grid container className={classes.root} wrap="nowrap" spacing={2}>
          <Grid item>
            <Typography className={classes.Username}>
              {post.username}:
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography className={classes.Contents}>{post.content}</Typography>
          </Grid>
        </Grid>
      </Card>
    );

    let discussionPosts;

    if (this.state.posts) {
      if (this.state.posts === errorMessage) {
        // error fetching posts
        discussionPosts = (
          <Typography className={classes.Empty}>{this.state.posts}</Typography>
        );
      } else {
        // display the posts
        discussionPosts = this.state.posts.map((post) => postDisplay(post));
      }
    } else {
      discussionPosts = (
        <Typography className={classes.Empty}>No posts yet!</Typography>
      );
    }

    return (
      <Container container className={classes.root} spacing={0}>
        <Container item>{discussionPosts}</Container>
      </Container>
    );
  }
}

export default withStyles(styles)(dashboard);
